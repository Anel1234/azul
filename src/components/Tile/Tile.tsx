import React, { Component } from 'react';
import './Tile.css';
import { ITileProps, Type } from '../../interfaces/Props';

class Tile extends Component<ITileProps> {

    constructor(props: ITileProps) {
        super(props);

        // this.state = {
        //     test: props
        // }


    }

    //{Type[this.props.Type]}

    render() {
        return (
            <div className="tile" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} style={{backgroundColor: this.props.Color}}>{this.props.Type}</div>
        );
    }

    mouseEnter = () => {
        this.props.updateTileColor(this, true, this.props.FactoryIndex)
    }

    mouseLeave = () => {
        this.props.updateTileColor(this, false, this.props.FactoryIndex)
    }

}

export default Tile;
