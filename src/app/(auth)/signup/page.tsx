"use client";
import GoogleIcon from "@/app/ui/Icons/GoogleIcon";
import LoginForm from "@/app/ui/Login/LoginForm";
import Separator from "@/app/ui/Shared/Separator";
import Link from "next/link";

export default function Signup() {
  return (
    <section className="py-10 px-auto flex justify-center">
      <div className="w-[300px] xs:w-[360px] md:w-[400px]">
        <h2 className="text-4xl font-semibold">Signup</h2>
        <p className="pt-2 font-semibold text-sm">Welcome! Let&apos;s Get You Set Up 👋</p>
        <div className="pt-6">
          <button className="w-full py-2 border-2 rounded-[0.25rem] flex justify-center items-center gap-2 text-sm font-semibold">
            <GoogleIcon /> Signup with Google
          </button>
        </div>
        <div className="py-4 text-[0.6rem]">
          <Separator text="or Signup with Email" />
        </div>

        <div>
          <LoginForm />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <Link href="/forgot-password" className="text-blue-600 cursor-pointer bg-none border-none">
            Forgot Password?
          </Link>
          <Link href="/signup" className="text-blue-600 cursor-pointer bg-none border-none">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
