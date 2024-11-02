"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { signUpUser } from "@/app/store/features/auth/authSlice";
import clsx from "clsx";
import Link from "next/link";

export default function SignupForm() {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(signUpUser({fullname, phone, email, password, confirmPassword }));
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        <div className="mb-3">
          <label htmlFor="fullname" className="font-semibold">
            Fullname:
          </label>
          <input type="text" id="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} required className="border-gray-200 border-[1px] rounded-lg outline-green-500 w-full p-2" placeholder="Fullname" />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="font-semibold">
            Phone Number:
          </label>
          <input type="number" id="phone" value={phone} onChange={(e) => setPhone(Number(e.target.value))} required className="border-gray-200 border-[1px] rounded-lg outline-green-500 w-full p-2" placeholder="Phone Number" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="font-semibold">
            Email:
          </label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border-gray-200 border-[1px] rounded-lg outline-green-500 w-full p-2" placeholder="Email" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="font-semibold">
            Password:
          </label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border-gray-200 border-[1px] rounded-lg outline-green-500 w-full p-2" placeholder="Password" />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="font-semibold">
            Confirm Password:
          </label>
          <input type="text" id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="border-gray-200 border-[1px] rounded-lg outline-green-500 w-full p-2" placeholder="Confirm Password" />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={clsx("w-full p-2 text-white border-none rounded-[0.24rem]", {
            "bg-green-500 hover:bg-green-600": !isLoading,
            "bg-gray-200": isLoading,
          })}
        >
          {isLoading ? "Signing in..." : "SignUp"}
        </button>
      </form>
      <div style={{ display: "flex", justifyContent: "end", marginTop: "10px" }}>
        <Link href="/login" className="text-blue-600 cursor-pointer bg-none border-none">
          <span className="text-gray-900">Already have an account ?</span>
          &nbsp;Login
        </Link>
      </div>
    </div>
  );
}
