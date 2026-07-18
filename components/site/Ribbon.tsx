"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Ribbon({ phone }: { phone?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-paper/90 backdrop-blur">
      <div className="container flex items-center justify-between py-2">
        {/* Logo */}
        <div className="shrink-0">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <Image
              src={siteConfig.logo.light}
              alt={siteConfig.shortName}
              width={128}
              height={128}
              priority
              className="h-28 w-auto md:h-12 lg:h-28"
            />
          </Link>
        </div>

        {/* Center Heading */}
        <div className="hidden flex-1 flex-col items-center justify-center px-4 text-center md:flex">
          <h3 className="text-xs font-medium text-slate-700 lg:text-sm">
            गुरु गोविंद सिंह इंद्रप्रस्थ विश्वविद्यालय
          </h3>

          <h2 className="text-base font-bold text-primary lg:text-xl">
            Guru Gobind Singh Indraprastha University
          </h2>

          <h3 className="text-xs font-medium text-slate-700 lg:text-sm">
            Admission and eCounselling Services for Session 2026
          </h3>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            className="rounded-md p-2"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* CTA */}
        <div className="shrink-0">
          <Button asChild size="sm" className="text-xs md:text-sm">
            <Link href="/counselling">Get Free Counselling</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}