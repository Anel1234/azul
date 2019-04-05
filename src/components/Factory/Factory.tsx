import React, { Component } from 'react';
import './Factory.css';
import { IFactoryProps } from '../../interfaces/Props';
import Tile from '../Tile/Tile';


class Factory extends React.Component<IFactoryProps> {
    constructor(props: IFactoryProps) {
        super(props);

    }
    render() {
        return (
            <div className="Factory">
                {this.props.FactoryTiles.map((tile, i) => {
                    return <Tile
                        Type={tile.props.Type}
                        Color={tile.props.Color}
                        updateTileColor={this.props.updateTileColor}
                        FactoryIndex={this.props.index}
                        // mouseEnter={tile.props.mouseEnter}
                        // mouseLeave={tile.props.mouseLeave}
                        key={i}>
                    </Tile>
                })}
            </div>
        );
    }

    // updateTileColor = (tile: Tile, mouseEnter: boolean) => {
    //     // this.props.updateTileColor(tile, mouseEnter, this)
    // }

}

export default Factory;
