import { Graph } from "./graph";

describe("Graph manipulation", () => {
  const nodes = new Array(6).fill(null).map((_, i) => ({ id: i + 1 }));

  const edges = [
    { id: 1, from: 1, to: 3, weight: 4 },
    { id: 2, from: 1, to: 4, weight: 5 },
    { id: 3, from: 3, to: 2, weight: 4 },
    { id: 4, from: 4, to: 2, weight: 2 },
    { id: 5, from: 2, to: 5, weight: 7 },
    { id: 6, from: 5, to: 6, weight: 1 },
  ];

  const graph = new Graph<typeof nodes[0], typeof edges[0]>();
  nodes.forEach((n) => graph.setNode(n));
  edges.forEach((e) => graph.setEdge(e));

  it("should find shortest path by Dijkstra algorithm", () => {
    expect(graph.shortestPath(1, 6)).toEqual([1, 4, 2, 5, 6]);
  });
});
