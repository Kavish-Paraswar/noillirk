"use client";

import { useEffect } from "react";

export default function MidillionClient({ markup }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "/app.mjs";
    script.dataset.midillion = "game-client";
    document.body.append(script);
    return () => script.remove();
  }, []);

  return <div id="midillion-game" dangerouslySetInnerHTML={{ __html: markup }} />;
}
