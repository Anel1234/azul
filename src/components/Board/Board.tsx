import React, { Component } from 'react';
import './Board.css';
import Factory from '../Factory/Factory';
import Tile from '../Tile/Tile';
import { IBoardProps } from '../../interfaces/Props';
import { IBoardState } from '../../interfaces/States';

class Board extends Component<IBoardProps, IBoardState> {
  constructor(props: IBoardProps) {
    super(props);

    this.state = {
      Value: 0,
      PlacingTiles: [[]],
      PlacedTiles: [[]],
      BrokenTiles: []
    }

  }


  render() {
    return (
      <div className="Board">
      {

      }
      </div>
    );
  }

}

export default Board;
