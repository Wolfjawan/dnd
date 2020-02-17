import React, { Component } from "react";

class Card extends Component {
  state = { draggableCard: false };
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
    const { draggableCard } = this.state;
    return (
      <div
        style={{ opacity: card && card._id === cardTargetId && "0.3" }}
        className={`card-body ${draggable ? "" : "card-spacer"}`}
        id="card"
        draggable={draggableCard && draggable}
        onDragStart={e => onSetCartTargetOption(e, card._id, card.pos)}
      >
        <span
          className="card-destination"
          onDragEnd={e => {
            const pos = card && card.pos;
            cardTarget === "card" && onDragEnd(pos);
          }}
          onMouseDown={() => this.setState({ draggableCard: true })}
          onMouseUp={() => {
            this.setState({ draggableCard: false });
          }}
        >
          <span
            onDragEnterCapture={() => {
              const pos = card && card.pos;
              cardTarget === "card" &&
                onCardMove(columnStatus, cardIndex, pos, cards, columnId);
            }}
          ></span>
        </span>
        {card && (
          <div>
            {card.firstName} {card.lastName}
          </div>
        )}
      </div>
    );
  }
}

export default Card;
