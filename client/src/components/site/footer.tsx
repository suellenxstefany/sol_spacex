import { Link } from "wouter";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="py-16 border-t border-[#C19B97]/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8">
            <Logo size="medium" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 mb-8 font-cormorant text-lg">
            <Link href="#" className="text-[#5D5348]/80 hover:text-[#C19B97] transition-colors">Privacy</Link>
            <Link href="#" className="text-[#5D5348]/80 hover:text-[#C19B97] transition-colors">Terms</Link>
            <Link href="#" className="text-[#5D5348]/80 hover:text-[#C19B97] transition-colors">Accessibility</Link>
            <Link href="#" className="text-[#5D5348]/80 hover:text-[#C19B97] transition-colors">Contact</Link>
          </div>
          
          <div className="max-w-lg mb-8 text-center">
            <p className="text-[#5D5348]/70 text-sm mb-2">
              "In the garden of your heart, every emotion is a flower deserving of sunlight."
            </p>
          </div>
          
          <div className="text-[#5D5348]/60 text-sm">
            &copy; {new Date().getFullYear()} Sol Space. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
