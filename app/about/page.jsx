export const metadata = { title: "About MIDILLION", description: "How MIDILLION is built and what it is based on." };

export default function AboutPage() {
  return <main className="info-page"><article>
    <a className="info-home" href="/">← BACK TO THE GAME</a>
    <p className="eyebrow">AN OPEN, INDEPENDENT PROJECT</p>
    <h1>About MIDILLION</h1>
    <p>MIDILLION is a survey-answer climbing game with a different objective: the answer closest to the middle of the popularity distribution earns the highest score.</p>
    <h2>How it is made</h2>
    <p>The browser client and visual assets are adapted from the MIT-licensed <a href="https://github.com/VulcanEon/openkrillion.com-service" target="_blank" rel="noreferrer">OpenKrillion</a> project and the independent <a href="https://github.com/TaxCollector23/Open-Noillirk" target="_blank" rel="noreferrer">Open Noillirk reconstruction</a>. Their licenses are preserved in this repository. MIDILLION's scoring rules, prompts, answer data, and API are maintained separately.</p>
    <p>The public Noillirk experience was investigated using the methodology documented by <a href="https://github.com/morluto/rea" target="_blank" rel="noreferrer">REA</a>. The original operator's private source code, server, accounts, and survey dataset are not included.</p>
    <h2>Game modes</h2><p>Daily and Classic have seven rounds. Endless continues with three balloons. Multiplayer is intentionally not included in this version.</p>
    <p>See the <a href="https://github.com/Kavish-Paraswar/noillirk" target="_blank" rel="noreferrer">source code</a>, the <a href="/privacy">privacy notes</a>, and the in-game guide for more detail.</p>
    <p className="info-credit">MIDILLION is an independent project and is not affiliated with Noillirk, OpenKrillion, or the operators of the original games.</p>
  </article></main>;
}
