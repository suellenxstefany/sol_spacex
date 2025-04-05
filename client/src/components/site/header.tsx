import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-sm bg-[#F6F3EA]/90 backdrop-blur-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <Logo textOnly={!isScrolled} />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-[#5D5348] hover:text-[#C19B97] transition-colors font-cormorant text-lg">About</a>
          <a href="#features" className="text-[#5D5348] hover:text-[#C19B97] transition-colors font-cormorant text-lg">Features</a>
          <a href="#garden" className="text-[#5D5348] hover:text-[#C19B97] transition-colors font-cormorant text-lg">The Garden</a>
          <a href="#support-tools" className="text-[#5D5348] hover:text-[#C19B97] transition-colors font-cormorant text-lg">Support Tools</a>
          <Button 
            asChild
            className="px-5 py-2 h-auto rounded-full border border-[#C19B97] bg-transparent text-[#C19B97] hover:bg-[#C19B97]/10 transition-colors font-medium"
          >
            <a href="#contact">Join Us</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-[#C19B97] focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#F6F3EA]/95 backdrop-blur-md border-t border-[#C19B97]/20 shadow-lg transition-all duration-300 ${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="container mx-auto px-6 py-6 flex flex-col space-y-5">
          <a href="#about" className="text-[#5D5348] hover:text-[#C19B97] transition-colors py-1 font-cormorant text-xl" onClick={closeMenu}>About</a>
          <a href="#features" className="text-[#5D5348] hover:text-[#C19B97] transition-colors py-1 font-cormorant text-xl" onClick={closeMenu}>Features</a>
          <a href="#garden" className="text-[#5D5348] hover:text-[#C19B97] transition-colors py-1 font-cormorant text-xl" onClick={closeMenu}>The Garden</a>
          <a href="#support-tools" className="text-[#5D5348] hover:text-[#C19B97] transition-colors py-1 font-cormorant text-xl" onClick={closeMenu}>Support Tools</a>
          <Button 
            asChild
            className="px-5 py-3 rounded-full bg-[#C19B97] text-white hover:bg-[#A88A86] transition-colors w-full mt-2"
          >
            <a href="#contact" onClick={closeMenu}>Join Us</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
