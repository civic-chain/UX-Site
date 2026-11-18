import Link from "next/link";

const footerLinks = [
  { label: "About us", href: "/about" },
  { label: "Partners", href: "/partners" },
] as const;

// Inline brand glyphs (no new icon assets; mirrors the inline LinkedIn SVG used
// on the About page). `path` is the single-color logo path for each network.
const socials = [
  {
    label: "Civic-Chain on X",
    href: "https://x.com/TheCivicChain",
    viewBox: "0 0 24 24",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Civic-Chain on LinkedIn",
    href: "https://www.linkedin.com/company/civic-chain",
    viewBox: "0 0 16 16",
    path: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
  },
] as const;

export function SiteFooter({ id = "site-footer" }: { id?: string } = {}) {
  return (
    <footer
      id={id}
      className="border-t border-border bg-background px-6 py-6"
    >
      <div className="mx-auto flex max-w-[var(--page-max)] flex-wrap items-center justify-between gap-4">
        <p className="captions text-slate-500">© 2026 Civic-Chain</p>
        <div className="flex flex-wrap items-center gap-6">
          <nav aria-label="Footer" className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center captions text-slate-500 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Social" className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex min-h-11 items-center text-slate-500 transition-colors hover:text-foreground"
              >
                <svg
                  viewBox={social.viewBox}
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
