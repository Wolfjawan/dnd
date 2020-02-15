import React, { Component } from "react";
import { Board } from "./Board";
import Data from "../data.json";
import "./index.css";

class App extends Component {
  state = {
    cards: [],
    columns: [],
    cardTargetId: null,
    cardTarget: "",
    columnTargetId: null,
    columnTarget: ""
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ columns: Data._columns }, () => {
        setTimeout(() => {
          this.setState({ cards: Data.volunteers });
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

  onSetCartTargetOption = (e, cardTargetId) => {
    const target = e.target;
    this.setState({
      cardTargetId,
      cardTarget: target.id
    });
    setTimeout(function() {
      target.style.opacity = "0.3";
    }, 1);
  };

  onCardMove = (columnStatus, columnId, cardIndex) => {
    // console.log(columnStatus)
    const { cardTargetId, cards } = this.state;
    if (this.state.cardTarget === "card") {
      let newCards = cards.map(card => {
        if (card._id === cardTargetId) {
          return { ...card, volunteerStatus: columnStatus };
        }
        return card;
      });
      this.setState({ cards: newCards });
    }
  };

  onDragEnd = e => {
    this.setState({
      cardTargetId: null,
      cardTarget: "",
      columnTargetId: null,
      columnTarget: ""
    });
    const target = e.target;
    setTimeout(function() {
      target.style.opacity = "1";
    }, 1);
  };

  render() {
    return (
      <div>
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
