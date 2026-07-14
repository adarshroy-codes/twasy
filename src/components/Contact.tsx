import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MessageSquare, MapPin, Send, Terminal, CheckCircle, Instagram, MessageCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "transmitting" | "success">("idle");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("transmitting");
    setConsoleLogs([]);

    // Simulate high-tech console transmission sequence
    const logs = [
      "INITIALIZING SECURE PROTOCOL // SHIELD_LINK",
      "RESOLVING ADDR: SMTP://JROY8085@GMAIL.COM",
      "ESTABLISHING QUANTUM CARRIER CHANNEL...",
      "STABILIZING VOLTAGE MATRICES... OK",
      "COMPRESSING CONTEXT PACKETS (2.4KB)",
      "TRANSMITTING PAYLOAD... [100%]"
    ];

    for (let i = 0; i < logs.length; i++) {
      setConsoleLogs((prev) => [...prev, logs[i]]);
      await sleep(400);
    }

    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactCards = [
    {
      label: "Secure Mail",
      value: "jroy8085@gmail.com",
      sub: "PGP: F28D-9E9C-A03B",
      icon: <Mail className="w-5 h-5 text-cyber-neon" />,
      href: "mailto:jroy8085@gmail.com",
    },
    {
      label: "WhatsApp Comms",
      value: "+91 98765 43210",
      sub: "Instant secure mobile ping",
      icon: <MessageCircle className="w-5 h-5 text-emerald-400" />,
      href: "https://wa.me/919876543210",
    },
    {
      label: "Instagram Feed",
      value: "@rizx_.twasy",
      sub: "Creative updates & process",
      icon: <Instagram className="w-5 h-5 text-cyber-magenta" />,
      href: "https://instagram.com/rizx_.twasy",
    },
    {
      label: "Discord Comms",
      value: "rizx_.twasy",
      sub: "Holographic voice active",
      icon: <MessageSquare className="w-5 h-5 text-sky-400" />,
      href: "https://discord.com",
    },
    {
      label: "Sector Coordinates",
      value: "Dehradun, India",
      sub: "Grid Coordinate 248001",
      icon: <MapPin className="w-5 h-5 text-white" />,
      href: "#",
    },
  ];

  return (
    <section id="contact" className="relative min-h-screen py-24 px-4 z-10 max-w-5xl mx-auto flex flex-col justify-center">
      {/* Section Header */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-[1px] bg-cyber-magenta" />
          <span className="font-mono text-xs text-cyber-magenta uppercase tracking-widest">
            UPLINK_CARRIER_04
          </span>
        </div>
        <h2 className="heading-cyber text-3xl sm:text-4xl text-white font-black tracking-wider">
          SECURE <span className="bg-gradient-to-r from-cyber-magenta to-cyber-neon bg-clip-text text-transparent">UPLINK</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left Column: Floating Glass Envelope Illustration & Contact Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          {/* Custom Floating Glass Envelope Graphic Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl glass-panel p-6 flex flex-col items-center justify-center relative overflow-hidden h-60 sm:h-72"
          >
            {/* Background vector starburst glow */}
            <div className="absolute w-36 h-36 rounded-full bg-cyber-neon/15 blur-[25px] pointer-events-none animate-pulse-slow" />

            {/* Floating Glass Envelope SVG */}
            <motion.div
              animate={{
                y: [-8, 8, -8],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-40 h-40 filter drop-shadow-[0_10px_20px_rgba(138,63,252,0.25)]"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                {/* Envelope Back Plate (Translucent Purple) */}
                <rect x="15" y="25" width="70" height="50" rx="6" fill="rgba(20, 8, 31, 0.45)" stroke="rgba(138, 63, 252, 0.3)" strokeWidth="1.5" />
                
                {/* Emerging glowing data card / document */}
                <motion.rect
                  x="22"
                  y="18"
                  width="56"
                  height="34"
                  rx="3"
                  fill="rgba(224, 75, 255, 0.15)"
                  stroke="rgba(224, 75, 255, 0.6)"
                  strokeWidth="1.2"
                  animate={{
                    y: [18, 12, 18],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Document details lines */}
                <line x1="28" y1="23" x2="52" y2="23" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <line x1="28" y1="28" x2="68" y2="28" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <line x1="28" y1="33" x2="44" y2="33" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                {/* Envelope Front Fold (Liquid Glass triangular flap) */}
                <path
                  d="M 15,25 L 50,55 L 85,25"
                  stroke="rgba(255, 255, 255, 0.45)"
                  strokeWidth="1.5"
                  fill="rgba(255, 255, 255, 0.05)"
                  style={{
                    backdropFilter: "blur(6px)",
                  }}
                />
                
                {/* Lower overlapping folds */}
                <path d="M 15,75 L 42,50" stroke="rgba(138, 63, 252, 0.3)" strokeWidth="1" />
                <path d="M 85,75 L 58,50" stroke="rgba(138, 63, 252, 0.3)" strokeWidth="1" />
                
                {/* Neon core power point on clasp */}
                <circle cx="50" cy="55" r="3" fill="#E04BFF" className="animate-pulse" />
                <circle cx="50" cy="55" r="6" stroke="#8A3FFC" strokeWidth="0.5" />
              </svg>
            </motion.div>
            <span className="font-orbitron font-bold text-xs text-gray-400 tracking-widest mt-2 uppercase">
              TRANSMITTER_ONLINE
            </span>
          </motion.div>

          {/* Contact Cards Stack */}
          <div className="flex flex-col gap-4">
            {contactCards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="glass-panel glass-panel-hover p-4 flex items-center gap-4 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyber-magenta/40 transition-colors">
                  {card.icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                    {card.label}
                  </span>
                  <span className="font-sans font-bold text-sm text-white mt-0.5 group-hover:text-cyber-magenta transition-colors">
                    {card.value}
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 mt-0.5">
                    {card.sub}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Large Liquid Glass Contact Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 rounded-2xl glass-panel p-8 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Subtle tech background line decoration */}
          <div className="absolute right-0 bottom-0 w-44 h-44 border-r border-b border-cyber-neon/10 pointer-events-none" />

          {status !== "success" ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] text-cyber-neon uppercase tracking-widest">
                  // ENTER_TRANSMITTER_DATA
                </span>
                <h3 className="font-orbitron font-bold text-lg text-white">
                  Send Satellite Pulse
                </h3>
              </div>

              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="font-orbitron font-bold text-xs text-gray-400 uppercase tracking-wider">
                  Operator Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Commander Shepard"
                  disabled={status === "transmitting"}
                  className="w-full px-4 py-3 rounded-lg bg-cyber-black/75 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-magenta focus:shadow-[0_0_12px_rgba(224,75,255,0.2)] font-sans text-sm transition-all duration-300 disabled:opacity-50"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label className="font-orbitron font-bold text-xs text-gray-400 uppercase tracking-wider">
                  Return Signal Mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. pilot@alliance.net"
                  disabled={status === "transmitting"}
                  className="w-full px-4 py-3 rounded-lg bg-cyber-black/75 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-magenta focus:shadow-[0_0_12px_rgba(224,75,255,0.2)] font-sans text-sm transition-all duration-300 disabled:opacity-50"
                />
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-2">
                <label className="font-orbitron font-bold text-xs text-gray-400 uppercase tracking-wider">
                  Transmission payload
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Type secure system request details here..."
                  disabled={status === "transmitting"}
                  className="w-full px-4 py-3 rounded-lg bg-cyber-black/75 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-magenta focus:shadow-[0_0_12px_rgba(224,75,255,0.2)] font-sans text-sm transition-all duration-300 disabled:opacity-50 resize-none"
                />
              </div>

              {/* Animated Console readout logs during transmission */}
              <AnimatePresence>
                {status === "transmitting" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-lg bg-black border border-cyber-neon/30 font-mono text-[10px] text-cyber-neon flex flex-col gap-1 shadow-inner max-h-40 overflow-y-auto"
                  >
                    <div className="flex items-center gap-1.5 font-bold mb-1 border-b border-cyber-neon/10 pb-1">
                      <Terminal className="w-3.5 h-3.5 animate-pulse" />
                      CO_PROC_LOGS: ACTIVE
                    </div>
                    {consoleLogs.map((log, index) => (
                      <div key={index} className="flex items-center gap-1.5">
                        <span className="text-gray-600">&gt;</span> {log}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "transmitting"}
                className="w-full group relative py-3.5 rounded-lg font-orbitron font-bold text-xs tracking-[0.2em] uppercase text-white overflow-hidden transition-all duration-300 border border-cyber-magenta bg-cyber-magenta/10 hover:bg-cyber-magenta hover:shadow-[0_0_20px_rgba(224,75,255,0.5)] active:scale-95 disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  {status === "transmitting" ? "Transmitting..." : "Send Secure Message"}
                </span>
              </button>
            </form>
          ) : (
            /* Transmission Successful Terminal Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-10 gap-6 h-full"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-orbitron font-bold text-xl text-white">
                  TRANSMISSION SUCCESSFUL
                </h3>
                <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
                  The data payload was securely routed to <span className="text-cyber-magenta font-semibold">jroy8085@gmail.com</span>. We will establish return comms via satellite carrier shortly.
                </p>
              </div>

              {/* Reset Form Button */}
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-2 rounded-lg font-mono text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-300 active:scale-95"
              >
                RE-OPEN_UPLINK
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
