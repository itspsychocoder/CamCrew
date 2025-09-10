"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1E1E1E] border-b border-[#2E7D32]/30 text-[#E0E0E0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-[#00FF9D]">
            Camcrew
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="hover:text-[#00FF9D] transition-colors">
              Home
            </Link>
            <Link href="/feed" className="hover:text-[#00FF9D] transition-colors">
              Feed
            </Link>
            <Link href="/about" className="hover:text-[#00FF9D] transition-colors">
              About
            </Link>
            <Link href="/login">
              <Button className="bg-[#2E7D32] hover:bg-[#FF6F61] text-[#E0E0E0] rounded-lg">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-[#121212]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className="md:hidden bg-[#121212] border-t border-[#2E7D32]/30"
        >
          <div className="px-4 py-4 space-y-4 flex flex-col">
            <Link href="/" className="hover:text-[#00FF9D] transition-colors">
              Home
            </Link>
            <Link href="/feed" className="hover:text-[#00FF9D] transition-colors">
              Feed
            </Link>
            <Link href="/about" className="hover:text-[#00FF9D] transition-colors">
              About
            </Link>
            <Link href="/login">
              <Button className="bg-[#2E7D32] hover:bg-[#FF6F61] text-[#E0E0E0] rounded-lg w-full">
                Login
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}


export default Navbar;