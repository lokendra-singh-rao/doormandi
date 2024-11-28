"use client";
import { CardWrapper } from "@/components/auth/card-wrapper";
import LoginSchema from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Separator from "../ui/separator";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import axiosClient from "@/utils/axiosClient";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const [redirect] = useSearchParams().getAll("redirect");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      try {
        const res = await axiosClient.post("/api/auth/login", data);
        if (res.data.success) {
          setSuccess(res.data.message);
          if(redirect) {
            router.push(redirect);
          } else {
            router.push("/profile");
          }
        }
      } catch (error: unknown) {
        console.error("LOGIN ERROR", error);
        if (axios.isAxiosError(error)) {
          setError(error?.message);
        } else {
          setError("Something went wrong");
        }
      }
    });
  };

  return (
    <CardWrapper title={title} subtitle={subtitle} linkLabels={linkLabels} linkHrefs={linkHrefs} showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-6">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} disabled={isPending} />
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
                    <Input type="password" placeholder="******" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button size={"lg"} className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
      <Separator text="OR" />
    </CardWrapper>
  );
};
