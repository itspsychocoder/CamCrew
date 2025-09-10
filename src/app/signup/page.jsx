"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { account, ID } from "@/utils/appwrite";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function SignupPage() {
  const [step, setStep] = useState("role");
  const [role, setRole] = useState("");
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
   try {
    const req = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username, role })
    })
    const data = await req.json();
    if (data.success){
      toast.success("Account created successfully! Please log in.");
      router.push("/login");
    }
    else  {
      toast.error(data.message);
    }
   }
   catch(error) {
    toast.error(error.message);
   }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {step === "role" && (
          <Card className="bg-[#1E1E1E] border border-[#2E7D32]/20 shadow-xl rounded-2xl">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl font-semibold text-[#E0E0E0]">
                Create an Account
              </CardTitle>
              <p className="text-sm text-[#E0E0E0]/70">
                Choose your account type to continue
              </p>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Card
                className={`cursor-pointer bg-[#121212] border-2 rounded-xl transition-all hover:border-[#00FF9D] ${
                  role === "photographer" ? "border-[#00FF9D]" : "border-[#2E7D32]/30"
                }`}
                onClick={() => {
                  setRole("photographer");
                  setStep("form");
                }}
              >
                <CardContent className="flex flex-col items-center justify-center py-6 text-[#E0E0E0]">
                  📸
                  <span className="mt-2 font-medium">Photographer</span>
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer bg-[#121212] border-2 rounded-xl transition-all hover:border-[#00FF9D] ${
                  role === "user" ? "border-[#00FF9D]" : "border-[#2E7D32]/30"
                }`}
                onClick={() => {
                  setRole("user");
                  setStep("form");
                }}
              >
                <CardContent className="flex flex-col items-center justify-center py-6 text-[#E0E0E0]">
                  👤
                  <span className="mt-2 font-medium">User</span>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        )}

        {step === "form" && (
          <Card className="bg-[#1E1E1E] border border-[#2E7D32]/20 shadow-xl rounded-2xl">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl font-semibold text-[#E0E0E0]">
                Sign Up as {role === "photographer" ? "Photographer" : "User"}
              </CardTitle>
              <p className="text-sm text-[#E0E0E0]/70">
                Fill in your details below
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-[#E0E0E0]">
                    Your Name
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-[#121212] border border-[#2E7D32]/30 text-[#E0E0E0] placeholder:text-[#E0E0E0]/40 focus-visible:ring-[#00FF9D]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#E0E0E0]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-[#121212] border border-[#2E7D32]/30 text-[#E0E0E0] placeholder:text-[#E0E0E0]/40 focus-visible:ring-[#00FF9D]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#E0E0E0]">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-[#121212] border border-[#2E7D32]/30 text-[#E0E0E0] placeholder:text-[#E0E0E0]/40 focus-visible:ring-[#00FF9D]"
                  />
                </div>
              </div>

              <Button onClick={register} className="w-full bg-[#2E7D32] hover:bg-[#FF6F61] text-[#E0E0E0] rounded-xl py-5 text-base font-medium transition-colors">
                Sign Up
              </Button>

              <p className="text-center text-sm text-[#E0E0E0]/60">
                Already have an account?{" "}
                <span className="text-[#00FF9D] hover:underline cursor-pointer">
                  Login
                </span>
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}