import React, { Component } from "react";

class Column extends Component {
  state = { draggableColumn: false };
  render() {
    const {
      children,
      title,
      _id,
      onSetColumnTargetOption,
      columnIndex,
      columnTarget,
      onColumnMove,
      onDragEnd,
      columnTargetId,
      draggable
    } = this.props;
    const { draggableColumn } = this.state;
    return (
      <span
        className="column-body"
        onDragEnterCapture={() => {
          columnTarget === "column" && onColumnMove(columnIndex);
        }}
        onMouseUp={e => onDragEnd(e)}
        onDragEnd={e => onDragEnd(e)}
        onDrop={e => onDragEnd(e)}
        style={{ opacity: columnTargetId === _id && "0.3" }}
        draggable={draggableColumn && draggable}
        id="column"
        onDragStart={e => onSetColumnTargetOption(e, _id)}
      >
        <div
          className="column-title"
          onMouseDown={() => this.setState({ draggableColumn: true })}
          onMouseUp={() => {
            this.setState({ draggableColumn: false });
          }}
        >
          {title}
        </div>
        <div className="column-list">{children}</div>
      </span>
    );
  }
}

export default Column;
