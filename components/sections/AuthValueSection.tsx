import { authValueCards } from "@/data/site";

export function AuthValueSection() {
  return (
    <section aria-labelledby="auth-value-title" className="auth-value-section" style={{ paddingBottom: "80px" }}>
      <div className="auth-value-header" style={{ marginBottom: "64px" }}>
        <p className="auth-value-eyebrow">Why partners choose us</p>
        <h2 id="auth-value-title">Craftsmanship Beyond Compare</h2>
        <p style={{ maxWidth: "600px", margin: "0 auto" }}>
          From first sketch to final delivery, we combine Balinese artistry, reliable production
          systems, and careful quality control to create pieces made to last.
        </p>
      </div>

      <div className="auth-value-grid">
        {authValueCards.map((card) => (
          <article className="auth-value-card" key={card.title} style={{ border: "none", background: "transparent", padding: 0, gap: "8px", alignItems: "center", textAlign: "center" }}>
            <div className="auth-value-card-header" style={{ flexDirection: "column", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              <div aria-hidden="true" className="auth-value-icon" style={{ background: "transparent", border: "none", width: "auto", height: "auto", color: "#5f5952", margin: "0 auto" }}>
                {card.title === "Masterful Craftsmanship" && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                )}
                {card.title === "Quality Excellence" && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                  </svg>
                )}
                {card.title === "Custom Creations" && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" />
                  </svg>
                )}
              </div>
              <h3 style={{ margin: 0, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{card.title}</h3>
            </div>
            <p className="auth-value-summary" style={{ margin: "0 auto", lineHeight: "1.6", fontSize: "13px", color: "#5f5952", maxWidth: "260px" }}>{card.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
