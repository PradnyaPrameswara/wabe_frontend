import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AuthValueSection } from "@/components/sections/AuthValueSection";

export const metadata = {
  title: "Login | Widhi Asih Bali Export"
};

export default function LoginPage() {
  return (
    <div className="auth-page-body">
      <Header />
      <section className="section first auth-hero-section">
        <div className="auth-shell">
          <div className="auth-card auth-card-login">
            <div className="auth-card-header">
              <h1 className="auth-display-title">Login</h1>
              <p>
                Log in to your account to track your orders, find your favorites and manage your
                preferences.
              </p>
            </div>

            <form className="auth-page-form">
              <div className="auth-field">
                <label className="auth-field-label" htmlFor="login-email">
                  Email
                </label>
                <input
                  className="input-control"
                  id="login-email"
                  name="email"
                  placeholder="E-mail address*"
                  required
                  type="email"
                />
              </div>
              <div className="auth-field auth-password-field">
                <label className="auth-field-label" htmlFor="login-password">
                  Password
                </label>
                <input
                  className="input-control"
                  id="login-password"
                  name="password"
                  placeholder="Password*"
                  required
                  type="password"
                />
              </div>
              <p className="auth-status" />
              <button className="auth-submit auth-submit-wide" type="submit">
                Login
              </button>
            </form>

            <div className="auth-card-links auth-card-links-split">
              <Link href="/register">Create an account</Link>
              <Link href="/contact-us">Forgot your password?</Link>
            </div>
          </div>

          <AuthValueSection />
        </div>
      </section>
      <Footer />
    </div>
  );
}
