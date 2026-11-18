import type { Metadata } from "next";

import { DemoConsole } from "../demo-console-v2";
import { DemoProvider } from "../director/DemoProvider";
import type { DemoQueryState } from "../demo-types";
// The console this route now renders owns the landscape print rules, and the
// presenter prints the same packets from here.
import "../print.css";

export const metadata: Metadata = {
  title: "Civic-Chain — Live Presenter Demo",
  robots: { index: false, follow: false },
};

const defaultState: DemoQueryState = { screen: "overview" };

export default function LiveDemoPage() {
  return (
    <DemoProvider alwaysPresenting>
      <DemoConsole initialState={defaultState} />
    </DemoProvider>
  );
}
