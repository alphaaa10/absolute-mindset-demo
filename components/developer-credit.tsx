"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

/* ─── Inline SVG Icons ─────────────────────────────────────────────────────── */
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.16 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.18 1.42h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.42a16 16 0 0 0 6.29 6.29l1.42-1.42a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
)

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const IconStar = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const DEV = {
  name: "Mohammed Shafiq Shaikh",
  role: "Engineer",
  bio: "I design and build high-performance products and websites/app for brands,cafe's, gyms, and bussiness's. Every pixel is intentional; every interaction is engineered to drive results. Visit the portfolio to Know More",
  skills: ["Web Design", "Development", "SEO", "Branding", "AI-ML"],
  email: "mdshafiqshaikh10@gmail.com",
  phone: "+91 7758882887",
  portfolio: "https://mohammed-shafiq-portfolio.vercel.app/",
}

/* ─── Styles ────────────────────────────────────────────────────────────────── */
const s: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    padding: "80px 0 100px",
    overflow: "hidden",
    background: "#111111",
  },
  divider: {
    display: "block",
    height: "1px",
    width: "100%",
    background: "linear-gradient(90deg, transparent 0%, #F97316 30%, #F97316 70%, transparent 100%)",
    marginBottom: "60px",
    opacity: 0.5,
  },
  container: {
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "0 24px",
  },
  eyebrow: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.25em",
    textTransform: "uppercase" as const,
    color: "#F97316",
    display: "block",
    marginBottom: "10px",
  },
  headline: {
    fontFamily: "'Bebas Neue', cursive",
    fontSize: "clamp(2rem, 4vw, 3rem)",
    lineHeight: 1,
    letterSpacing: "0.04em",
    color: "#fafafa",
    marginBottom: "32px",
  },
  headlineAccent: {
    color: "#F97316",
  },
  card: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    background: "#1a1a1a",
    border: "1px solid rgba(255,255,255,0.07)",
    borderLeft: "3px solid #F97316",
    borderRadius: "3px",
    overflow: "hidden" as const,
  },
  bioPanel: {
    padding: "40px",
    borderRight: "1px solid rgba(255,255,255,0.07)",
  },
  devName: {
    fontFamily: "'Bebas Neue', cursive",
    fontSize: "1.9rem",
    letterSpacing: "0.05em",
    color: "#fafafa",
    lineHeight: 1,
    marginBottom: "4px",
  },
  devRole: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "0.78rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "#F97316",
    marginBottom: "20px",
  },
  dividerThin: {
    height: "1px",
    background: "rgba(255,255,255,0.07)",
    border: "none",
    margin: "20px 0",
  },
  bio: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "0.92rem",
    lineHeight: 1.75,
    color: "#9a9aa6",
    marginBottom: "24px",
  },
  skillsLabel: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "#9a9aa6",
    marginBottom: "10px",
  },
  tagsRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
  },
  tag: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "#F97316",
    background: "rgba(249,115,22,0.12)",
    border: "1px solid rgba(249,115,22,0.3)",
    borderRadius: "2px",
    padding: "4px 10px",
  },
  contactPanel: {
    padding: "40px",
    background: "#222222",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between" as const,
  },
  contactLabel: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "#9a9aa6",
    marginBottom: "20px",
  },
  contactList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 32px 0",
    display: "flex",
    flexDirection: "column" as const,
    gap: "14px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  contactIcon: {
    width: "36px",
    height: "36px",
    background: "rgba(249,115,22,0.12)",
    border: "1px solid rgba(249,115,22,0.25)",
    borderRadius: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#F97316",
    flexShrink: 0,
  },
  contactMeta: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1px",
  },
  contactMetaLabel: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "9px",
    fontWeight: 600,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "#9a9aa6",
  },
  contactMetaValue: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "0.88rem",
    color: "#fafafa",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
  ctaButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "14px 24px",
    background: "#F97316",
    color: "#111111",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background 0.2s ease, transform 0.15s ease",
  },
  bottomStrip: {
    marginTop: "40px",
    padding: "18px 32px",
    background: "#161616",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between" as const,
    flexWrap: "wrap" as const,
    gap: "12px",
  },
  bottomText: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "0.82rem",
    color: "#9a9aa6",
  },
  bottomTextHighlight: {
    color: "#fafafa",
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "#F97316",
    background: "rgba(249,115,22,0.1)",
    border: "1px solid rgba(249,115,22,0.3)",
    borderRadius: "2px",
    padding: "5px 12px",
  },
  pulseDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#F97316",
    display: "inline-block",
    animation: "dev-credit-pulse 1.8s ease-in-out infinite",
  },
}

