export const metadata = {
  title: "MIDILLION — The Middle Answer Dive",
  description: "Seven prompts. Twenty-five seconds each. Find the middle-ranked answer and score higher.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/style.css" />
        <link rel="preload" href="/assets/vt323-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="icon" href="/assets/favicon.png" type="image/png" />
      </head>
      <body data-phase="intro">{children}</body>
    </html>
  );
}
