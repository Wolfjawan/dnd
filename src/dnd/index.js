import React, { Component } from "react";
import { Board } from "./Board";
import Data from "../data.json";
import { pancakeSort } from "./utilis";
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
    setTimeout(() => {
      this.setState({ columns: Data._columns }, () => {
        setTimeout(() => {
          this.setState({ cards });
        }, 100);
      });
    }, 100);
  }

  onSetColumnTargetOption = (e, columnTargetId) => {
    const target = e.target;
    this.setState({
      columnTargetId,
      columnTarget: target.id
    });
    setTimeout(function() {
      target.style.opacity = "0.3";
    }, 1);
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
      cardTargetId,
      cardTarget: target.id,
      cardTargetPos,
      cardTargetIndex
    });
  };

  onCardMove = (columnStatus, cardIndex, pos, targetCards) => {
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
      this.setState({
        cards: newCards
      });
    }
  };

  onDragEnd = e => {
    console.log("hhhh");
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
    const target = e.target;
    setTimeout(function() {
      target.style.opacity = "1";
    }, 1);
  };

  render() {
    const { cards } = this.state;
    const sortedCards = cards.sort(pancakeSort("pos", true));
    return (
      <div className="list-wrapper">
        {this.state.columns.length > 0 ? (
          <Board
            {...this.state}
            cards={sortedCards}
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
