import type { Metadata } from "next";

import { AccentRule } from "@/components/ui/accent-rule";
import { Badge } from "@/components/ui/badge";
import { BrandRasterImage } from "@/components/ui/brand-raster-image";
import { SurfaceCard } from "@/components/ui/surface-card";

const team = [
  {
    initials: "JH",
    name: "Justin Harvey",
    linkedIn: "https://www.linkedin.com/in/justin-harvey-cspo/",
    role: "CPO · GovTech Payments & Revenue Cycles",
    bio: "Builder since childhood, with more consumer electronics on the bench than a defunct Best Buy. Built schools on mission trips in Africa and mentored kids as a summer camp counselor. Father.",
    highlights: [
      "6+ years building government payment products at a leading GovTech provider",
      "4x patent creator, blockchain finance & GovTech inventions",
      "Ran $500M/year SaaS payment processing across 20+ agencies, millions of users",
      "Founder, 45th Parallel Risk Management",
      "GLG Council Member / VisasQ, advises institutional investors vetting GovTech and payment platforms before acquisition and investment",
      "Business development across maritime consulting and municipal government",
      "Certified Scrum Product Owner (CSPO) and multiple other certifications",
    ],
    tone: "cream",
    art: "/landing/justin-civic-building.webp",
    artAlt: "",
    artWidth: 1345,
    artHeight: 851,
  },
  {
    initials: "MS",
    name: "Michael Stansfield",
    linkedIn: "https://www.linkedin.com/in/michael-s-9144b096/",
    role: "CEO · Program Delivery & Org Design",
    bio: "Farmer when he's off the clock, and a lifelong operator in high-stakes environments.",
    highlights: [
      "18+ years of leadership and large-program delivery",
      "Deputy Lead Enterprise Agile Coach, US Navy NMCI/NGEN, 65 teams and 700 staff across the world's largest Windows intranet (classified and unclassified environments)",
      "Lead Coach and Release Train Engineer, US Army Training Information System program",
      "US Army National Guard and Reserves, Enlisted Combat Medic and Commissioned Officer (Mustang)",
      "SAFe / Agile Transformation expert across multiple 5+ team organizations",
      "Splinterlands DeFi, world's largest blockchain game (2022), and over a decade in blockchain and decentralized finance",
      "National-level logistics and operations, EMT (911), Incident Command, ESF8 Lead, Hurricane Sandy response, Brooklyn Emergency Operations Center",
      "Cross-domain experience across municipal, telecom, finance, business operations, military, and blockchain",
    ],
    tone: "sky",
    art: "/landing/michael-bridge-infrastructure.webp",
    artAlt: "",
    artWidth: 1553,
    artHeight: 591,
  },
  {
    initials: "DD",
    name: "Daniel Durante",
    linkedIn: "https://www.linkedin.com/in/daniel-durante/",
    role: "CTO · Realtime Infrastructure & DeFi",
    bio: "Welder, motorcyclist, and carpenter when he isn't shipping code.",
    highlights: [
      "13+ years full-stack engineering for Fortune 100 companies",
      "CTO, Genesis Volatility, real-time infrastructure across 900+ markets at 99.9% uptime",
      "Led Department of Transportation solicitation and proposal support nationwide",
      "Code shipped in Stripe, Walmart, and Hubcash",
      "Node / Go / Rust; blockchain and DeFi systems",
      "Published technical author for Packt Publishing",
      "Authored one of the first Authorize.net Node.js libraries, featured in Authorize.net's documentation",
      "Built and ran a text-based browser game with 100,000+ active players in high school",
      "Optimized CNC production for one of HGTV's top-selling products (Fracture), improving inventory and floor throughput",
      "Mentored University of Chicago students in a hybrid MBA and Computer Science doctorate program",
    ],
    tone: "sage",
    art: "/landing/daniel-courthouse-rotunda.webp",
    artAlt: "",
    artWidth: 1103,
    artHeight: 679,
  },
] as const;

export const metadata: Metadata = {
  title: "About | Civic-Chain",
  description:
    "Civic-Chain is built by three co-founders with extensive backgrounds in government technology, federal IT delivery, and enterprise systems infrastructure.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="section-flow gap-8 pb-16 lg:gap-9 lg:pb-24">
      <section id="about-hero" className="section-shell pt-8 lg:pt-10">
        <div className="mx-auto grid max-page gap-8">
          <div className="grid gap-6 lg:gap-7">
            <div>
              <Badge tone="gold">About us</Badge>
            </div>
            <div className="grid gap-3">
              <h1 className="max-w-5xl h3 lg:h2">Why this team delivers it.</h1>
              <p className="max-w-2xl body-lg text-slate-500">
                Civic-Chain is built by three co-founders with extensive backgrounds in government
                technology, federal IT delivery, and enterprise systems infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="section-shell lg:-mt-16">
        <div className="mx-auto grid max-page gap-7">
          <AccentRule
            sigil={
              <span className="inline-flex items-center gap-3">
                <span aria-hidden="true" className="text-gold-300">*</span>
                <span className="captions text-slate-500">
                  Three founders. One mission.
                </span>
              </span>
            }
          />
          <div className="grid gap-6 lg:gap-4 lg:grid-cols-3 lg:items-stretch">
            {team.map((member) => (
              <a
                key={member.name}
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="block h-full group/card"
              >
                <SurfaceCard
                  tone={member.tone}
                  className="relative h-full overflow-hidden border-2 border-b-8 border-gold-200 border-b-gold-300 transition-shadow group-hover/card:shadow-lg"
                >
                  <div className="relative z-10 h-full p-5 lg:p-6">
                    <div className="grid h-full content-start gap-6 pb-44 lg:pb-48">
                      <div className="flex size-14 items-center justify-center rounded-2xl border border-current/30 bg-current/10 text-current">
                        <span className="captions">{member.initials}</span>
                      </div>
                      <div className="grid gap-2">
                        <h2 className="inline-flex items-center gap-2 h4">
                          {member.name}
                          <span className="inline-flex size-5 items-center justify-center rounded bg-[#0A66C2] text-white shrink-0" aria-hidden="true">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="size-3">
                              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                            </svg>
                          </span>
                        </h2>
                        <span aria-hidden="true" className="h-px w-full bg-gold-600" />
                        <p className="captions text-current/58">{member.role}</p>
                        <div className="grid gap-3 body-sm text-current/75">
                          {member.bio.split("\n\n").map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                        <div className="grid gap-2 pt-1">
                          <p className="captions text-current/58">Track record</p>
                          <ul className="grid gap-1.5 body-sm text-current/75">
                            {member.highlights.map((item) => (
                              <li
                                key={item}
                                className="relative pl-4 before:absolute before:left-0 before:top-[0.5em] before:size-1.5 before:rounded-full before:bg-gold-600/70"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-green-100/80 to-transparent opacity-80 lg:h-52"
                  />
                  <BrandRasterImage
                    src={member.art}
                    alt={member.artAlt}
                    aria-hidden="true"
                    loading="lazy"
                    width={member.artWidth}
                    height={member.artHeight}
                    className="pointer-events-none absolute inset-x-0 -bottom-2 h-44 w-full object-contain object-bottom opacity-50 lg:h-52"
                  />
                </SurfaceCard>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