/* ─── Component ─────────────────────────────────────────────────────────────── */
export function DeveloperCredit() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section style={s.section} aria-label="Website Developer Credit">
      {/* Keyframe injection */}
      <style>{`
        @keyframes dev-credit-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.8); }
        }
        .dev-cta-btn:hover {
          background: #fb923c !important;
          transform: translateY(-1px) !important;
        }
        .dev-contact-link:hover {
          color: #F97316 !important;
        }
      `}</style>

      {/* Top divider */}
      <span style={s.divider} aria-hidden="true" />

      <div style={s.container} ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span style={s.eyebrow}>Website Development</span>
          <h2 style={s.headline}>
            Built By{" "}
            <span style={s.headlineAccent}>A Professional</span>
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={s.card}
          className="dev-card-grid"
        >
          {/* ── Bio Panel ── */}
          <div style={s.bioPanel}>
            <p style={s.devName}>{DEV.name}</p>
            <p style={s.devRole}>{DEV.role}</p>

            <hr style={s.dividerThin} />

            {/* Star rating micro-element */}
            <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: "#F97316" }}>
                  <IconStar />
                </span>
              ))}
            </div>

            <p style={s.bio}>{DEV.bio}</p>

            <p style={s.skillsLabel}>Services Offered</p>
            <div style={s.tagsRow}>
              {DEV.skills.map((skill) => (
                <span key={skill} style={s.tag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* ── Contact Panel ── */}
          <div style={s.contactPanel}>
            <div>
              <p style={s.contactLabel}>Get In Touch</p>

              <ul style={s.contactList}>
                {/* Email */}
                <li style={s.contactItem}>
                  <span style={s.contactIcon}>
                    <IconMail />
                  </span>
                  <span style={s.contactMeta}>
                    <span style={s.contactMetaLabel}>Email</span>
                    <a
                      href={`mailto:${DEV.email}`}
                      style={s.contactMetaValue}
                      className="dev-contact-link"
                    >
                      {DEV.email}
                    </a>
                  </span>
                </li>

                {/* Phone / WhatsApp */}
                <li style={s.contactItem}>
                  <span style={s.contactIcon}>
                    <IconPhone />
                  </span>
                  <span style={s.contactMeta}>
                    <span style={s.contactMetaLabel}>WhatsApp / Phone</span>
                    <a
                      href={`https://wa.me/${DEV.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      style={s.contactMetaValue}
                      className="dev-contact-link"
                    >
                      {DEV.phone}
                    </a>
                  </span>
                </li>

                {/* Portfolio */}
                <li style={s.contactItem}>
                  <span style={s.contactIcon}>
                    <IconGlobe />
                  </span>
                  <span style={s.contactMeta}>
                    <span style={s.contactMetaLabel}>Portfolio</span>
                    <a
                      href={`https://${DEV.portfolio}`}
                      target="_blank"
                      rel="noreferrer"
                      style={s.contactMetaValue}
                      className="dev-contact-link"
                    >
                      {DEV.portfolio}
                    </a>
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <a
              href={`https://mohammed-shafiq-portfolio.vercel.app/`}
              style={s.ctaButton}
              className="dev-cta-btn"
              id="dev-credit-cta"
            >
              Start Your Project
              <IconArrow />
            </a>
          </div>
        </motion.div>

        {/* Bottom strip */}
        <div style={s.bottomStrip}>
          <p style={s.bottomText}>
            Want a website like this for your brand?{" "}
            <span style={s.bottomTextHighlight}>
              This site was custom-built — yours can be too.
            </span>
          </p>
          <span style={s.badge}>
            <span style={s.pulseDot} aria-hidden="true" />
            Available for Projects
          </span>
        </div>
      </div>

      {/* Responsive: stack to single column on mobile */}
      <style>{`
        @media (max-width: 680px) {
          .dev-card-grid {
            grid-template-columns: 1fr !important;
          }
          .dev-card-grid > *:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.07) !important;
          }
        }
      `}</style>
    </section>
  )
}
