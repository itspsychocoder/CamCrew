"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-[#1E1E1E] border border-[#2E7D32]/20 shadow-xl rounded-2xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-semibold text-[#E0E0E0]">
              Camcrew Login
            </CardTitle>
            <p className="text-sm text-[#E0E0E0]/70">
              Enter your credentials to continue
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[#E0E0E0]">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
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
                  placeholder="Enter your password"
                  className="bg-[#121212] border border-[#2E7D32]/30 text-[#E0E0E0] placeholder:text-[#E0E0E0]/40 focus-visible:ring-[#00FF9D]"
                />
              </div>
            </div>

            <Button
              className="w-full bg-[#2E7D32] hover:bg-[#FF6F61] text-[#E0E0E0] rounded-xl py-5 text-base font-medium transition-colors"
            >
              Login
            </Button>

            <p className="text-center text-sm text-[#E0E0E0]/60">
              Don’t have an account? <span className="text-[#00FF9D] hover:underline cursor-pointer">Sign up</span>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
