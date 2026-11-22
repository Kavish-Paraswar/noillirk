export const metadata = {
  title: "MIDILLION — The Game of the Middle",
  description: "Seven prompts. Twenty-five seconds. Find the answer closest to the middle of the crowd.",
  openGraph: {
    title: "MIDILLION — The Game of the Middle",
    description: "Find the middle. Climb higher.",
    images: [{ url: "/assets/og.svg", width: 1200, height: 630, alt: "MIDILLION — Find the middle. Climb higher." }]
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/og.svg"]
  }
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
