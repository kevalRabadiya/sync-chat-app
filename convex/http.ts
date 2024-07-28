import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from 'svix';

const http = httpRouter();

const validatePayload = async (req:Request):Promise<WebhookEvent | undefined>=>{
    const payload = await req.text();

    const svixHeaders = {
        "svix-id":req.headers.get("svix-id")!,
        "svix-timestamp":req.headers.get("svix-timestamp")!,
        "svix-signature":req.headers.get("svix-signature")!
    }
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "")
    try {
        return webhook.verify(payload,svixHeaders) as WebhookEvent
    } catch (error) {
        console.error("Clerk Webhook Request Error" + error)
    }
}

const handleClerkWebhook= httpAction(async(ctx,req)=>{
    const event = await validatePayload(req)
})

http.route({
    path:'/clerk-users-webhook',
    method:"POST",
    handler:handleClerkWebhook
})

export default http;