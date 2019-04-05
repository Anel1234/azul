import Tile from '../components/Tile/Tile';
import Factory from '../components/Factory/Factory'
import { Color } from 'csstype';

export interface IAppProps {
    
}

export interface IBoardProps {
    
}

export interface IFactoryProps {
    FactoryTiles: Tile[];
    updateTileColor: any;
    index: number;
}

export enum Type {white,lightblue,lightgoldenrodyellow,lightgreen,lightcoral}

export interface ITileProps {
    Type: Type
    Color: Color
    FactoryIndex?: number;
    updateTileColor: any;
    // mouseLeave: MouseEvent;
}
