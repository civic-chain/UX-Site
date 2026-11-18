import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <div className="relative text-foreground">
        <div
          aria-hidden="true"
          data-site-background="grid"
          className="landing-grid-overlay pointer-events-none absolute inset-0"
        />
        <div className="relative">{children}</div>
      </div>
      <SiteFooter />
    </>
  );
}
