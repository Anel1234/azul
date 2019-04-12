import React, { Component } from 'react';
import './Factory.css';
import { IFactoryProps, Type } from '../../interfaces/Props';
import Tile from '../Tile/Tile';
import TileSquare from '../TileSquare/TileSquare';
import { IFactoryState } from '../../interfaces/States';


class Factory extends React.Component<IFactoryProps, IFactoryState> {
    constructor(props: IFactoryProps) {
        super(props);

        this.state = {
            Tiles: props.FactoryTiles
        };

    }
    render() {
        return (
            <div className="Factory">
                {this.state.Tiles.map((tile, i) => {
                    return (
                        <Tile
                            Type={tile.props.Type}
                            Color={tile.props.Color}
                            updateTileColor={this.updateTileColor}      
                            getTilesOfTypeInFactory={this.getTilesOfTypeInFactory}                     
                            FactoryIndex={this.props.index}
                            // mouseEnter={tile.props.mouseEnter}
                            // mouseLeave={tile.props.mouseLeave}
                            key={i}>
                        </Tile>
                    )
                })}
            </div>
        );
    }

    updateTileColor = async (tile: any, mouseEnter: boolean) => {

        let tiles: any[] = [];

        this.state.Tiles.forEach((_tile) => {
            if (_tile.props.Type == tile.props.Type) {
                if (mouseEnter) {
                    tiles.push(new Tile({ FactoryIndex: this.props.index, Type: tile.props.Type, Color: "Grey", updateTileColor: this.updateTileColor }));
                }
                else {
                    tiles.push(new Tile({ FactoryIndex: this.props.index, Type: _tile.props.Type, Color: Type[_tile.props.Type], updateTileColor: this.updateTileColor }));
                }
            }
            else {
                tiles.push(new Tile({ FactoryIndex: this.props.index, Type: _tile.props.Type, Color: Type[_tile.props.Type], updateTileColor: this.updateTileColor }))
            }
        })

        this.setState({ Tiles: tiles });

        //Factories: this.state.Factories.map(factory => (factory.props.index == factoryIndex) ? {})    
        // this.props.updateTileColor(tile, mouseEnter, this)
    }

    getTilesOfTypeInFactory = (type: Type) => {

        let count: number = 0;

        this.state.Tiles.forEach(tile => {
            if(tile.props.Type == type) {
                count++;
            }
        })

        return count;
    }

}

export default Factory;
