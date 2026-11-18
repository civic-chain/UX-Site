import type { Metadata } from "next";

import { PresenterLaunch } from "./presenter-launch";

export const metadata: Metadata = {
  title: "Demo Presenter — CivicChain",
  robots: { index: false, follow: false },
};

export default function PresenterPage() {
  return <PresenterLaunch />;
}
