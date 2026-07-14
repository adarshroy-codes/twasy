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
          <div className="hidden md:flex items-center gap-1 bg-[rgba(255,255,255,0.02)] p-1 rounded-full border border-white/5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center border ${
                    isActive
                      ? "bg-[rgba(255,255,255,0.08)] border-[rgba(224,75,255,0.4)] text-white shadow-[0_0_15px_rgba(224,75,255,0.2),inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                      : "border-transparent text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.03)] hover:border-white/5"
                  }`}
                >
                  <span className={isActive ? "bg-gradient-to-r from-[#c084fc] to-[#f472b6] bg-clip-text text-transparent font-bold" : ""}>
                    {item.label}
                  </span>
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
          <div className="md:hidden mt-4 pt-4 border-t border-[rgba(138,63,252,0.15)] flex flex-col gap-2 animate-fade-in">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`text-sm font-semibold tracking-wider uppercase px-4 py-2.5 rounded-xl transition-all duration-300 block border ${
                    isActive 
                      ? "bg-[rgba(255,255,255,0.08)] border-[rgba(224,75,255,0.4)] text-white shadow-[0_0_15px_rgba(224,75,255,0.15),inset_0_1px_0_0_rgba(255,255,255,0.1)]" 
                      : "text-gray-400 border-transparent hover:text-white hover:bg-[rgba(255,255,255,0.03)] hover:border-white/5"
                  }`}
                >
                  <span className={isActive ? "bg-gradient-to-r from-[#c084fc] to-[#f472b6] bg-clip-text text-transparent font-bold" : ""}>
                    {item.label}
                  </span>
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
