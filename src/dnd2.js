import React, { Component, Fragment } from "react";
import Data from "./data.json";
import { pancakeSort } from "./dnd/useCase";
import "./index.css";

class DnD extends Component {
  state = {
    cards: [],
    columns: [],
    cardTargetObject: null,
    cardTarget: "",
    columnTargetId: null,
    columnTarget: "",
    cardTargetPos: null,
    cardPreviousPos: null,
    cardNextPos: null,
    cardTargetIndex: null,
    draggableColumn: false,
    draggableCard: false
  };

  componentDidMount() {
    const cards = Data.volunteers
      .map((volunteer, index) => {
        if (!volunteer.pos) {
          return {
            ...volunteer,
            pos: volunteer.createdAt && new Date(volunteer.createdAt).getTime(),
            key: index
          };
        }
        return volunteer;
      })
      .sort(pancakeSort("pos", true));

    const columns = Data._columns.map(column => {
      let volunteers = [];
      cards.forEach(card => {
        if (card.volunteerStatus === column.status) {
          return volunteers.push(card);
        }
        if (column.status === "No Status" && !card.volunteerStatus) {
          return volunteers.push(card);
        }
      });
      return {
        ...column,
        volunteers
      };
    });
    setTimeout(() => {
      this.setState({ columns }, () => {
        setTimeout(() => {
          this.setState({ cards });
        }, 100);
      });
    }, 100);
  }

  onSetColumnTargetOption = (e, columnTargetId) => {
    const target = e.target;
    this.setState({
      columnTargetId: target.id === "column" ? columnTargetId : null,
      columnTarget: target.id
    });
  };
  onColumnMove = index => {
    const {
      columnTarget,
      columns,
      columnTargetId,
      cardTargetObject
    } = this.state;

    if (columnTarget === "column") {
      const targetColumn = columns.filter(
        column => column._id === columnTargetId
      );
      const newColumns = columns.filter(
        column => column._id !== columnTargetId
      );
      newColumns.splice(index, 0, targetColumn[0]);
      this.setState({ columns: newColumns });
    }

    if (this.state.cardTarget === "card") {
      let newColumns = this.state.columns
        .map(column => {
          return {
            ...column,
            volunteers: column.volunteers.filter(
              volunteer => cardTargetObject._id !== volunteer._id
            )
          };
        })
        .map(column => {
          return {
            ...column,
            volunteers:
              index === column._id
                ? [...column.volunteers, cardTargetObject]
                : column.volunteers
          };
        });
      this.setState({
        columns: newColumns
      });
    }
  };

  onSetCartTargetOption = (
    e,
    cardTargetObject,
    cardTargetPos,
    cardTargetIndex
  ) => {
    const target = e.target;
    this.setState({
      cardTargetObject: target.id === "card" ? cardTargetObject : null,
      cardTarget: target.id,
      cardTargetPos,
      cardTargetIndex
    });
  };

  onCardMove = (columnStatus, cardIndex, pos, targetCards, columnId) => {
    const { cardTargetObject, cards, cardTargetPos } = this.state;
    let newPos;
    if (targetCards) {
      const nextCard = targetCards[cardIndex + 1];
      const previousCard = targetCards[cardIndex - 1];
      if (nextCard && previousCard) {
        if (pos > cardTargetPos) {
          if (nextCard) {
            const cardNextPos = nextCard.pos;
            newPos = Math.floor((pos + cardNextPos) / 2);
          }
        }
        if (pos < cardTargetPos) {
          if (previousCard) {
            const cardPreviousPos = previousCard.pos;
            newPos = Math.floor((pos + cardPreviousPos) / 2);
          }
        }
      }
      if (!nextCard && previousCard) {
        newPos = pos;
        newPos++;
      }
      if (nextCard && !previousCard) {
        newPos = pos;
        newPos--;
      }
    }
    if (this.state.cardTarget === "card") {
      console.log(newPos);
      const newCards = cards.map(singleCard => {
        if (singleCard._id === cardTargetObject) {
          return {
            ...singleCard,
            volunteerStatus: columnStatus,
            pos: newPos ? newPos : cardTargetPos
          };
        }
        return singleCard;
      });
      let newColumns = this.state.columns
        .map(column => {
          return {
            ...column,
            volunteers: column.volunteers.filter(
              volunteer => cardTargetObject._id !== volunteer._id
            )
          };
        })
        .map(column => {
          return {
            ...column,
            volunteers:
              columnId === column._id
                ? [
                    ...column.volunteers.slice(0, cardIndex),
                    cardTargetObject,
                    ...column.volunteers.slice(cardIndex)
                  ]
                : column.volunteers
          };
        });
      this.setState({
        columns: newColumns
      });
    }
  };

