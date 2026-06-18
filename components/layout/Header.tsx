"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCart } from "@/components/cart/CartProvider";
import { site } from "@/data/site";

const navigationLinks = [
  { href: "/shop", label: "Shop", key: "shop" },
  { href: "/collections", label: "Collections", key: "collections" },
  { href: "/about", label: "About", key: "about" },
  { href: "/contact-us", label: "Contact Us", key: "contact" }
];

function isCurrentPath(pathname: string, key: string, href: string) {
  if (key === "shop") return pathname === "/shop" || pathname.startsWith("/product");
  if (key === "collections") return pathname === "/collections" || pathname.startsWith("/category");
  if (key === "contact") return pathname === "/contact-us";
  return pathname === href;
}

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {navigationLinks.map((link) => {
        const isCurrent = isCurrentPath(pathname, link.key, link.href);

        return (
          <Link
            aria-current={isCurrent ? "page" : undefined}
            className={`navigation-link inline-block${isCurrent ? " is-current" : ""}`}
            href={link.href}
            key={link.href}
            onClick={onNavigate}
          >
            <div>{link.label}</div>
          </Link>
        );
      })}
    </>
  );
}

function AccountLink({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      aria-label="Login or register"
      className="navigation-link inline-block profile-login-link"
      href="/login"
      onClick={onNavigate}
    >
      <span aria-hidden="true" className="profile-login-icon">
        <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
          <path
            d="M4 21C4 17.6863 7.58172 15 12 15C16.4183 15 20 17.6863 20 21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      </span>
    </Link>
  );
}

function CartButton({ onNavigate }: { onNavigate?: () => void }) {
  const { itemCount, openCart } = useCart();

  return (
    <button
      aria-haspopup="dialog"
      aria-label="Open cart"
      className="shop-cartopenlink navigation-link inline-block header-action-button"
      onClick={() => {
        onNavigate?.();
        openCart();
      }}
      type="button"
    >
      <div className="inline-block">Bag</div>
      <div className="shop-cartopenlinkcount cart-quantity">{itemCount}</div>
    </button>
  );
}

export function Header({ menuId }: { menuId?: string }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isHome = pathname === "/";

  return (
    <>
      <div className="menu" id={menuId}>
        <Link
          aria-current={isHome ? "page" : undefined}
          className={`menu-logo inline-block${isHome ? " is-current" : ""}`}
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <img src="/media/wabe-logo.png" alt="Widhi Asih Bali Export Logo" style={{ height: "35px", width: "auto", objectFit: "contain", display: "block" }} />
          <span className="brand-logo-text" style={{ margin: 0 }}>{site.name}</span>
        </Link>
        <div className="desktop-navigation">
          <div className="menu-navigation">
            <NavigationLinks />
            <CartButton />
            <AccountLink />
          </div>
        </div>
        <button
          aria-expanded={isMobileOpen}
          aria-label="Toggle navigation"
          className="mobile-menu-icon inline-block header-action-button"
          onClick={() => setIsMobileOpen((current) => !current)}
          type="button"
        >
          <img
            alt=""
            className="burger"
            loading="lazy"
            src="/media/6a2680f03f3745a0ac723d2b_Menu.svg"
            style={{ display: isMobileOpen ? "none" : undefined }}
          />
          <img
            alt=""
            className="close-menu"
            loading="lazy"
            src="/media/6a2680f03f3745a0ac723d2c_close.svg"
            style={{ display: isMobileOpen ? "block" : undefined }}
          />
        </button>
      </div>
      <div className="mobile-menu-wrapper" style={{ display: isMobileOpen ? "flex" : undefined }}>
        <div className="mobile-menu-container">
          <div className="menu-navigation">
            <NavigationLinks onNavigate={() => setIsMobileOpen(false)} />
            <CartButton onNavigate={() => setIsMobileOpen(false)} />
            <AccountLink onNavigate={() => setIsMobileOpen(false)} />
          </div>
        </div>
      </div>
      <CartDrawer />
    </>
  );
}
