import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const create = mutation({
    args:{
        email:v.string()
    },
    handler:async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new ConvexError("Unauthorized")
        }
        if(args.email===identity.email){
            throw new ConvexError("Can't send Request Yourself..")
        }
        const currentUser = getUserByClerkId({ctx,clerkId:identity.subject})
        if(!currentUser) throw new ConvexError('User Not Found')

        const receiver = await ctx.db.query('users').withIndex('by_email',q=>q.eq('email',args.email)).unique()
        if(!receiver) throw new ConvexError("Receiver Not Found")
        
        // @ts-ignore
        const RequestAlreadySent = await ctx.db.query('requests').withIndex('by_receiver_sender',q=>q.eq('receiver',receiver._id).eq('sender',currentUser._id))
        if(RequestAlreadySent) throw new ConvexError('Request Already Sent')

        // @ts-ignore
        const RequestAlreadyReceive = await ctx.db.query('requests').withIndex('by_receiver_sender',q=>q.eq("receiver",currentUser._id).eq("sender",receiver._id))
        if(RequestAlreadyReceive) throw new ConvexError('Request Already Receive')

        const request = await ctx.db.insert("requests",{
        // @ts-ignore
        sender:currentUser._id,
        receiver:receiver._id
        });
        return request;
    }
})