  onDragEnd = pos => {
    console.log(pos);
    this.setState({
      cardTargetObject: null,
      cardTarget: "",
      columnTargetId: null,
      columnTarget: "",
      cardTargetPos: null,
      cardPreviousPos: null,
      cardNextPos: null,
      cardTargetIndex: null,
      draggableColumn: false,
      draggableCard: false
    });
  };

  render() {
    const {
      columns,
      cards,
      cardTargetObject,
      cardTarget,
      columnTargetId,
      columnTarget,
      draggableColumn,
      draggableCard
    } = this.state;
    return (
      <div className="list-wrapper">
        {this.state.columns.length > 0 ? (
          <div className="board-body">
            {columns.map((column, columnIndex) => {
              if (column) {
                return (
                  <div
                    style={{
                      opacity: columnTargetId === column._id && "0.3"
                    }}
                    className="column-body"
                    draggable={draggableColumn}
                    id="column"
                    onDragStart={e =>
                      this.onSetColumnTargetOption(e, column._id)
                    }
                    key={column._id}
                    onDragEnterCapture={() => {
                      columnTarget === "column" &&
                        this.onColumnMove(columnIndex);
                      cardTarget === "card" &&
                        this.onCardMove(
                          column.status,
                          null,
                          null,
                          cards,
                          column._id
                        );
                    }}
                    onDragEnd={e =>
                      columnTarget === "column" && this.onDragEnd(e)
                    }
                  >
                    <div
                      className="column-title"
                      onMouseDown={() =>
                        this.setState({ draggableColumn: true })
                      }
                      onMouseUp={() => {
                        this.setState({ draggableColumn: false });
                      }}
                    >
                      {column.title}
                    </div>
                    {column.volunteers.length === 0 && (
                      <div
                        className="card-body card-spacer"
                        draggable={false}
                        id="card"
                        onDragEnterCapture={() => {
                          this.onCardMove(
                            column.status,
                            0,
                            null,
                            cards,
                            column._id
                          );
                        }}
                      ></div>
                    )}
                    <div className="column-list">
                      {column.volunteers.map((card, cardIndex) => {
                        return (
                          <div
                            key={card._id}
                            style={{
                              opacity:
                                card &&
                                cardTargetObject &&
                                card._id === cardTargetObject._id &&
                                "0.3"
                            }}
                            className="card-body"
                            draggable={draggableCard}
                            id="card"
                            onDragStart={e => {
                              this.onSetCartTargetOption(e, card, card.pos);
                            }}
                            onDragEnterCapture={() => {
                              const pos = card && card.pos;
                              cardTarget === "card" &&
                                this.onCardMove(
                                  column.status,
                                  cardIndex,
                                  pos,
                                  cards,
                                  column._id
                                );
                            }}
                            // onDragEnd={e => {
                            //   const pos = card && card.pos;
                            //   cardTarget === "card" && this.onDragEnd(e, pos);
                            // }}

                            onMouseDown={() =>
                              this.setState({ draggableCard: true })
                            }
                            onMouseUp={() => {
                              this.setState({ draggableCard: false });
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
                      })}
                    </div>
                  </div>
                );
              }
              return "";
            })}
          </div>
        ) : (
          "loading..."
        )}
      </div>
    );
  }
}

export default DnD;
