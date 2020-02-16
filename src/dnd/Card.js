import React, { Component } from "react";

class Card extends Component {
  componentWillReceiveProps() {
    const { card, cardTargetId } = this.props;
    const target = document.getElementsByClassName(cardTargetId)[0];
    card.userId === cardTargetId && console.log(target);
  }
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
        style={{ opacity: card && card.userId === cardTargetId && "0.3" }}
        className={`card-body ${card.userId} ${draggable ? "" : "card-spacer"}`}
        draggable={draggable}
        id="card"
        onDragStart={e => onSetCartTargetOption(e, card.userId, card.pos)}
        onDragEnterCapture={() => {
          const pos = card && card.pos;
          cardTarget === "card" &&
            onCardMove(columnStatus, cardIndex, pos, cards, columnId);
        }}
        onDragEnd={e => cardTarget === "card" && onDragEnd(e, "card")}
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
