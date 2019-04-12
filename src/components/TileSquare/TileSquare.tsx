import React, { Component } from 'react';
import './TileSquare.css';
import { DropTarget, ConnectDropTarget, ConnectDragSource } from 'react-dnd'
import Factory from '../Factory/Factory';
import Board from '../Board/Board';
import Tile from '../Tile/Tile';

interface ITileSquareProps {
    connectDropTarget: any;
    Tile: any;
    updateBoard: any;
    row: number;
}

class TileSquare extends Component<ITileSquareProps> {
    constructor(props: ITileSquareProps) {
        super(props);
    }

    render() {
        return this.props.connectDropTarget(
            <div className="TileSquare">
                <Tile Color={this.props.Tile.Color} Type={this.props.Tile.Type} isPlaced={true}></Tile>
            </div>
        )
        // return <div className="TileSquare">{this.props.Tile}</div>
    }
}

const Types = {
    ITEM: 'tile'
}

const itemSource = {
    drop(props: ITileSquareProps, monitor: any) {
        //console.log(monitor.getItem());
        props.updateBoard(monitor.getItem(), props.row);
    }
}

let collect = (connect: any, monitor: any) => {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

export default DropTarget(Types.ITEM, itemSource, collect)(TileSquare)