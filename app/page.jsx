import MidillionClient from "./midillion-client";
import { buildMidillionMarkup } from "@/lib/midillion-shell";

export default function Home() {
  return <MidillionClient markup={buildMidillionMarkup()} />;
}
