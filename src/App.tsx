import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { IAppProps, Type } from './interfaces/Props';
import { IAppState } from './interfaces/States';
import Board from './components/Board/Board';
import Factory from './components/Factory/Factory';
import Tile from './components/Tile/Tile';



// type MyProps = {};
// type MyState = { TileBag: Tile[] };

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
        <div className="Boards">
          {this.state.Boards.map((board, i) => {
            return <Board key={i}></Board>
          })}
        </div>
        <div className="Factories">
          {this.state.Factories.map((factory, i) => {
            return <Factory key={i} index={i} FactoryTiles={factory.props.FactoryTiles} updateTileColor={this.updateTileColor}></Factory>
          })}
        </div>
      </div>
    );
  }

  createTileBag(): Tile[] {
    let tileBag = []
    for (let i = 0; i < 5; i++) {

      let tile = new Tile({Type: i, Color: Type[i], updateTileColor: this.updateTileColor });

      for (let j = 0; j < 20; j++) {
        tileBag.push(tile);
      }
    }
    this.shuffleArray(tileBag as []);

    return tileBag;
  }

  createFactories(): Factory[] {

    let factories = []

    for (let i = 0; i < 5; i++) {
      factories.push(new Factory({ FactoryTiles: this.selectTilesFromBag(), updateTileColor: this.updateTileColor, index: i }));
    }

    return factories;

  }

  createBoards(): Board[] {

    let boards = []

    for (let i = 0; i < 4; i++) {
      boards.push(new Board({}))
    }

    return boards;

  }

  selectTilesFromBag(): Tile[] {

    let tiles: Tile[] = this.state.TileBag;
    let factoryTiles: Tile[] = [];

    for (let i = 0; i < 4; i++) {
      let tile: Tile = tiles[tiles.length - 1];
      factoryTiles.push(tile);
      tiles.pop()
    }

    return factoryTiles;
  }

  updateTileColor = (tile: Tile, mouseEnter: boolean, factoryIndex: number) => {

    console.log(factoryIndex);

    let factoryTiles : Tile[] = [];

    this.state.Factories[factoryIndex].props.FactoryTiles.forEach((d) => {
      if(tile.props.Color == d.props.Color) {
        if(mouseEnter == true) {
          tile.props.Color == "Black";
        }
        else {
          tile.props.Color == Type[tile.props.Type];
        }
        factoryTiles.push(tile);
      }
      else {
        factoryTiles.push(tile);
      }
    })

    console.log(factoryTiles);

    // this.setState(prevState => ({
    //   Factories: {
    //     ...prevState.Factories,
    //     factoryTiles
    //   }
    // }))

    // console.log("it works");
  }

  shuffleArray(array: []) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

}

export default App;
