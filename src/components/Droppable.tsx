import React, { Component } from 'react';
import { DropTarget, ConnectDropTarget, ConnectDragSource } from 'react-dnd'

interface IDroppableProps {
    connectDropTarget: any;
    val: number;
}

class Droppable extends Component<IDroppableProps> {

    constructor(props: IDroppableProps) {
        super(props);

        // this.state = {
        //     Color: props.Color,
        //     Type: props.Type
        // }
    }

    render() {    
        const { connectDropTarget } = this.props
        return connectDropTarget(
            <div style={{width: 100}}>drop</div>
        )
    }

}

const Types = {
    ITEM: 'test'
}

const itemSource = {
    drop(props: any) {
        console.log(props);
        console.log("dropped");
    }
}

let collect = (connect: any, monitor: any) => {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

export default DropTarget(Types.ITEM, itemSource, collect)(Droppable)