import React, { Component } from "react";
import { Node } from "./Node/Node";
import {
  dijkstra,
  dijkstraGetNodesInShortestOrder
} from "./Algorithms/Dijkstras";
import { aStar, aStarGetNodesInShortestOrder } from "./Algorithms/AStar";
import "./Pathfinder.css";

export class Pathfinder extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsDown: false,
      weight: Infinity
    };
  }
  
  componentDidMount() {
    this.setState({ grid: getInitialGrid() });
  }

  handleMouseDown(row, col) {
    this.setState({
      grid: getGridWithWeights(this.state.grid, row, col, this.state.weight),
      mouseIsDown: true
    });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsDown) return;
    this.setState({
      grid: getGridWithWeights(this.state.grid, row, col, this.state.weight)
    });
  }

  handleMouseUp() {
    this.setState({ mouseIsDown: false });
  }

  animateShortestPath(nodes) {
    const nodesInShortestOrder = nodes;
    let i = 0;
    nodesInShortestOrder.forEach(node => {
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className +=
          " node-shortest-path";
      }, 200 + 25 * i);
      i++;
    });
  }

  visualizeAlgorithm(visInOrder, nodesShortestOrder) {
    const { grid } = this.state;
    const visitedNodesInOrder = visInOrder;
    const nodesInShortestOrder = nodesShortestOrder;
    let i = 0;
    visitedNodesInOrder.forEach(node => {
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className +=
          " node-visited";
      }, 200 + 10 * i);
      i++;
    });
    if (
      visitedNodesInOrder.length &&
      visitedNodesInOrder[visitedNodesInOrder.length - 1].isFinish
    ) {
      visitedNodesInOrder.pop();
      setTimeout(() => {
        this.animateShortestPath(nodesInShortestOrder);
        document.getElementById("node-13-63").classList = "node node-finish";
      }, 200 + 10 * i);
    }
  }

  render() {
    const { grid } = this.state;
    return (
      <div>
        <div className="button-bar">
          {/* Dropdown Menu */}
          <div id="weight-container">
            <button id="weight-btn" type="button">
              Weight Level: {this.state.weight}
            </button>
            <input
              type="range"
              id="weight-slider"
              min="2"
              max="9"
              onMouseUp={() => {
                setTimeout(() => {
                  this.setState({
                    weight: +document.getElementById("weight-slider").value
                  });
                  if (this.state.weight === 9)
                    this.setState({ weight: Infinity });
                });
                console.log(grid);
              }}
            />
          </div>
          {/* Visualize Dijkstra */}
          <button
            id="visualizer"
            className="btn"
            type="button"
            onClick={() => {
              this.visualizeAlgorithm(
                dijkstra(grid),
                dijkstraGetNodesInShortestOrder()
              );
            }}
          >
            Visualize Dijkstras
          </button>{" "}
          {/* Visualize A* */}
          <button
            id="visualizer"
            className="btn"
            type="button"
            onClick={() => {
              this.visualizeAlgorithm(
                aStar(grid),
                aStarGetNodesInShortestOrder()
              );
            }}
          >
            Visualize A*
          </button>{" "}
          {/* Clear Board */}
          <button
            id="clear-board"
            className="btn"
            type="button"
            onClick={() => window.location.reload()}
          >
            Clear Board
          </button>
        </div>
        <div id="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div id={rowIdx} className="grid-row">
                {row.map(node => {
                  const {
                    row,
                    col,
                    isWall,
                    isStart,
                    isFinish,
                    distance
                  } = node;
                  return (
                    <Node
                      row={row}
                      col={col}
                      onMouseDown={() => this.handleMouseDown(row, col)}
                      onMouseEnter={() => this.handleMouseEnter(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
                      isWall={isWall}
                      isStart={isStart}
                      isFinish={isFinish}
                      distance={distance}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let r = 0; r < 27; r++) {
    let children = [];
    for (let c = 0; c < 70; c++) {
      children.push(createNode(r, c));
    }
    grid.push(children);
  }
  return grid;
};

const createNode = (row, col) => {
  return {
    row: row,
    col: col,
    isWall: false,
    isVisited: false,
    isStart: row === 13 && col === 7,
    isFinish: row === 13 && col === 63,
    previousNode: null,
    distance: 1,
    distanceToEnd: Math.sqrt((13 - row) ** 2 + (63 - col) ** 2)
  };
};

const getGridWithWeights = (grid, row, col, dist) => {
  const newGrid = grid.slice();
  const node = grid[row][col];
  let ifWall = false;
  if (dist === Infinity) ifWall = !node.isWall;
  if (node.distance == dist) dist = 1;
  const newNode = {
    ...node,
    isWall: ifWall,
    distance: dist
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default Pathfinder;
