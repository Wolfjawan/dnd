import React from "react";
import { Column } from "./Column";
import DraggableCard from "./Card";

export function Board({ cards, columns, ...props }) {
  return (
    <div className="board-body">
      {columns.map((column, columnIndex) => (
        <Column
          key={column.id}
          columnId={column.id}
          columnIndex={columnIndex}
          {...column}
          draggable={true}
          {...props}
        >
          {cards.length > 0 ? (
            <>
              {column.cardIds
                .map(cardId => cards.find(card => card.id === cardId))
                .map((card, cardIndex) => (
                  <DraggableCard
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    columnId={column.id}
                    cardIndex={cardIndex}
                    draggable={true}
                    {...props}
                  />
                ))}
              {column.cardIds.length === 0 && (
                <DraggableCard
                  columnId={column.id}
                  cardIndex={0}
                  draggable={false}
                  {...props}
                />
              )}
            </>
          ) : (
            "loading..."
          )}
        </Column>
      ))}
    </div>
  );
}
