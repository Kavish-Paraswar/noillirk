export const metadata = { title: "About MIDILLION", description: "How MIDILLION is built and what it is based on." };

export default function AboutPage() {
  return <main className="info-page"><article>
    <a className="info-home" href="/">← BACK TO THE GAME</a>
    <p className="eyebrow">AN OPEN, INDEPENDENT PROJECT</p>
    <h1>About MIDILLION</h1>
    <p>MIDILLION is a survey-answer game with one twist: the answer closest to the middle of the popularity distribution earns the highest score.</p>
    <h2>Game experience</h2>
    <p>The game keeps the Open Noillirk pixel-art ocean interface, krill companion, depth ruler, timed prompts, answer reveals, sound effects, wardrobe, settings, logbook, and results flow. Daily, Classic, Endless, and same-device pass-and-play are available.</p>
    <p>Each board has nine answers. The fifth-ranked answer earns 100 points, with scores tapering symmetrically toward both ends.</p>
    <h2>How it is made</h2>
    <p>The complete application base is the MIT-licensed <a href="https://github.com/TaxCollector23/Open-Noillirk" target="_blank" rel="noreferrer">Open Noillirk</a> project, which itself uses the MIT-licensed <a href="https://github.com/VulcanEon/openkrillion.com-service" target="_blank" rel="noreferrer">OpenKrillion</a> UI and assets. MIDILLION retains that UI and backend architecture while replacing the prompts, aliases, answer validation rules, and scoring model.</p>
    <p>The upstream project has no database or account system. Game progress, settings, and history are stored in this browser.</p>
    <p>See the <a href="https://github.com/Kavish-Paraswar/noillirk" target="_blank" rel="noreferrer">source code</a> and the <a href="/privacy">privacy notes</a>.</p>
    <p className="info-credit">MIDILLION is an independent project and is not affiliated with Noillirk, Open Noillirk, OpenKrillion, or their operators.</p>
  </article></main>;
}
