"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import toast from 'react-hot-toast'
import type { SubmitHandler } from 'react-hook-form'
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
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"

// Extend schema to include notifications
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  dateOfBirth: z.date(),
  notifications: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

export function ProfileForm() {
  const { id } = useParams<{ id: string }>()
  const userId = Number(id)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: new Date(),
      notifications: false,
    },
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    async function loadUser() {
      try {
        const res = await fetch(`http://localhost:4000/api/users/${userId}`)
        if (!res.ok) throw new Error('User not found')
        const user = await res.json() as {
          name: string
          email: string
          phone?: string
          date_of_birth: string
          notifications: boolean
        }
        form.reset({
          name: user.name,
          email: user.email,
          phone: user.phone ?? '',
          dateOfBirth: new Date(user.date_of_birth),
          notifications: user.notifications,
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [userId, form])

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const res = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          date_of_birth: values.dateOfBirth.toISOString().split('T')[0],
          notifications: values.notifications,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || res.statusText)
      }

      const updated = await res.json() as {
        name: string
        email: string
        phone?: string
        date_of_birth: string
        notifications: boolean
      }

      form.reset({
        name: updated.name,
        email: updated.email,
        phone: updated.phone ?? '',
        dateOfBirth: new Date(updated.date_of_birth),
        notifications: updated.notifications,
      })

      toast.success('Profile successfully updated!')
    } catch (e) {
      console.error('Failed to update user:', e)
    }
  }

  if (loading) return <p>Loading…</p>

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name, Email, Phone, DOB fields... */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} className="hover:bg-gray-100" />
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
                  <Input {...field} className="hover:bg-gray-100" />
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
                  <Input {...field} type="tel" placeholder="(123) 456-7890" className="hover:bg-gray-100" />
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
          <FormField
            control={form.control}
            name="notifications"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="cursor-pointer hover:scale-95"
                  />
                </FormControl>
                <FormLabel className="!mb-0">Email notifications</FormLabel>
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-pointer hover:scale-95">
            Update
          </Button>
        </form>
      </Form>
    </>
  )
}
