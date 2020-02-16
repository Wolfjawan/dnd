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



// import React from "react";
// import Column from "./Column";
// import DraggableCard from "./Card";

// export function Board({
//   cards,
//   columns,
//   onSetColumnTargetOption,
//   onColumnMove,
//   columnTarget,
//   onDragEnd,
//   onCardMove,
//   onSetCartTargetOption,
//   ...props
// }) {
//   return (
//     <div className="board-body">
//       {columns.map((column, columnIndex) => {
//         if (column) {
//           return (
//             <Column
//               key={column._id}
//               columnIndex={columnIndex}
//               {...column}
//               draggable={true}
//               onSetColumnTargetOption={onSetColumnTargetOption}
//               onColumnMove={onColumnMove}
//               columnTarget={columnTarget}
//               onDragEnd={onDragEnd}
//             >
//               {cards.length > 0 ? (
//                 <>
//                   {column._ids
//                     .map(cardId => cards.find(card => card.userId === cardId))
//                     .map((card, cardIndex) => (
//                       <DraggableCard
//                         {...props}
//                         key={`${card.userId}${cardIndex}`}
//                         card={card}
//                         columnId={column._id}
//                         cardIndex={cardIndex}
//                         draggable={true}
//                         columnStatus={column.status}
//                         onDragEnd={onDragEnd}
//                         onCardMove={onCardMove}
//                         onSetCartTargetOption={onSetCartTargetOption}
//                       />
//                     ))}
//                   {column._ids.length === 0 && (
//                     <DraggableCard
//                       {...props}
//                       columnId={column._id}
//                       columnStatus={column.status}
//                       cardIndex={0}
//                       draggable={false}
//                     />
//                   )}
//                 </>
//               ) : (
//                 "loading..."
//               )}
//             </Column>
//           );
//         }
//         return "";
//       })}
//     </div>
//   );
// }
