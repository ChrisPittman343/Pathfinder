let grid = [];
const nodesInOrder = [];
const unvisitedNodes = [];

export function dijkstra(g) {
  grid = g.slice();
  getNeighbors(13, 7);
  unvisitedNodes.sort((a, b) => a.distance - b.distance);
  while (unvisitedNodes.length > 0) {
    const currentNode = unvisitedNodes.shift();
    if (currentNode.isWall || currentNode.isVisited || currentNode.isStart)
      continue;
    currentNode.isVisited = true;

    nodesInOrder.push(currentNode);
    if (currentNode.isFinish) break;
    getNeighbors(currentNode.row, currentNode.col);
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
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

export function dijkstraGetNodesInShortestOrder() {
  const nodesInShortestOrder = [];
  let currentNode = nodesInOrder[nodesInOrder.length - 1];
  while (currentNode && !currentNode.previousNode.isStart) {
    nodesInShortestOrder.unshift(currentNode.previousNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestOrder;
}
