import React, { Component } from "react";

class Card extends Component {
  render() {
    const {
      draggable,
      onSetCartTargetOption,
      onCardMove,
      cardIndex,
      columnStatus,
      onDragEnd,
      cardTarget,
      card,
      cards,
      columnId,
      cardTargetId
    } = this.props;
    return (
      <div
        style={{ opacity: card && card._id === cardTargetId && "0.3" }}
        className={`card-body ${draggable ? "" : "card-spacer"}`}
        draggable={draggable}
        id="card"
        onDragStart={e => 
        onSetCartTargetOption(e, card._id, card.pos)
        }
        onDragEnterCapture={() => {
          const pos = card && card.pos;
          cardTarget === "card" &&
            onCardMove(columnStatus, cardIndex, pos, cards, columnId);
        }}
        onDragEnd={e => {
          const pos = card && card.pos;
          cardTarget === "card" && onDragEnd(pos);
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
}

export default Card;
