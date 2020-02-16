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
  onDragEnd
}) {
  return (
    <div
      className="column-body"
      draggable={draggable}
      id="column"
      onDragStart={e => onSetColumnTargetOption(e, _id)}
      onDragEnterCapture={() => {
        columnTarget === "column" && onColumnMove(columnIndex);
      }}
      onDragEnd={e => onDragEnd(e)}
    >
      <div className="column-title">{title}</div>
      {children}
    </div>
  );
}
