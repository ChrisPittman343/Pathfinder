import React, { Component } from "react";
import "./Node.css";

export class Node extends Component {
  render() {
    const {
      row,
      col,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      isWall,
      isStart,
      isFinish,
      distance
    } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : distance === 1
      ? ""
      : distance > 1
      ? `node-${distance}`
      : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}

export default Node;
