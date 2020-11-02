let grid = [];
const nodesInOrder = [];
const unvisitedNodes = [];

export function aStar(g) {
  grid = g.slice();
  getNeighbors(13, 7);
  unvisitedNodes.sort(
    (a, b) => a.distance + a.distanceToEnd - (b.distance + b.distanceToEnd) //Fix these (Read thing at bottom of file)
  );
  while (unvisitedNodes.length > 0) {
    const currentNode = unvisitedNodes.shift();
    if (currentNode.isWall || currentNode.isVisited || currentNode.isStart)
      continue;
    currentNode.isVisited = true;

    nodesInOrder.push(currentNode);
    if (currentNode.isFinish) break;
    getNeighbors(currentNode.row, currentNode.col);
    unvisitedNodes.sort(
      (a, b) => a.distance + a.distanceToEnd - (b.distance + b.distanceToEnd) //Fix these
    );
  }
  return nodesInOrder;
}

function getNeighbors(row, col) {
  if (row > 0) {
    if (!grid[row - 1][col].previousNode) {
      grid[row - 1][col].previousNode = grid[row][col];
      grid[row - 1][col].distance =
        grid[row - 1][col].distance + grid[row][col].distance;
    }
    unvisitedNodes.push(grid[row - 1][col]);
  }
  if (col < 69) {
    if (!grid[row][col + 1].previousNode) {
      grid[row][col + 1].previousNode = grid[row][col];
      grid[row][col + 1].distance =
        grid[row][col + 1].distance + grid[row][col].distance;
    }
    unvisitedNodes.push(grid[row][col + 1]);
  }
  if (row < 26) {
    if (!grid[row + 1][col].previousNode) {
      grid[row + 1][col].previousNode = grid[row][col];
      grid[row + 1][col].distance =
        grid[row + 1][col].distance + grid[row][col].distance;
    }
    unvisitedNodes.push(grid[row + 1][col]);
  }
  if (col > 0) {
    if (!grid[row][col - 1].previousNode) {
      grid[row][col - 1].previousNode = grid[row][col];
      grid[row][col - 1].distance =
        grid[row][col - 1].distance + grid[row][col].distance;
    }
    unvisitedNodes.push(grid[row][col - 1]);
  }
}

export function aStarGetNodesInShortestOrder() {
  const nodesInShortestOrder = [];
  let currentNode = nodesInOrder[nodesInOrder.length - 1];
  while (currentNode && !currentNode.previousNode.isStart) {
    nodesInShortestOrder.unshift(currentNode.previousNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestOrder;
}

/* The secret to its success is that it combines the pieces of information that Dijkstra’s Algorithm uses (favoring vertices that are close to the starting point)
 and information that Greedy Best-First-Search uses (favoring vertices that are close to the goal).
In the standard terminology used when talking about A*, g(n) represents the exact cost of the path from the starting point to any vertex n, and h(n) represents the 
heuristic estimated cost from vertex n to the goal.
In the above diagrams, the yellow (h) represents vertices far from the goal and teal (g) represents vertices far from the starting point. 
A* balances the two as it moves from the starting point to the goal. Each time through the main loop, it examines the vertex n that has the lowest f(n) = g(n) + h(n).*/
