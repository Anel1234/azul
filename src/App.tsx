import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { IAppProps, Type } from './interfaces/Props';
import { IAppState } from './interfaces/States';
import Board from './components/Board/Board';
import Factory from './components/Factory/Factory';
import Tile from './components/Tile/Tile';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'


class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.selectTilesFromBag = this.selectTilesFromBag.bind(this);

    this.state = {
      TileBag: [],
      Factories: [],
      Boards: []
    }

  }

  componentWillMount() {
    this.setState({
      TileBag: this.createTileBag(),
      Boards: this.createBoards()
    }, () => {
      this.setState({ Factories: this.createFactories() })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="Factories">
          {this.state.Factories.map((factory, i) => {
            return <Factory key={i} index={i} FactoryTiles={factory.props.FactoryTiles} updateTileColor={this.updateTileColor} updateFactoryTiles={this.updateFactoryTiles} isExcess={factory.props.isExcess}></Factory>
          })}
        </div>
        <div className="Boards">
          {this.state.Boards.map((board, i) => {
            return <Board updateTileColor={board.props.updateTileColor} key={i} BrokenTiles={board.props.BrokenTiles} PlacedTiles={board.props.PlacedTiles} PlacingTiles={board.props.PlacingTiles}></Board>
          })}
        </div>
      </div>
    );
  }

  createTileBag(): any[] {
    let tileBag = []
    for (let i = 0; i < 5; i++) {

      let tile = new Tile({ Type: i, Color: Type[i], updateTileColor: this.updateTileColor, isPlaced: false });

      for (let j = 0; j < 20; j++) {
        tileBag.push(tile);
      }
    }
    this.shuffleArray(tileBag as []);

    return tileBag;
  }

  createFactories(): Factory[] {

    let factories = []

    let factoryCount = 4

    for (let i = 0; i <= factoryCount; i++) {
      factories.push(new Factory({ FactoryTiles: this.selectTilesFromBag(), updateTileColor: this.updateTileColor, index: factoryCount + 1, updateFactoryTiles: this.updateFactoryTiles, isExcess: false }));
    }

    factories.push(new Factory({ FactoryTiles: [], updateTileColor: this.updateTileColor, index: 5, isExcess: true }))

    return factories;

  }

  createBoards(): Board[] {

    let boards = []

    for (let i = 0; i < 4; i++) {
      boards.push(new Board({ updateTileColor: this.updateTileColor, PlacingTiles: this.createEmptyPlacingTiles(), BrokenTiles: this.createEmptyBrokenTiles(), PlacedTiles: this.createEmptyPlacedTiles()  }))
    }

    return boards;

  }

  selectTilesFromBag(): any[] {

    let tiles: any[] = this.state.TileBag;
    let factoryTiles: any[] = [];

    for (let i = 0; i < 4; i++) {
      let tile: any = tiles[tiles.length - 1];
      factoryTiles.push(tile);
      tiles.pop()
    }

    return factoryTiles;
  }

  updateTileColor = async (tile: any, mouseEnter: boolean, factoryIndex: number) => {

    //this needs fixing - mouseEnter and mouseLeave shouldn't recreate an entire factory - just too slow
    /*
    let newFactories = this.state.Factories.slice();
    let newTileArray: any[] = [];

    newFactories[factoryIndex].props.FactoryTiles.forEach((_tile) => {
      if (_tile.props.Type == tile.props.Type) {
        if (mouseEnter) {
          newTileArray.push(new Tile({ FactoryIndex: factoryIndex, Type: tile.props.Type, Color: "Grey", updateTileColor: this.updateTileColor }));
        }
        else {
          newTileArray.push(new Tile({ FactoryIndex: factoryIndex, Type: _tile.props.Type, Color: Type[_tile.props.Type], updateTileColor: this.updateTileColor }));
        }
      }
      else {
        newTileArray.push(new Tile({ FactoryIndex: factoryIndex, Type: _tile.props.Type, Color: Type[_tile.props.Type], updateTileColor: this.updateTileColor }))
      }
    })

    let newFactory = new Factory({ updateFactoryTiles: this.updateFactoryTiles, updateTileColor: this.updateTileColor, index: factoryIndex, FactoryTiles: newTileArray, isExcess: false })
    newFactories[factoryIndex] = newFactory;

    this.setState({ Factories: newFactories });
    */

  }

  updateFactoryTiles = (extraTiles: any[], index: number, isExcess: boolean, type: Type) => {

    let newFactories = this.state.Factories.slice();

    let newExcessArray: any[];

    if (isExcess) {
      newExcessArray = newFactories[newFactories.length - 1].props.FactoryTiles.filter((tile) => {
        return tile.props.Type != type;
      })
    }

    else {
      newExcessArray = newFactories[newFactories.length - 1].props.FactoryTiles.concat(extraTiles);
      let newFactory = new Factory({ updateFactoryTiles: this.updateFactoryTiles, updateTileColor: this.updateTileColor, index: index, FactoryTiles: [], isExcess: false });
      newFactories[index] = newFactory;
    }

    let newExcessFactory = new Factory({ updateFactoryTiles: this.updateFactoryTiles, updateTileColor: this.updateTileColor, index: 6, FactoryTiles: newExcessArray, isExcess: true });
    newFactories[newFactories.length - 1] = newExcessFactory;

    if(this.isLastTile(newFactories)) {

      let updatedBoards: any[] = []

      this.state.Boards.forEach((board) => {
        let roundValue = 0;
        let newPlacingTiles: any[] = [];
        let newPlacedTiles: any[] = board.props.PlacedTiles;
        board.props.PlacingTiles.forEach((tileRow, index) => {
          // If the tileRow's last tile is not an empty tile - it must be complete
          let rowType = tileRow[index].props.Type
          if(rowType != 5) {
            let tileRowIndex = this.tileRowIndex(index, rowType)
            newPlacingTiles.push(board.createEmptyPlacingRow(index + 1));
            newPlacedTiles[index][tileRowIndex] = new Tile({ isPlaced: false, Type: rowType, Color: Type[rowType] });

            roundValue = this.rowValue(index, tileRowIndex, newPlacedTiles) + this.columnValue(index, tileRowIndex, newPlacedTiles);

            if(this.rowValue(index, tileRowIndex, newPlacedTiles) == 1 || this.columnValue(index, tileRowIndex, newPlacedTiles) == 1) {
              roundValue--;
            }

            console.log(roundValue);
          }
          else {
            newPlacingTiles.push(tileRow);
          }
        })
        updatedBoards.push(new Board({
          updateTileColor: this.updateTileColor,
          PlacingTiles: newPlacingTiles,
          BrokenTiles: this.createEmptyBrokenTiles(),
          PlacedTiles: newPlacedTiles
        }));
      })

      this.setState({Boards: updatedBoards});
      newFactories = this.createFactories();
    }

    this.setState({ Factories: newFactories });

  }

  //The tiles have to be placed in a certain order in the placingTiles row - this function detirmines the correct position
  tileRowIndex = (row: number, type: number) => {
    let index = row + type;

    if(index > 4) {
      index = index - 5;
    }
    //The tiles are placed right to left (0 is the furthest right) so we have to return the inverse
    return Math.abs(index - 4);
  }

  rowValue = (row: number, column: number, newPlacedTiles: any[]): number => {

    let val = 1;

    let checkTileLeft = (row: number, column: number) => {
      if(column > 4) {
        return;
      }
      if(newPlacedTiles[row][column].props.Type == 5) {
        return;
      }
      else {
        val++;
        checkTileLeft(row, column + 1);
      }
    }

    let checkTileRight = (row: number, column: number) => {
      if(column < 0) {
        return;
      }
      if(newPlacedTiles[row][column].props.Type == 5) {
        return;
      }
      else {
        val++;
        checkTileRight(row, column - 1);
      }
    }

    checkTileLeft(row, column + 1);
    checkTileRight(row, column - 1);

    return val;

  }

  columnValue = (row: number, column: number, newPlacedTiles: any[]): number => {
    let val = 1;

    let checkTileBelow = (row: number, column: number) => {
      if(row < 0) {
        return;
      }
      if(newPlacedTiles[row][column].props.Type == 5) {
        return;
      }
      else {
        val++;
        checkTileBelow(row - 1, column);
      }
    }

    let checkTileAbove = (row: number, column: number) => {
      if(row > 4) {
        return;
      }
      if(newPlacedTiles[row][column].props.Type == 5) {
        return;
      }
      else {
        val++;
        checkTileAbove(row + 1, column);
      }
    }

    checkTileAbove(row + 1, column);
    checkTileBelow(row - 1, column);

    return val;
  }

  isLastTile = (factories: Factory[]): boolean => {

    let isLast: boolean = true;

    factories.forEach((factory) => {
      if(factory.props.FactoryTiles.length != 0) {
        isLast = false;
      }
    })

    return isLast;
  }

  shuffleArray(array: []) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
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

export default DragDropContext(HTML5Backend)(App);
//export default App;
