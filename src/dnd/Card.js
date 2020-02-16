import React from "react";

export default function Card({
  draggable,
  onSetCartTargetOption,
  onCardMove,
  cardIndex,
  columnStatus,
  onDragEnd,
  cardTarget,
  cardTargetId,
  card,
  cards,
  columnId
}) {
  return (
    <div
      style={{ opacity: card && card._id === cardTargetId && "0.3" }}
      className={`card-body ${draggable ? "" : "card-spacer"}`}
      draggable={draggable}
      id="card"
      onDragStart={e => onSetCartTargetOption(e, card._id, card.pos)}
      onDragEnd={e => cardTarget === "card" && onDragEnd(e)}
      onDragEnterCapture={() => {
        const pos = card && card.pos;
        cardTarget === "card" &&
          onCardMove(columnStatus, cardIndex, pos, cards, columnId);
      }}
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
