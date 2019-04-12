import Tile from '../components/Tile/Tile';
import ITile from '../interfaces/ITile';
import Factory from '../components/Factory/Factory';
import Board from '../components/Board/Board';
import { Type } from './Props';
import { Color } from 'csstype';

export interface IAppState {
    TileBag: any[];
    Factories: Factory[];
    Boards: Board[];
}

export interface IFactoryState {
    Tiles: any[];
}
export interface IBoardState {
    Value: number;
    PlacingTiles: any[][];
    PlacedTiles: any[][];
    //PlacingTiles: [Tile[]];
    //PlacedTiles: [Tile[]];
    BrokenTiles: any[];
}

export interface ITileState {
    Type: Type
    Color: Color
}