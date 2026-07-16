"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "./brand-mark";
import { useCart } from "./cart-provider";

const links = [
  { href: "/menu-pairing", label: "Menus" },
  { href: "/pairing", label: "Accord" },
  { href: "/catalogue", label: "Cave" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { bottleCount } = useCart();
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="logo-link" onClick={() => setOpen(false)}>
          <BrandMark />
        </Link>
        <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Navigation principale">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/cart" className="cart-link" aria-label={`Sélection, ${bottleCount} bouteille${bottleCount > 1 ? "s" : ""}`}>
            <ShoppingBag size={20} />
            <b className="cart-label">Sélection</b>
            {bottleCount > 0 && <span>{bottleCount}</span>}
          </Link>
          <button
            className="menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Ouvrir le menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
