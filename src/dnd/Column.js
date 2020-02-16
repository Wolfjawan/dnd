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
      className="column-wrapper"
      onDragOver={() => {
        columnTarget === "column" && onColumnMove(columnIndex);
      }}
      onDragEnd={e => onDragEnd(e)}
    >
      <div
        style={{ opacity: columnTargetId === _id && "0.3" }}
        className="column-body"
        draggable={draggable}
        id="column"
        onDragStart={e => onSetColumnTargetOption(e, _id)}
      >
        <div className="column-title">{title}</div>
        {children}
      </div>
    </div>
  );
}
