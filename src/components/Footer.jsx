"use client";

import Link from "next/link";


export function Footer() {
  return (
    <footer className="bg-[#1E1E1E] border-t border-[#2E7D32]/30 text-[#E0E0E0] py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <span className="text-sm">© {new Date().getFullYear()} Camcrew. All rights reserved.</span>
        <div className="flex space-x-6 text-sm">
          <Link href="/privacy" className="hover:text-[#00FF9D]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#00FF9D]">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-[#00FF9D]">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
