import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Tile from './tile';
import actions from '../redux/actions';

const propTypes = {
  dispatch: PropTypes.func,
};

class Game extends React.Component {
  constructor() {
    super();
    this.addChip = this.addChip.bind(this);
  }

  addChip(col) {
    const gameArray = [];
    this.state.game.forEach((column) => {
      gameArray.push(column.slice());
    });

    this.props.dispatch(actions.addChip({
      gameArray,
      col,
      turn: this.state.turn,
    }));
  }

  render() {
    const game = [];

    this.state.game.forEach((col, colIdx) => {
      const column = [];
      col.forEach((row, rowIdx) => {
        column.push(<Tile value={row} key={rowIdx} />);
      });

      game.push(
        <ul
          className="game-column"
          key={colIdx}
          onClick={() => { this.addChip(colIdx); }}
        >
          {column}
        </ul>
      );
    });

    return (
      <div className="flex-container">
        <h2>Players:</h2>
        <h2>Access Code:</h2>
        <h1>Connect Four with Friends</h1>
        <button>New Game</button>
        <section className="game">
          {game}
        </section>
      </div>
    );
  }
}

Game.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    game: state,
  };
};

const Container = connect(mapStateToProps)(Game);

module.exports = Container;
