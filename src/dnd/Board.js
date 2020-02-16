import React from "react";
import Column from "./Column";
import CardsListForEachColumn from "./CardsListForEachColumn";

export function Board({
  cards,
  columns,
  onSetColumnTargetOption,
  onColumnMove,
  columnTarget,
  onDragEnd,
  onCardMove,
  onSetCartTargetOption,
  columnTargetId,
  ...props
}) {
  return (
    <div className="board-body">
      {columns.map((column, columnIndex) => {
        if (column) {
          return (
            <Column
              key={column._id}
              columnIndex={columnIndex}
              {...column}
              draggable={true}
              onSetColumnTargetOption={onSetColumnTargetOption}
              onColumnMove={onColumnMove}
              columnTarget={columnTarget}
              onDragEnd={onDragEnd}
              columnTargetId={columnTargetId}
            >
              {cards.length > 0 ? (
                <CardsListForEachColumn
                  column={column}
                  cards={cards}
                  onCardMove={onCardMove}
                  onSetCartTargetOption={onSetCartTargetOption}
                  onDragEnd={onDragEnd}
                  {...props}
                />
              ) : (
                "loading..."
              )}
            </Column>
          );
        }
        return "";
      })}
    </div>
  );
}
