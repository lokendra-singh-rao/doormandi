"use client";
import GoogleIcon from "@/app/ui/Icons/GoogleIcon";
import Separator from "@/app/ui/Login/Separator";
import { FormEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement login logic here
    // For example, call your authentication API
    console.log("Logging in with:", { email, password });
    // Clear error message on new attempt
    setError("");
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic
    console.log("Forgot Password clicked");
  };

  const handleSignup = () => {
    // Redirect to the signup page
    console.log("Signup clicked");
  };

  return (
    <section className="py-10 px-auto flex justify-center">
      <div className="w-[300px] xs:w-[420px]">
        <h2 className="text-4xl font-semibold">Login</h2>
        <p className="pt-2 font-semibold text-sm">Hi, Welcome back 👋</p>
        <div className="pt-6">
          <button onClick={handleSignup} className="w-full py-1.5 border-2 rounded-[0.25rem] flex justify-center items-center gap-2 text-sm font-semibold">
            <GoogleIcon /> Login with Google
          </button>
        </div>
        <div className="py-4">
          <Separator text="or Login with Email" />
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <button onClick={handleForgotPassword} style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer" }}>
            Forgot Password?
          </button>
          <button onClick={handleSignup} style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer" }}>
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
}
