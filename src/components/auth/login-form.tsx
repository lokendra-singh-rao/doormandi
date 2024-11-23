"use client";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginSchema from "@/schemas/login-schema";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Separator from "../ui/separator";

export const LoginForm = () => {

  const title = "Welcome Back!";
  const subtitle = "Login using Email";
  const linkLabels = ["Don't have an account?", "Forgot password?"];
  const linkHrefs = ["/register", "forgot-password"];

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <CardWrapper title={title} subtitle={subtitle} linkLabels={linkLabels} linkHrefs={linkHrefs} showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-6 mb-6" >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
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
          <Button size={"lg"} className="w-full bg-green-500 hover:bg-green-600">
            Login
          </Button>
        </form>
      </Form>
      <Separator text="OR" />
    </CardWrapper>
  );
};
