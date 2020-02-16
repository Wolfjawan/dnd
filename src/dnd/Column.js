import React from "react";

export default function Column({
  children,
  title,
  _id,
  draggable,
  onSetColumnTargetOption,
  columnIndex,
  columnTarget,
  onColumnMove,
  onDragEnd,
  columnTargetId
}) {
  return (
    <div
      style={{ opacity: columnTargetId === _id && "0.3" }}
      className="column-body"
      draggable={draggable}
      id="column"
      onDragStart={e => onSetColumnTargetOption(e, _id)}
      onDragEnterCapture={() => {
        columnTarget === "column" && onColumnMove(columnIndex);
      }}
      onDragEnd={e => columnTarget === "column" && onDragEnd(e)}
    >
      <div className="column-title">{title}</div>
      {children}
    </div>
  );
}
