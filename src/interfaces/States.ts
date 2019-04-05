import Tile from '../components/Tile/Tile';
import Factory from '../components/Factory/Factory';
import Board from '../components/Board/Board';

export interface IAppState {
    TileBag: Tile[];
    Factories: Factory[];
    Boards: Board[];
}

export interface IBoardState {
    Value: number;
    PlacingTiles: [Tile[]];
    PlacedTiles: [Tile[]];
    BrokenTiles: Tile[];
}