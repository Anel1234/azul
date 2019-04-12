import Tile from '../components/Tile/Tile';
import Factory from '../components/Factory/Factory'
import { Color } from 'csstype';
import { any } from 'prop-types';
import ITile from '../interfaces/ITile'

export interface IAppProps {
    
}

export interface IBoardProps {
    
}

export interface IFactoryProps {
    FactoryTiles: any[];
    updateTileColor: any;
    index: number;
}

export enum Type {yellow,lightblue,lightgoldenrodyellow,lightgreen,lightcoral, white}

export interface ITileProps {
    Type: Type
    Color: Color
    FactoryIndex?: number;
    updateTileColor?: any;
    getTilesOfTypeInFactory?: any;
    isPlaced: boolean;
    isDragging: any;
    connectDragSource: any;
    src: any;
}
