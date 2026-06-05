"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, ShieldCheck, ExternalLink, ArrowRight } from "lucide-react";
import {signOut , useSession} from "next-auth/react";

import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "GitHub", href: "https://github.com" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const session = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-border/60 bg-background/80 backdrop-blur-xl" : "border-transparent bg-background/40 backdrop-blur-md"}`}
    >
      <div className="section-container flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="size-5" />
            <FileText className="absolute bottom-1.5 right-1.5 size-3.5 text-primary" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">ContractIQ</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="https://github.com/0xashishtiwari/contractiq" target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 size-4" />
              GitHub
            </Link>
          </Button>
          <Button asChild size="sm" className="rounded-full px-4">
            {session.data ? (
              <button onClick={() => signOut({
                  callbackUrl: "/signin"
              })}>
                Sign Out
              </button>
            ) : (
              <Link href="/signin">
                Analyze Contract
                <ArrowRight className="ml-2 size-4" />
              </Link>
            )}
          </Button>
        </div>
      </div>
    </motion.header>
  );
}