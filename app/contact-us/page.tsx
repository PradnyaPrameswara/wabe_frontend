import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/data/site";

export const metadata = {
  title: "Contact Us | Widhi Asih Bali Export"
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="header" style={{ height: "50vh", minHeight: "400px" }}>
        <div className="ticker white">
          <div className="ticker-inner">
            <div>Welcome to Widhi Asih Bali Export</div>
          </div>
          <div className="ticker-inner">
            <div>Welcome to Widhi Asih Bali Export</div>
          </div>
        </div>
        <img
          alt="Welcome to Widhi Asih Bali Export"
          className="header-image"
          src="/media/6a2680f03f3745a0ac723d9b_Journal_placeholder05.jpg"
        />
      </div>

      <section className="section">
        <div className="contact-page-grid" style={{ alignItems: "start" }}>
          <div className="contact-page-intro" style={{ fontSize: "16px", border: "none", padding: "16px 0" }}>
            <h4 style={{ fontSize: "24px", marginBottom: "16px" }}>Request a Custom Design</h4>
            <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
              Share your idea with us and our artisans will help turn it into a custom piece
              crafted for your needs.
            </p>
            <div className="contact-page-details" style={{ marginTop: "16px" }}>
              <a className="contact-page-detail-link" href="mailto:info@widhiasihbaliexport.com" style={{ fontSize: "16px" }}>
                info@widhiasihbaliexport.com
              </a>
              <a className="contact-page-detail-link" href="tel:+62361953239" style={{ fontSize: "16px" }}>
                +62 361 953 239 (Bali Time: GMT+8)
              </a>
              <p style={{ fontSize: "16px", marginTop: "8px" }}>{site.baliAddress}</p>
            </div>
            <div className="contact-page-map-shell">
              <iframe
                className="contact-page-map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=CV%20Widhi%20Asih%20Bali%20Export,%20Jl.%20Ratna%20No.68,%20Tegal%20Tugu,%20Kec.%20Gianyar,%20Kabupaten%20Gianyar,%20Bali%2080515&z=16&output=embed"
                title="Widhi Asih Bali Export location map"
                style={{ borderRadius: "2px" }}
              />
              <a
                className="button-text inline-block contact-page-map-link"
                href="https://maps.app.goo.gl/17ZprSJ79R49fMfT8"
                rel="noopener noreferrer"
                target="_blank"
              >
                <h6>Open Map View</h6>
                <div className="underline" style={{ width: "0%" }} />
              </a>
            </div>
          </div>
          <div className="block outline">
            <form className="custom-contact-form">
              <div className="custom-contact-field">
                <label htmlFor="contact-name">Name</label>
                <input className="input-control" id="contact-name" name="name" placeholder="Enter your full name" required type="text" />
              </div>
              <div className="custom-contact-field">
                <label htmlFor="contact-email">Email</label>
                <input className="input-control" id="contact-email" name="email" placeholder="you@example.com" required type="email" />
              </div>
              <div className="custom-contact-field">
                <label htmlFor="contact-phone">Phone</label>
                <input className="input-control" id="contact-phone" name="phone" placeholder="e.g. +62 361 953 239" required type="tel" />
              </div>
              <div className="custom-contact-field">
                <label htmlFor="contact-company">Company</label>
                <input className="input-control" id="contact-company" name="company" placeholder="Your company name (optional)" type="text" />
              </div>
              <div className="custom-contact-field">
                <label htmlFor="contact-message">Message</label>
                <textarea className="input-control" id="contact-message" name="message" required rows={7} />
              </div>
              <button className="custom-contact-submit" type="submit">
                Send Request
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
