import React, { Component } from 'react';
import './Board.css';
import Factory from '../Factory/Factory';
import Tile from '../Tile/Tile';
import TileSquare from '../TileSquare/TileSquare';
import { IBoardProps, Type } from '../../interfaces/Props';
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

  componentWillMount() {
    this.setState({
      PlacingTiles: this.createEmptyPlacingTiles(),
      PlacedTiles: this.createEmptyPlacedTiles(),
      BrokenTiles: this.createEmptyBrokenTiles()
    })
  }


  render() {
    return (
      <div className="Board">
        <table className="boardGrid">
          <tbody>
            {
              this.state.PlacingTiles.map((row, i) => {
                return (
                  <tr key={i}>
                    {row.map((tile: any, j) => {
                      return (
                        <td key={j} className="tileHolder">
                          <TileSquare Tile={tile.props} updateBoard={this.updateBoard} row={i}></TileSquare>
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <table className="boardGrid">
          <tbody>
            {
              this.state.PlacedTiles.map((row, i) => {
                return (
                  <tr key={i}>
                    {row.map((tile: any, j) => {
                      return (
                        <td key={j} className="tileHolder">
                          <TileSquare Tile={tile.props} updateBoard={this.updateBoard} row={i}></TileSquare>
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <table className="brokenRow">
          <tbody>
            <tr>
              {
                this.state.BrokenTiles.map((tile: any, i) => {
                  return (
                    <td key={i} className="tileHolder">
                      <TileSquare Tile={tile.props} updateBoard={this.updateBoard} row={5}></TileSquare>
                    </td>
                  )
                })
              }
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  updateBoard = (tile: any, rowNumber: number) => {

    let updateRow: any[] = this.state.BrokenTiles;

    if (rowNumber == 5) {

      console.log(tile);

      for (let i = 0; i < tile.CountOfType; i++) {
        updateRow.shift();
        updateRow.push(new Tile({ isPlaced: false, Type: tile.Type, Color: Type[tile.Type] }));
      }

      this.setState({ BrokenTiles: updateRow })
    }


    else {

      let placingRow = [];
      let brokenRow: any[] = this.state.BrokenTiles;
      let placingTiles = this.state.PlacingTiles;
      let totalTiles: number = tile.CountOfType;

      placingTiles[rowNumber].forEach((placedTile) => {
        if (placedTile.props.Type == tile.Type) {
          totalTiles++;
        }
      });

      // if (totalTiles >= rowNumber + 1) {
      //   for (let i = 0; i < rowNumber + 1; i++) {
      //     placingRow.push(new Tile({ isPlaced: false, Type: tile.Type, Color: Type[tile.Type] }));
      //     totalTiles--;
      //   }

      //   for (let i = 0; i < totalTiles; i++) {
      //     brokenRow  
      //   }
      //   placingRow.push(new Tile({ isPlaced: false, Type: tile.Type, Color: Type[tile.Type] }));
      //   totalTiles--;
      // }

      while (totalTiles > 0 && placingRow.length < rowNumber + 1) {
        placingRow.push(new Tile({ isPlaced: false, Type: tile.Type, Color: Type[tile.Type] }));
        totalTiles--;
      }

      while (placingRow.length < rowNumber + 1) {
        placingRow.push(new Tile({ isPlaced: false, Type: 5, Color: Type[5] }));
      }

      while (totalTiles > 0) {
        brokenRow.shift();
        brokenRow.push(new Tile({ isPlaced: false, Type: tile.Type, Color: Type[tile.Type] }));
        totalTiles--;
      }

      placingTiles[rowNumber] = placingRow;
      this.setState({ PlacingTiles: placingTiles })
      this.setState({ BrokenTiles: brokenRow });

    }

  }

  createEmptyPlacingTiles = () => {
    let placingTiles = [];

    for (let i = 0; i < 5; i++) {
      let tileRow = [];
      for (let y = 0; y < i + 1; y++) {
        // tileRow.push(i);
        tileRow.push(new Tile({ isPlaced: false, Type: 5, Color: Type[5] }));
      }
      placingTiles.push(tileRow);
    }

    //console.log(placingTiles)
    return placingTiles;
  }

  createEmptyPlacedTiles = () => {
    let placedTiles = [];
    for (let i = 0; i < 5; i++) {
      let tileRow = [];
      for (let y = 0; y < 5; y++) {
        //tileRow.push(i);
        tileRow.push(new Tile({ isPlaced: false, Type: 5, Color: Type[5] }));
      }
      placedTiles.push(tileRow);
    }
    return placedTiles;
  }

  createEmptyBrokenTiles = () => {
    let brokenTiles = [];
    for (let i = 0; i < 10; i++) {
      brokenTiles.push(new Tile({ isPlaced: false, Type: 5, Color: Type[5] }));
    }

    return brokenTiles;
  }

}

export default Board;
