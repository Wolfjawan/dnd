import React, { Component } from "react";
import { Board } from "./Board";
import { _columns, _cards } from "../data";
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
      this.setState({ columns: _columns }, () => {
        setTimeout(() => {
          this.setState({ cards: _cards });
        }, 100);
      });
    }, 100);
  }

  onSetColumnTargetOption = (e, targetId) => {
    const target = e.target;
    this.setState({
      columnTargetId: target.id === "column" ? targetId : null,
      columnTarget: target.id
    });
    setTimeout(function() {
      target.style.opacity = "0.3";
    }, 1);
  };

  onSetCartTargetOption = (e, targetId) => {
    const target = e.target;
    this.setState({
      cardTargetId: target.id === "card" ? targetId : null,
      cardTarget: target.id
    });
    setTimeout(function() {
      target.style.opacity = "0.3";
    }, 1);
  };

  onCardMove = (cardId, destColumnId, index) => {
    if (this.state.cardTarget === "card") {
      let newColumns = this.state.columns
        .map(column => {
          return {
            ...column,
            cardIds: column.cardIds.filter(id => cardId !== id)
          };
        })
        .map(column => {
          return {
            ...column,
            cardIds:
              destColumnId === column.id
                ? [
                    ...column.cardIds.slice(0, index),
                    cardId,
                    ...column.cardIds.slice(index)
                  ]
                : column.cardIds
          };
        });
      this.setState({ columns: newColumns });
    }
  };

  onColumnMove = (columnId, index) => {
    const { columnTarget, columns } = this.state;
    if (columnTarget === "column") {
      const targetColumn = columns.filter(column => column.id === columnId);
      const newColumns = columns.filter(column => column.id !== columnId);
      newColumns.splice(index, 0, targetColumn[0]);
      this.setState({ columns: newColumns });
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
            onSetColumnTargetOption={this.onSetColumnTargetOption}
            onDragEnd={this.onDragEnd}
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
