import React, { Component } from 'react';
// import { ITileProps, Type } from '../../interfaces/Props';
// import { ITileState } from '../../interfaces/States';
import { DragSource } from 'react-dnd';

interface ITestProps {
    isDragging: any;
    connectDragSource: any;
    src: any;
}

const TestDiv = () => {
    return (
        <div style={{ backgroundColor: "red" }}>Test</div>
    )
}

class Test extends Component<ITestProps> {

    constructor(props: ITestProps) {
        super(props);

        // this.state = {
        //     Color: props.Color,
        //     Type: props.Type
        // }
    }

    render() {
        const { isDragging, connectDragSource } = this.props
        return connectDragSource(
            // <div><TestDiv></TestDiv></div>
            <div
                style={{
                    opacity: isDragging? 0.5: 1,
                    backgroundColor: "grey",
                    width: 100
                }}
            >
                Test
            </div>
        )
    }

}

const Types = {
    ITEM: 'test'
}

const itemSource = {
    beginDrag(props: any) {
        console.log("start dragging");
        //return <div><TestDiv></TestDiv></div>
        return {};
    }
    // // Now covered in Drop() in target
    // ,
    // endDrag(props: any) {
    //     console.log("end dragging")
    //     /* code here */
    // }
}

let collect = (connect: any, monitor: any) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

export default DragSource(Types.ITEM, itemSource, collect)(Test)