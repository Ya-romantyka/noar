"use client";

import { useEffect, useMemo } from "react";

export function useFont(family: string | string[]) {
  const list = useMemo(() => (Array.isArray(family) ? family : [family]), [family]);

  useEffect(() => {
    const esc = (s: string) => s.replace(/'/g, "\\'");
    const sid = (s: string) => `ff-${s.replace(/[^a-z0-9_-]/gi, "_")}`;

    for (const fam of list) {
      const id = sid(fam);
      if (document.getElementById(id)) continue;

      const css = `
@font-face{
  font-family:'${esc(fam)}';
  src:
    url("/fonts/project/${fam}.woff2") format("woff2"),
    url("/fonts/project/${fam}.woff") format("woff"),
    url("/fonts/project/${fam}.ttf") format("truetype"),
    url("/fonts/project/${fam}.otf") format("opentype");
  font-style: normal;
  font-display: swap;
}
`;
      const el = document.createElement("style");
      el.id = id;
      el.textContent = css;
      document.head.appendChild(el);
    }
  }, [list]);
}
