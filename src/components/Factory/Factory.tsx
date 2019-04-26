import React, { Component } from 'react';
import './Factory.css';
import { IFactoryProps, Type } from '../../interfaces/Props';
import Tile from '../Tile/Tile';
import TileSquare from '../TileSquare/TileSquare';
import { IFactoryState } from '../../interfaces/States';


class Factory extends React.Component<IFactoryProps> {
    constructor(props: IFactoryProps) {
        super(props);

        // this.updateTilesInFactory = this.updateTilesInFactory.bind(this);

    }
    render() {
        return (
            <div className="Factory">
                {this.props.FactoryTiles.map((tile, i) => {
                    return (
                        <Tile
                            Type={tile.props.Type}
                            Color={tile.props.Color}
                            updateTileColor={this.props.updateTileColor}
                            getTilesOfTypeInFactory={this.getTilesOfTypeInFactory}
                            updateTilesInFactory={this.updateTilesInFactory}
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

        this.props.FactoryTiles.forEach((_tile) => {
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

        this.props.FactoryTiles.forEach(tile => {
            if (tile.props.Type == type) {
                count++;
            }
        })

        return count;
    }

    updateTilesInFactory = (type: Type) => {

        let extraTiles: any =[];
        let isExcess = this.props.isExcess;

        this.props.FactoryTiles.forEach((tile) => {
            if (tile.props.Type != type) {
                extraTiles.push(tile);
            }
        })

        this.props.updateFactoryTiles(extraTiles, this.props.index, isExcess, type);
        // this.props.updateExcessFactoryTiles(extraTiles);
        // this.setState({Tiles: factoryTiles});

    }

}

export default Factory;
