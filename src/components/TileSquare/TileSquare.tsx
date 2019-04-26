import React, { Component } from 'react';
import './TileSquare.css';
import { DropTarget, ConnectDropTarget, ConnectDragSource } from 'react-dnd'
import Factory from '../Factory/Factory';
import Board from '../Board/Board';
import Tile from '../Tile/Tile';
import ITile from '../../interfaces/ITile';
import { Color } from 'csstype';

interface ITileSquareProps {
    Board: Board;
    connectDropTarget: any;
    isOver: any;
    Tile: any;
    updateBoard: any;
    row: number;
    isPlacedTile: boolean;
}

interface ITileSquareState {
    CanDrop: boolean;
}

class TileSquare extends Component<ITileSquareProps, ITileSquareState> {
    constructor(props: ITileSquareProps) {
        super(props);

        this.state = {
            CanDrop: false
        }
    }

    // componentDidUpdate() {
    //     console.log("updated");
    // }

    render() {

        const {connectDropTarget, isOver} = this.props;

        return connectDropTarget(
            <div className={this.state.CanDrop && isOver?"TileSquare droppable":!this.state.CanDrop && isOver?"TileSquare notdroppable":"TileSquare"}> 
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
    drop(props: ITileSquareProps, monitor: any, component: any) {
        props.updateBoard(monitor.getItem(), props.row);
    },
    canDrop(props: ITileSquareProps, monitor: any) {
        //Can always drop into broken tiles
        if(props.isPlacedTile) {
            return false;
        }

        if(props.row == 5) {
            return true;
        }
        // console.log(props.Board.props.PlacingTiles[props.row][0].props.Type)
        // console.log(monitor.getItem().Type);
        if(props.Board.props.PlacingTiles[props.row][0].props.Type == 5) {            
            return true;
        }

        if(props.Board.props.PlacingTiles[props.row][0].props.Type != monitor.getItem().Type) {
            return false;
        }
        return true;
    },
    hover(props: ITileSquareProps, monitor: any, component: any) {
        this.canDrop(props, monitor) ? component.setState({CanDrop: true}):component.setState({CanDrop: false}) 
    }
}

let collect = (connect: any, monitor: any, component: any) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

export default DropTarget(Types.ITEM, itemSource, collect)(TileSquare)