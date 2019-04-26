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

    render() {
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


    mouseEnter = () => {
        if (!this.props.isPlaced) {
            this.props.updateTileColor(this, true, this.props.FactoryIndex);
        }

        //this.props.updateTileColor(this, true, this.props.FactoryIndex)
    }

    mouseLeave = () => {
        if (!this.props.isPlaced) {
            this.props.updateTileColor(this, false, this.props.FactoryIndex);
        }
        //this.props.updateTileColor(this, false, this.props.FactoryIndex)
    }

}

const Types = {
    ITEM: 'tile'
}

const itemSource = {
    canDrag(props: ITileProps) {
        return !props.isPlaced;
    },
    beginDrag(props: ITileProps) {
        return { "Type": props.Type, "CountOfType": props.getTilesOfTypeInFactory(props.Type) };
    },
    endDrag(props: ITileProps, monitor: any) {
        if(monitor.didDrop()) {
            props.updateTilesInFactory(props.Type);
        }
    },
}

let collect = (connect: any, monitor: any) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

export default DragSource(Types.ITEM, itemSource, collect)(Tile)
//export default Tile;
