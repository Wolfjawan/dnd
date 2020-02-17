import React, { Component, Fragment } from "react";
import DraggableCard from "./Card";
const findCards = (column, cards) => {
  const newCards = column._ids.map(cardId =>
    cards.find(card => card._id === cardId)
  );
  return newCards;
};
class CardsListForEachColumn extends Component {
  render() {
    const { column, cards } = this.props;
    if (column._ids.length === 0) {
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
    return (
      <Fragment>
        {findCards(column, cards).map((card, cardIndex) => (
          <DraggableCard
            // key={card._id}
            {...this.props}
            card={card}
            columnId={column._id}
            cardIndex={cardIndex}
            draggable={true}
            columnStatus={column.status}
          />
        ))}
      </Fragment>
    );
  }
}

export default CardsListForEachColumn;
