import React, { Component } from 'react';
import './Tile.css';
import { ITileProps, Type } from '../../interfaces/Props';
import { ITileState } from '../../interfaces/States';
import { DragSource } from 'react-dnd';

class Tile extends Component<ITileProps> {

    constructor(props: ITileProps) {
        super(props);

        // this.state = {
        //     Color: props.Color,
        //     Type: props.Type
        // }
    }

    //{Type[this.props.Type]}

    render() {
        // return (
        //     <div className="tile" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} style={{ backgroundColor: this.props.Color }}>{this.props.Type}</div>
        // )

        const { isDragging, connectDragSource, src } = this.props
        return connectDragSource(
            <div
                className="tile"
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
                style={{ backgroundColor: this.props.Color }}
            >
                {this.props.Type < 5 &&
                    this.props.Type
                }

            </div>
        )
    }


    mouseEnter = async () => {
        if (!this.props.isPlaced) {
            await this.props.updateTileColor(this, true);
        }

        //this.props.updateTileColor(this, true, this.props.FactoryIndex)
    }

    mouseLeave = async () => {
        if (!this.props.isPlaced) {
            await this.props.updateTileColor(this, false);
        }
        //this.props.updateTileColor(this, false, this.props.FactoryIndex)
    }

}

const Types = {
    ITEM: 'tile'
}

const itemSource = {
    beginDrag(props: ITileProps) {
        /* code here */
        console.log("start dragging");
        return { "Type": props.Type, "CountOfType": props.getTilesOfTypeInFactory(props.Type), };
    },
    endDrag(props: ITileProps) {
        console.log("end dragging")
        /* code here */
    }
}

let collect = (connect: any, monitor: any) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

export default DragSource(Types.ITEM, itemSource, collect)(Tile)
//export default Tile;
