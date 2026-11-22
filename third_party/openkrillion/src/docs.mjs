import { SITE, publicConfig } from './config.mjs';

export function documents(site = SITE) {
  const c = publicConfig(site);
  const pricing = `# ${c.name} pricing

MIDILLION is free to play. There is no checkout, subscription, credit balance, or paid unlock.

The game has ${c.rounds} prompts, ${c.answerSeconds} seconds per answer and a maximum of ${c.maxScore} points. Each point adds ${c.metresPerPoint} metres.

Privacy: ${c.origin}/privacy
Source: ${c.repository}
`;
  const models = `# ${c.name} game capabilities

MIDILLION does not use a generative model to assign ranks or points. The answer service validates exact aliases and may optionally use a server-side relevance checker for off-board answers.

## Available workflows
${c.features.map(f => '- ' + f).join('\n')}

The game has no account system or database in this source release. Runs, preferences and history are stored in browser local storage. The server provides stateless Next.js API routes for dealing prompts, checking answers and returning answer boards.

Play: ${c.origin}/
`;
  const brief = `# ${c.name}

An independent open-source survey-answer game. The fifth-ranked answer on a nine-answer board earns the highest score.

Canonical source: ${c.repository}

## Play
Seven prompts, a ${c.previewSeconds}-second preview and ${c.answerSeconds} seconds per answer. The score curve is 20, 40, 60, 80, 100, 80, 60, 40, 20. Each point adds ${c.metresPerPoint} metres.

Daily, Classic and Endless modes are available. Endless uses three balloons: a miss pops one and a Bullseye restores one.

## Data
The included prompts and answer shares are illustrative sample content, not measured survey results. The source does not include a database, user accounts, or cross-device sync. Browser local storage keeps local progress.

## Pages
- Play: ${c.origin}/
- Privacy: ${c.origin}/privacy
- About: ${c.origin}/about
- Source: ${c.repository}
`;
  return {
    '/llms.txt': brief,
    '/llms-full.txt': `${brief}\n---\n\n${pricing}\n---\n\n${models}`,
    '/pricing.md': pricing,
    '/models.md': models,
  };
}

export function aiQuestion(lang = 'en', site = SITE) {
  const urls = ['/llms.txt', '/llms-full.txt', '/pricing.md', '/models.md'].map(p => site.origin + p).join(', ');
  return `Explain MIDILLION (${site.origin}), an independent survey-answer game. Read ${urls}, describe its seven-round modes, 25-second answer timer, symmetric middle-rank scoring, local storage, and open-source implementation. Distinguish implemented behaviour from unknowns and cite sources.`;
}

export function aiLinks(lang = 'en', site = SITE) {
  const question = aiQuestion(lang, site);
  return [
    ['ChatGPT', 'chatgpt', 'https://chatgpt.com/'],
    ['Claude', 'claude', 'https://claude.ai/new'],
    ['Perplexity', 'perplexity', 'https://www.perplexity.ai/search'],
    ['Google AI Mode', 'gemini', 'https://www.google.com/search'],
    ['Grok', 'grok', 'https://grok.com/'],
  ].map(([name, icon, base]) => {
    const url = new URL(base);
    url.searchParams.set('q', question);
    if (name === 'Google AI Mode') url.searchParams.set('udm', '50');
    return { name, icon, href: url.href };
  });
}
