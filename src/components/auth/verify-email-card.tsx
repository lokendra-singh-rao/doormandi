"use client";
import axiosClient from "@/utils/axiosClient";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import VerifyEmailSchema from "@/schemas/verify-email-schema";

export const VerifyEmailCard = () => {
  const searchParams = useSearchParams();
  const p = searchParams.get("p");
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof VerifyEmailSchema>>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      startTransition(async () => {
        try {
          const res = await axiosClient.post("/api/auth/verify-email", { token });
          if (res.data.success) {
            setSuccess(res.data.message);
          }
        } catch (error: unknown) {
          console.error("VERIFY EMAIL ERROR", error);
          if (axios.isAxiosError(error)) {
            setError(error?.message);
          } else {
            setError("Something went wrong! Please try again");
          }
        }
      });
    };

    verifyEmail();
  }, [token]);

  const handleResendEmail = async (data: z.infer<typeof VerifyEmailSchema>) => {
    startTransition(async () => {
      await setTimeout(() => {
        console.log("ss");
      }, 20000);
      try {
        const res = await axiosClient.post("/api/auth/resend-verification-email", data);
        if (res.data.success) {
          setSuccess(res.data.message);
        }
      } catch (error: unknown) {
        console.error("RESEND VERIFICATION EMAIL ERROR", error);
        if (axios.isAxiosError(error)) {
          setError(error?.message);
        } else {
          setError("Something went wrong! Please try again");
        }
      }
    });
  };

  if (p === "resend") {
    return (
      <CardWrapper showSocial={false} title="Resend Verification Email" subtitle="Verify email to access all features" linkLabels={[]} linkHrefs={[]}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleResendEmail)} className="space-y-6 mb-6">
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
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button className="w-full" disabled={isPending}>
              Resend Verification Mail
            </Button>
          </form>
        </Form>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper showSocial={false} title="Verify Email" subtitle="Verify to access all features" linkLabels={["Go to Login"]} linkHrefs={["/login"]}>
      <div className="flex justify-center flex-col items-center space-y-2">
        {success && <p className="text-center">{success}</p>}
        {success && <p className="text-center">{error}</p>}
        <FormSuccess message={success} />
        <FormError message={error} />
        <Spinner show={!isPending}>
          <p className="text-center">Verifying email...</p>
        </Spinner>
      </div>
    </CardWrapper>
  );
};
