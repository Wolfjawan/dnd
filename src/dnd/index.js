import React, { Component } from "react";
import { Board } from "./Board";
import Data from "../data.json";
import { pancakeSort } from "./utilis";
import "./index.css";
// var html = document.getElementsByTagName("html")[0];
class App extends Component {
  state = {
    cards: [],
    columns: [],
    cardTargetId: null,
    cardTarget: "",
    columnTargetId: null,
    columnTarget: "",
    cardTargetPos: null,
    cardPreviousPos: null,
    cardNextPos: null,
    cardTargetIndex: null
  };

  componentDidMount() {
    // html.addEventListener("dragend", e => {
    //   console.log("drop");
    //   this.onDragEnd(e);
    // });
    // html.draggable = true;
    // console.log(html);
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
      let _ids = [];
      cards.forEach(card => {
        if (card.volunteerStatus === column.status) {
          return _ids.push(card._id);
        }
        if (column.status === "No Status" && !card.volunteerStatus) {
          return _ids.push(card._id);
        }
      });
      return {
        ...column,
        _ids
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
    const { columnTarget, columns, columnTargetId } = this.state;
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
  };

  onSetCartTargetOption = (e, cardTargetId, cardTargetPos, cardTargetIndex) => {
    const target = e.target;
    this.setState({
      cardTargetId: target.id === "card" ? cardTargetId : null,
      cardTarget: target.id,
      cardTargetPos,
      cardTargetIndex
    });
  };

  onCardMove = (columnStatus, cardIndex, pos, targetCards, columnId) => {
    const { cardTargetId, cards, cardTargetPos } = this.state;
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
      const newCards = cards.map(singleCard => {
        if (singleCard._id === cardTargetId) {
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
            _ids: column._ids.filter(_id => cardTargetId !== _id)
          };
        })
        .map(column => {
          return {
            ...column,
            _ids:
              columnId === column._id
                ? [
                    ...column._ids.slice(0, cardIndex),
                    cardTargetId,
                    ...column._ids.slice(cardIndex)
                  ]
                : column._ids
          };
        });
      this.setState({ columns: newColumns, cards: newCards });
    }
  };

  onDragEnd = pos => {
    console.log(pos);
    this.setState({
      cardTargetId: null,
      cardTarget: "",
      columnTargetId: null,
      columnTarget: "",
      cardTargetPos: null,
      cardPreviousPos: null,
      cardNextPos: null,
      cardTargetIndex: null
    });
  };

  render() {
    return (
      <div style={{ overflowX: "auto" }}>
        {this.state.columns.length > 0 ? (
          <Board
            {...this.state}
            onCardMove={this.onCardMove}
            onSetCartTargetOption={this.onSetCartTargetOption}
            onDragEnd={this.onDragEnd}
            onSetColumnTargetOption={this.onSetColumnTargetOption}
            onColumnMove={this.onColumnMove}
          />
        ) : (
          "loading..."
        )}
      </div>
    );
  }
}

export default App;
