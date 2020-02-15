import React from "react";
export default function Card({
  draggable,
  onSetCartTargetOption,
  _id,
  onCardMove,
  columnId,
  cardIndex,
  columnStatus,
  onDragEnd,
  cardTarget,
  ...card
}) {
  return (
    <div
      className={`card-body ${draggable ? "" : "card-spacer"}`}
      draggable={draggable}
      id="card"
      onDragStart={e => onSetCartTargetOption(e, _id)}
      onDragEnterCapture={() => {
        cardTarget === "card" && onCardMove(columnStatus, columnId, cardIndex);
      }}
      onDragEnd={e => cardTarget === "card" && onDragEnd(e)}
    >
      {card && (
        <div>
          {card.firstName}
          {""}
          {card.lastName}
        </div>
      )}
    </div>
  );
}
