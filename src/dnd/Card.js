import React, { Component } from "react";

class Card extends Component {
  render() {
    const {
      title,
      onCardMove,
      id,
      columnId,
      cardIndex,
      cardTargetId,
      onSetCartTargetOption,
      onDragEnd,
      draggable,
      cardTarget
    } = this.props;
    return (
      <div
        className={`card-body ${draggable ? "" : "card-spacer"}`}
        draggable={draggable}
        id="card"
        onDragStart={e => onSetCartTargetOption(e, id)}
        onDragEnd={e =>
          cardTarget === "card" &&
          onDragEnd(e, cardTargetId, columnId, cardIndex)
        }
        onDragEnterCapture={() => {
          cardTarget === "card" &&
            onCardMove(cardTargetId, columnId, cardIndex);
        }}
      >
        <div>{title}</div>
      </div>
    );
  }
}

export default Card;
