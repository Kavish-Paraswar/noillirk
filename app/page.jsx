import MidillionClient from "./open-noillirk-client";
import { buildMidillionMarkup } from "@/lib/openkrillion-shell";

export default function Home() {
  return <MidillionClient markup={buildMidillionMarkup()} />;
}
