import Tile from '../components/Tile/Tile';
import Factory from '../components/Factory/Factory'
import { Color } from 'csstype';
import { any } from 'prop-types';
import ITile from '../interfaces/ITile'

export interface IAppProps {

}

export interface IBoardProps {
    updateTileColor: any;
    updateFactoryTiles?: any;
    PlacingTiles: any[][];
    PlacedTiles: any[][];
    BrokenTiles: any[];
}

export interface IFactoryProps {
    FactoryTiles: any[];
    updateExcessFactoryTiles?: any;
    updateFactoryTiles?: any;
    isExcess: boolean;
    updateTileColor: any;
    index: number;
}

// export enum Type {yellow,lightblue,lightgoldenrodyellow,lightgreen,lightcoral, white}
export enum Type { aliceblue, antiquewhite, azure, beige, bisque, "#ffffff00" }

export interface ITileProps {
    Type: Type
    Color: Color
    FactoryIndex?: number;
    updateTileColor?: any;
    updateTilesInFactory?: any;
    getTilesOfTypeInFactory?: any;
    isPlaced: boolean;
    isDragging: any;
    connectDragSource: any;
    src: any;
}
