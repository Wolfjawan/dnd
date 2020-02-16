import React, { Component } from "react";
import DraggableCard from "./Card";
class CardsListForEachColumn extends Component {
  render() {
    const { column, cards } = this.props;
    const cardsForEachColumn = cards.filter(card => {
      if (
        column.status === "NEW" &&
        (card.volunteerStatus === column.status ||
          !card.volunteerStatus ||
          card.volunteerStatus === undefined)
      ) {
        return card;
      }
      if (card.volunteerStatus === column.status) {
        return card;
      } else return "";
    });
    if (cardsForEachColumn.length === 0) {
      return (
        <DraggableCard
          columnId={column._id}
          columnStatus={column.status}
          cardIndex={0}
          draggable={false}
          {...this.props}
        />
      );
    }
    return cardsForEachColumn.map((card, cardIndex) => {
      if (card) {
        return (
          <DraggableCard
            {...this.props}
            // key={card.key}
            card={card}
            cards={cardsForEachColumn}
            columnId={column._id}
            cardIndex={cardIndex}
            draggable={true}
            columnStatus={column.status}
          />
        );
      } else return null;
    });
  }
}

export default CardsListForEachColumn;
