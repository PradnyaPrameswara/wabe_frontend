import Link from "next/link";
import { site } from "@/data/site";

const legalLinks = [
  { href: "/legal/privacy-and-cookies", label: "Privacy and Cookies" },
  { href: "/legal/returns-and-exchanges", label: "Returns and Exchanges" },
  { href: "/legal/shipping-and-handling", label: "Shipping and Handling" },
  { href: "/legal/terms-and-conditions", label: "Terms and Conditions" }
];

const socialLinks = ["Instagram", "YouTube", "TikTok", "Facebook", "Twitter"];

export function Footer() {
  return (
    <section className="footer">
      <div className="footer-grid">
        <div className="footer-item" id="layout-node-fa5bfe3e-4fa7-52ea-83f5-221f6a785190-6a78518e">
          <div className="block">
            <h6>FUND US</h6>
            <Link className="footer-link inline-block" href="/legal/privacy-and-cookies">
              <div>{site.address}</div>
            </Link>
          </div>
          <div className="block">
            <h6>OPEN</h6>
            <div>
              Monday - Friday: 8 AM - 5 PM
              <br />
              Saturday - Sunday: Closed
            </div>
          </div>
          <div className="block">
            <h6>CONTACT</h6>
            <div>
              {site.phone}
              <br />
              <a 
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${site.email}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-link"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
        <div className="footer-item" id="layout-node-fa5bfe3e-4fa7-52ea-83f5-221f6a7851ad-6a78518e">
          <div className="block">
            {legalLinks.map((link) => (
              <Link className="footer-link inline-block" href={link.href} key={link.href}>
                <div>{link.label}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-item">
          <h6>LOCATION</h6>
          <iframe
            title="Widhi Asih Bali Export Location"
            src="https://maps.google.com/maps?q=CV%20Widhi%20Asih%20Bali%20Export,%20Jl.%20Ratna%20No.68,%20Tegal%20Tugu,%20Kec.%20Gianyar,%20Kabupaten%20Gianyar,%20Bali%2080515&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: "2px", display: "block", marginTop: "12px", marginBottom: "12px" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            className="footer-link inline-block"
            href="https://maps.app.goo.gl/17ZprSJ79R49fMfT8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>Get Directions ↗</div>
          </a>
        </div>
      </div>
      <div className="space _96px" />
      <div className="footer-grid">
        <div className="footer-item" id="layout-node-fa5bfe3e-4fa7-52ea-83f5-221f6a7851d9-6a78518e">
          <Link 
            className="menu-logo inline-block" 
            href="/"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <img 
              src="/media/wabe-logo.png" 
              alt="Widhi Asih Bali Export Logo" 
              style={{ height: "35px", width: "auto", objectFit: "contain", display: "block" }} 
            />
            <span className="brand-logo-text" style={{ color: "#ffffff", margin: 0 }}>{site.name}</span>
          </Link>
        </div>
        <div className="footer-item" id="layout-node-fa5bfe3e-4fa7-52ea-83f5-221f6a7851dc-6a78518e">
          <div className="block">
            {socialLinks.map((label) => (
              <a className="footer-link inline-block" href="#" key={label}>
                <div>{label}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
