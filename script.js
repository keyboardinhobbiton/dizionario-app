import * as Plot from "@observablehq/plot"; // Assicurati di importare Plot

const gods = [
  "Chaos/Gaia/Mountains",
  "Chaos/Gaia/Pontus",
  "Chaos/Gaia/Uranus",
  "Chaos/Eros",
  "Chaos/Erebus",
  "Chaos/Tartarus"
];

// 1. Parsing dei percorsi in nodi e link
const nodes = new Map();
const links = [];

for (const path of gods) {
  const parts = path.split("/");
  for (let i = 0; i < parts.length; i++) {
    const id = parts.slice(0, i + 1).join("/");
    if (!nodes.has(id)) {
      nodes.set(id, { id: id, name: parts[i], depth: i });
    }
    if (i > 0) {
      const parentId = parts.slice(0, i).join("/");
      links.push({
        source: parentId,
        target: id
      });
    }
  }
}

// 2. Estraggo lista di nodi
const nodeArray = Array.from(nodes.values());

// 3. Layout verticale
const yScale = new Map();
for (const node of nodeArray) {
  yScale.set(node.id, node.depth);
}

// 4. Output visivo
const plot = Plot.plot({
  axis: null,
  height: 400,
  margin: 50,
  marginLeft: 100,
  marginRight: 100,
  marks: [
    Plot.link(links, {
      x1: d => d.source,
      x2: d => d.target,
      y1: d => yScale.get(d.source),
      y2: d => yScale.get(d.target),
      stroke: "black"
    }),
    Plot.text(nodeArray, {
      x: d => d.id,
      y: d => yScale.get(d.id),
      text: d => d.name,
      textAnchor: "start",
      dx: 4,
      dy: 3,
      fontSize: 12,
      fill: "black"
    })
  ],
  x: {
    axis: null,
    transform: d => d.split("/").join("-"),
    padding: 1
  },
  y: {
    reverse: true,
    domain: Array.from(new Set(nodeArray.map(d => d.depth)))
  }
});

document.body.appendChild(plot);

