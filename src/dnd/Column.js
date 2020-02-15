import React from "react";

export function Column({
  children,
  title,
  onColumnMove,
  id,
  columnIndex,
  columnTargetId,
  onSetColumnTargetOption,
  onDragEnd,
  draggable,
  columnTarget
}) {
  return (
    <div
      className="column-body"
      draggable={draggable}
      id="column"
      onDragStart={e => onSetColumnTargetOption(e, id)}
      onDragEnterCapture={() => {
        columnTarget === "column" && onColumnMove(columnTargetId, columnIndex);
      }}
      onDragEnd={e => columnTarget === "column" && onDragEnd(e)}
    >
      <div className="column-title">{title}</div>
      {children}
    </div>
  );
}
