interface Entity {
  id: number;
}

export class Graph<
  Node extends Entity,
  Edge extends Entity & {
    from: number;
    to: number;
    weight: number;
  }
> {
  constructor(
    private readonly _nodes = new Map<number, Node>(),
    private readonly _edges = new Map<number, Edge>()
  ) {}

  public getNodeById(nodeId: number) {
    return this._nodes.get(nodeId);
  }

  public getEdgeById(edgeId: number) {
    return this._edges.get(edgeId);
  }

  public setEdge(edge: Edge) {
    this._edges.set(edge.id, edge);
  }

  public setNode(node: Node) {
    this._nodes.set(node.id, node);
  }

  public getEdgesForNode(nodeId: number) {
    return Array.from(this._edges.values()).reduce((result, edge) => {
      if (edge.from === nodeId || edge.to === nodeId) {
        result.push(edge);
      }
      return result;
    }, [] as Edge[]);
  }

  public getNodes() {
    return this._nodes.values();
  }

  public getEdges() {
    return this._edges.values();
  }

  public shortestPath(startId: number, endId: number) {
    if (startId === endId) {
      return [startId];
    }

    const edgesForAlgo: DEdge[] = Array.from(this.getEdges());
    const nodesForAlgo: DNode[] = Array.from(this.getNodes()).map((n) => {
      return {
        id: n.id,
        visited: false,
        weight: Infinity,
        prevNodeId: null,
      };
    });

    const startNode = nodesForAlgo.find((n) => n.id === startId)!;
    startNode.weight = 0;
    const nodeToFind = nodesForAlgo.find((n) => n.id === endId)!;

    return dijkstraAlgorithm(
      startNode,
      nodeToFind,
      nodesForAlgo,
      edgesForAlgo
    ).map((n) => n.id);
  }
}

interface DNode {
  id: number;
  visited: boolean;
  weight: number;
  prevNodeId: number | null;
}

interface DEdge {
  from: number;
  to: number;
  weight: number;
}

export function dijkstraAlgorithm(
  node: DNode,
  nodeToFind: DNode,
  nodes: DNode[],
  edges: DEdge[]
): DNode[] {
  // mark node as visited
  node.visited = true;

  // if we found target, then trace back path and return nodes
  if (node.id === nodeToFind.id) {
    return getPath(node, nodes);
  }

  // update weights
  updateNearbyNonVisitedNodes(node, nodes, edges);

  const nextNode = selectMinimalUnvisitedNode(nodes);

  if (!nextNode) {
    throw new Error("no next node");
  }

  return dijkstraAlgorithm(nextNode, nodeToFind, nodes, edges);
}

function updateNearbyNonVisitedNodes(
  node: DNode,
  nodes: DNode[],
  edges: DEdge[]
) {
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    // select connected edges
    if (edgeConnectedToNode(edge, node)) {
      for (let z = 0; z < nodes.length; z++) {
        const nextNode = nodes[z];

        // pick neighbors
        if (nextNode !== node && edgeConnectedToNode(edge, nextNode))
          if (nextNode.weight > node.weight + edge.weight) {
            // update weights
            nextNode.weight = node.weight + edge.weight;
            nextNode.prevNodeId = node.id;
          }
      }
    }
  }
}

function edgeConnectedToNode(edge: DEdge, node: DNode) {
  return edge.from === node.id || edge.to === node.id;
}

function selectMinimalUnvisitedNode(nodes: DNode[]) {
  let minWeight = Infinity;
  let node: DNode | undefined;

  for (let i = 0; i < nodes.length; i++) {
    if (!nodes[i].visited && nodes[i].weight < minWeight) {
      minWeight = nodes[i].weight;
      node = nodes[i];
    }
  }

  return node;
}

function getPath(node: DNode, nodes: DNode[]): DNode[] {
  const path = [];
  let curNode: DNode | undefined = node;
  while (curNode) {
    path.push(curNode);
    curNode = nodes.find((n) => n.id === curNode?.prevNodeId);
  }
  return path.reverse();
}
