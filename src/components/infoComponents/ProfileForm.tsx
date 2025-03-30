"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DatePicker } from "./DatePicker"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  dateOfBirth: z.date(),
})

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: new Date()
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)
    // Reset the form with the new values.
    form.reset(values)
  }

  return (
    <>
    <div className="text-left">
        <h2 className="text-xl font-bold">Profile</h2>
        <p className="text-sm text-muted-foreground">
            Update your profile information.
        </p>
    </div>

    <Separator className="my-4" />

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="hover:bg-gray-100"/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} className="hover:bg-gray-100"/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} type="tel" placeholder="(123) 456-7890" className="hover:bg-gray-100"/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                </FormItem>
            )}
            />
        <Button type="submit" className="cursor-pointer border-2 border-transparent hover:border-black hover:text-black hover:bg-white transition-all duration-200 hover:scale-105">
          Update
        </Button>
      </form>
    </Form>
    </>
  )
}
