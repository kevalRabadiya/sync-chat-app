'use client'

import React from 'react'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/Button'
import { UserPlus } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMutationState } from '@/hooks/useMutationState'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'


const addFriendSchema = z.object({
    // It is Show when below <FormMessage/> render 
    email:z.string().min(1,{message:'this field can not empty'}).email("✉️ Enter valid Email..")
})

const AddFriendDailog = () => {

const {mutate:createRequest,pending} = useMutationState(api.request.create)
const form = useForm<z.infer<typeof addFriendSchema>>({
    resolver:zodResolver(addFriendSchema),
    defaultValues:{email:""}
})

const handleSubmit = async (values:z.infer<typeof addFriendSchema>)=>{
    await createRequest({email:values.email})
    .then(()=>{
        form.reset()
        toast.success("Request Successfully Sent!")
    })
    .catch(err=>{toast.error(err instanceof ConvexError 
        ? err.data 
        :"Unexpected error occurred!")
    })
}

 return (
    <>
        <Dialog>
            <Tooltip>
                <TooltipTrigger>
                    <Button size='icon' variant='outline' ><DialogTrigger><UserPlus/></DialogTrigger></Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add Friend</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Friend</DialogTitle>
                    <DialogDescription>Send a request to connect with your friends</DialogDescription>
                </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
                        <FormField control={form.control} name='email' render={({field})=>
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl><Input placeholder='Email..' {...field}></Input></FormControl>
                              <FormMessage/>
                           </FormItem>}
                        />
                        <DialogFooter>
                            <Button disabled={false} type='submit'>Send</Button>
                        </DialogFooter>
                </form>
            </Form>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default AddFriendDailog;