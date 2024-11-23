"use client";
import { CardWrapper } from "@/components/auth/card-wrapper";
import RegisterSchema from "@/schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Separator from "../ui/separator";
import { register } from "@/actions/register";

export const RegisterForm = () => {

  const title = "Get started!";
  const subtitle = "Register using Email";
  const linkLabels = ["Already have an account?", "Verify email?"];
  const linkHrefs = ["/login", "verify-email"];

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
        fullname: "",
        email: "",
        phone: "",
        password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    const res = await register(data);
    console.log("LOGIN RES", res)
  }

  return (
    <CardWrapper title={title} subtitle={subtitle} linkLabels={linkLabels} linkHrefs={linkHrefs} showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-6" >
        <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button size={"lg"} >
            Create an account
          </Button>
        </form>
      </Form>
      <Separator text="OR" />
    </CardWrapper>
  );
};
