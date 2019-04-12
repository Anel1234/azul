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
import Test from './components/Test';
import Droppable from './components/Droppable';


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
        <Test></Test>
        <Droppable val={5}></Droppable>
        <div className="Factories">
          {this.state.Factories.map((factory, i) => {
            return <Factory key={i} index={i} FactoryTiles={factory.props.FactoryTiles} updateTileColor={this.updateTileColor}></Factory>
          })}
        </div>
        <div className="Boards">
          {this.state.Boards.map((board, i) => {
            return <Board key={i}></Board>
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

  updateTileColor = (tile: any, mouseEnter: boolean, factoryIndex: number) => {

    console.log(factoryIndex);

    this.setState({
      TileBag: this.state.TileBag.map(_tile => (1 == 1) ? _tile : tile)
      //Factories: this.state.Factories.map(factory => (factory.props.index == factoryIndex) ? {})
      //Factories: this.state.Factories.map(factory => (factory.props.index == factoryIndex ? {...factory.props.FactoryTiles, factoryTiles}: factory.props.FactoryTiles))
    });

    console.log(this.state.TileBag);

    let factoryTiles: any[] = [];

    this.state.Factories[factoryIndex].props.FactoryTiles.forEach((d) => {
      if (tile.props.Color == d.props.Color) {
        if (mouseEnter == true) {
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


    // let factories : Factory[] = [];
    // this.state.Factories.forEach((factory) => {
    //   if(factory.props.index == factoryIndex) {
    //     let newFactory = Object.assign({}, factory)
    //     newFactory.props.FactoryTiles = factoryTiles;
    //     factory.props.FactoryTiles = factoryTiles;
    //   }
    // });

    // this.setState({
    //   Factories: this.state.Factories.map(factory => (factory.props.index == factoryIndex ? {...factory.props.FactoryTiles, factoryTiles}: factory.props.FactoryTiles))
    // });

    this.setState(prevState => ({
    }))

    // console.log("it works");
  }

  shuffleArray(array: []) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

}

export default DragDropContext(HTML5Backend)(App);
//export default App;
