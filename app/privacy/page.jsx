export const metadata = { title: "Privacy — MIDILLION", description: "What MIDILLION stores in your browser and sends to its game API." };

export default function PrivacyPage() {
  return <main className="info-page"><article>
    <a className="info-home" href="/">← BACK TO THE GAME</a>
    <p className="eyebrow">YOUR DATA, PLAINLY</p><h1>Privacy</h1>
    <p>MIDILLION has no accounts or advertising. Your settings, run history, best scores, drafts, and private feedback notes are stored in this browser's local storage. Clearing this site's browser data removes them.</p>
    <h2>Game requests</h2><p>When you play, the browser contacts the MIDILLION server to deal prompts, check answers, and load answer boards. The server receives the prompt identifier, your submitted answer, and a prompt-matching request marker. The marker is not an account credential or anti-cheat protection.</p>
    <h2>Optional answer review</h2><p>If an OpenRouter API key is configured by the site operator, an off-board answer may be sent from the server to OpenRouter for an on-topic check. The key stays on the server and is never sent to your browser. Without that key, the game uses a conservative local relevance check.</p>
    <h2>Data quality</h2><p>The included prompts, answer boards, aliases, and response shares are illustrative demo data. They are not real survey results and no population comparison is collected.</p>
    <h2>Hosting</h2><p>The application can be hosted by Vercel, which may process standard connection and operational logs as part of providing the service. Feedback notes and game history remain local to this browser.</p>
    <p>Questions or code changes can be raised through the <a href="https://github.com/Kavish-Paraswar/noillirk" target="_blank" rel="noreferrer">public repository</a>.</p>
  </article></main>;
}
