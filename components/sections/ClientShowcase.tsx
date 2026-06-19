"use client";

import { useState } from "react";

type ClientLogo = {
  name: string;
  href: string;
  logo: string;
  fallbackLogos?: string[];
  cardClass?: string;
};

const topRowClients: ClientLogo[] = [
  {
    name: "At Home",
    href: "https://www.athome.com/",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/At%20Home%20logo.svg"
  },
  {
    name: "Banana Republic",
    href: "https://bananarepublic.gap.com/",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Banana_Republic.svg"
  },
  {
    name: "Bloomingville",
    href: "https://www.bloomingville.com/en",
    logo:
      "https://cdn.bloomingville.com/admin/public/getimage.ashx?Image=/Files/Images/Web/Logo/Bloomingville-Multibrand-House-logo.png&Width=1920&Height=1920&Format=png&Quality=75&Crop=4"
  },
  {
    name: "Burlington",
    href: "https://www.burlington.com/",
    logo: "https://www.burlington.com/_next/static/media/burlington-logo.1a7f14c5.png"
  },
  {
    name: "Creative Co-Op",
    href: "https://www.creativecoop.com/",
    logo: "/media/ccoi-logo.png"
  }
];

const bottomRowClients: ClientLogo[] = [
  {
    name: "E-Jumbo",
    href: "https://corporate.e-jumbo.gr/en/",
    logo: "/media/ejumbo.png",
    cardClass: "is-soft-dark-logo"
  },
  {
    name: "HomeGoods",
    href: "https://www.homegoods.com/",
    logo: "https://www.homegoods.com/img/icons-logos/homegoods.svg"
  },
  {
    name: "Koopman International",
    href: "https://www.koopmanint.com/en/",
    logo: "https://www.koopmanint.com/wp-content/themes/Koopman/images/logo.png"
  },
  {
    name: "McGee & Co.",
    href: "https://www.mcgeeandco.com/",
    logo: "https://www.mcgeeandco.com/cdn/shop/files/mcgee-logo.svg?v=1676646646&width=372"
  },
  {
    name: "Posiwio",
    href: "https://www.posiwio.de/",
    logo: "https://www.posiwio.de/files/posiwio/images/logo.png"
  },
  {
    name: "Thomas Philipps",
    href: "https://www.thomas-philipps.de/",
    logo: "https://www.thomas-philipps.de/media/3a/d4/bd/1772007580/new-tp-logo.svg"
  },
  {
    name: "TJX",
    href: "https://www.tjx.com/",
    logo: "https://www.tjx.com/ResourcePackages/Bootstrap5/assets/dist/images/tjx-logo-mobile.svg"
  }
];

function LogoCard({ client, isDuplicate = false }: { client: ClientLogo; isDuplicate?: boolean }) {
  const logoSources = [client.logo, ...(client.fallbackLogos || [])];
  const [logoIndex, setLogoIndex] = useState(0);
  const activeLogo = logoSources[logoIndex];

  return (
    <a
      className={`client-showcase-card ${client.cardClass || ""}`}
      href={client.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${client.name}`}
      tabIndex={isDuplicate ? -1 : undefined}
    >
      {activeLogo ? (
        <img
          alt={`${client.name} logo`}
          className="client-showcase-logo"
          decoding="async"
          loading="lazy"
          src={activeLogo}
          onError={() => {
            setLogoIndex((currentIndex) => currentIndex + 1);
          }}
        />
      ) : (
        <span className="client-showcase-logo-fallback">{client.name}</span>
      )}
    </a>
  );
}

function MarqueeRow({ clients, reverse = false }: { clients: ClientLogo[]; reverse?: boolean }) {
  return (
    <div className={`client-showcase-marquee-row ${reverse ? "is-reverse" : ""}`}>
      <div className="client-showcase-track">
        {[0, 1].map((setIndex) => (
          <div
            aria-hidden={setIndex === 1 ? true : undefined}
            className="client-showcase-set"
            key={`client-showcase-set-${setIndex}`}
          >
            {clients.map((client) => (
              <LogoCard client={client} isDuplicate={setIndex === 1} key={`${client.name}-${setIndex}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientShowcase() {
  return (
    <section className="section client-showcase-section" aria-labelledby="client-showcase-title">
      <div className="section-headline client-showcase-headline">
        <div>
          <h4 id="client-showcase-title">Client Showcase</h4>
          <p>Trusted by retail, home, and lifestyle partners across global B2B channels.</p>
        </div>
      </div>
      <div className="client-showcase-bento" data-client-showcase>
        <MarqueeRow clients={topRowClients} />
        <MarqueeRow clients={bottomRowClients} reverse />
      </div>
    </section>
  );
}
