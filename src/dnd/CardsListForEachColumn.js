import React, { Component, Fragment } from "react";
import DraggableCard from "./Card";
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
        {console.log(column)}
        {column._ids
          .map(cardId => cards.find(card => card.userId === cardId))
          .map((card, cardIndex) => (
            <div key={card.key}>
              <DraggableCard
                {...this.props}
                card={card}
                columnId={column._id}
                cardIndex={cardIndex}
                draggable={true}
                columnStatus={column.status}
              />
            </div>
          ))}
      </Fragment>
    );
  }
}

export default CardsListForEachColumn;
