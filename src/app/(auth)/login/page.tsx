"use client";
import GoogleIcon from "@/app/ui/Icons/GoogleIcon";
import LoginForm from "@/app/ui/Login/LoginForm";
import Separator from "@/app/ui/Shared/Separator";

export default function Login() {
  return (
    <section className="py-10 px-auto flex justify-center">
      <div className="w-[300px] xs:w-[360px] md:w-[400px]">
        <h2 className="text-4xl font-semibold">Login</h2>
        <p className="pt-2 font-semibold text-sm">Hi, Welcome back 👋</p>
        <div className="pt-6">
          <button className="w-full py-2 border-2 rounded-[0.25rem] flex justify-center items-center gap-2 text-sm font-semibold">
            <GoogleIcon /> Login with Google
          </button>
        </div>
        <div className="py-4 text-[0.6rem]">
          <Separator text="or Login with Email" />
        </div>

        <LoginForm />
      </div>
    </section>
  );
}
