import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AuthValueSection } from "@/components/sections/AuthValueSection";

export const metadata = {
  title: "Create Account | Widhi Asih Bali Export"
};

export default function RegisterPage() {
  return (
    <div className="auth-page-body">
      <Header />
      <section className="section first auth-hero-section">
        <div className="auth-shell">
          <div className="auth-card auth-card-register">
            <div className="auth-card-header">
              <h1 className="auth-display-title">Create an Account</h1>
              <p>
                Create your customer account to save your preferences, follow your orders, and unlock
                a smoother buying experience.
              </p>
            </div>

            <form className="auth-page-form auth-page-form-register">
              <div className="auth-field">
                <label className="auth-field-label" htmlFor="register-name">
                  Name
                </label>
                <input className="input-control" id="register-name" name="name" placeholder="Enter your full name" required type="text" />
              </div>
              <div className="auth-field">
                <label className="auth-field-label" htmlFor="register-email">
                  Email
                </label>
                <input className="input-control" id="register-email" name="email" placeholder="E-mail address*" required type="email" />
              </div>
              <div className="auth-field">
                <label className="auth-field-label" htmlFor="register-phone">
                  Phone
                </label>
                <input className="input-control" id="register-phone" name="phone" placeholder="e.g. +62 361 953 239" required type="tel" />
              </div>
              <div className="auth-field">
                <label className="auth-field-label" htmlFor="register-company">
                  Company
                </label>
                <input className="input-control" id="register-company" name="company" placeholder="Your company name*" type="text" />
              </div>
              <div className="auth-field auth-password-field">
                <label className="auth-field-label" htmlFor="register-password">
                  Password
                </label>
                <input className="input-control" id="register-password" name="password" placeholder="Password*" required type="password" />
              </div>
              <div className="auth-field auth-password-field">
                <label className="auth-field-label" htmlFor="register-confirm-password">
                  Confirm Password
                </label>
                <input
                  className="input-control"
                  id="register-confirm-password"
                  name="confirm_password"
                  placeholder="Confirm password*"
                  required
                  type="password"
                />
              </div>
              <p className="auth-status" />
              <button className="auth-submit auth-submit-wide" type="submit">
                Create Account
              </button>
            </form>

            <div className="auth-card-links auth-card-links-center">
              <Link href="/login">Already have an account? Log in</Link>
            </div>
          </div>

          <AuthValueSection />
        </div>
      </section>
      <Footer />
    </div>
  );
}
