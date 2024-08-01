import {httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from 'svix';
import { internal } from "./_generated/api";

const http = httpRouter();

const validatePayload = async (req: Request) => {
  const payload = await req.text();

  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!
  }
  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET!)
  try {
    return webhook.verify(payload, svixHeaders) as WebhookEvent
  } catch (error) {
    console.error("Clerk Webhook Request Error: " + error)
    return null;
  }
}

const handleClerkWebhook = httpAction(async (ctx,req) => {
  const event = await validatePayload(req)
  if (!event) {
    return new Response("Could not validate Clerk payload", {
      status: 400
    })
  }  
  switch (event.type) {
    case "user.created": 
      //     
      // const users = await ctx.runQuery(internal.user.get, { clerkId: event.data.id });
      // console.log("*********" + users);
      
      // if(users){
      //   console.log(`Creating user ${event.data.id} with: ${event.data}`);  
      // }
    case "user.updated":
      console.log("Updating User: " + event.data.id);
      await ctx.runMutation(internal.user.create, {
        username: `${event.data.first_name} ${event.data.last_name}`,
        imageUrl: event.data.image_url,
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address
      });
      break;
    default:
      console.log("Clerk Webhook is not Supported: " + event.type);
  }
  return new Response(null, {
    status: 200
  });
})

http.route({
  path: '/clerk-users-webhook',
  method: "POST",
  handler: handleClerkWebhook
})

export default http;