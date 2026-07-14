import React, { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-5xl transition-all duration-300 ${
        scrolled
          ? "top-2 py-2"
          : "py-4"
      }`}
    >
      <div
        className="w-full rounded-2xl border border-[rgba(138,63,252,0.25)] bg-[rgba(13,6,20,0.55)] px-6 py-3 shadow-[0_8px_32px_0_rgba(9,7,15,0.7)] backdrop-blur-3xl transition-all duration-300"
        style={{
          boxShadow: scrolled
            ? "0 10px 40px 0 rgba(138, 63, 252, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)"
            : "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, "#home")}
            className="flex items-center gap-2 font-orbitron font-extrabold text-lg tracking-wider text-white group"
          >
            <span className="text-cyber-magenta transition-all duration-300 group-hover:scale-110">
              &lt;
            </span>
            <span className="animate-slow-shimmer transition-all duration-300">
              TWASY
            </span>
            <span className="text-cyber-neon transition-all duration-300 group-hover:scale-110">
              /&gt;
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`group relative font-sans text-sm font-medium tracking-wide uppercase transition-all duration-300 py-1 ${
                    isActive
                      ? "bg-gradient-to-r from-[#b975ff] via-cyber-magenta to-[#f0abfc] bg-clip-text text-transparent font-bold"
                      : "text-gray-400 hover:bg-gradient-to-r hover:from-[#b975ff] hover:via-cyber-magenta hover:to-[#f0abfc] hover:bg-clip-text hover:text-transparent"
                  }`}
                >
                  {item.label}
                  {/* Underline Indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyber-neon to-cyber-magenta transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Action Trigger / Interactive element */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="px-4 py-1.5 rounded-lg border border-[rgba(224,75,255,0.3)] bg-[rgba(224,75,255,0.05)] text-xs font-orbitron font-bold tracking-wider uppercase text-cyber-magenta hover:bg-cyber-magenta hover:text-white hover:shadow-[0_0_15px_rgba(224,75,255,0.5)] transition-all duration-300 flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5" />
              LAUNCH_INIT
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex p-1.5 md:hidden text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors border border-transparent hover:border-cyber-neon/30"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-[rgba(138,63,252,0.15)] flex flex-col gap-4 animate-fade-in">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`text-base font-medium tracking-wide uppercase py-1 transition-all duration-300 block ${
                    isActive 
                      ? "bg-gradient-to-r from-[#b975ff] via-cyber-magenta to-[#f0abfc] bg-clip-text text-transparent font-bold pl-2 border-l-2 border-cyber-magenta" 
                      : "text-gray-400 hover:bg-gradient-to-r hover:from-[#b975ff] hover:via-cyber-magenta hover:to-[#f0abfc] hover:bg-clip-text hover:text-transparent"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="mt-2 py-2 w-full text-center rounded-lg border border-[rgba(224,75,255,0.3)] bg-[rgba(224,75,255,0.05)] text-sm font-orbitron font-bold tracking-wider uppercase text-cyber-magenta block"
            >
              LAUNCH CONSOLE
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
