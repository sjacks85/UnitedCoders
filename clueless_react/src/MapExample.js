// import React from "react";
// import "./styles.css";

// import { ImageMap } from "@qiuz/react-image-map";
// import { AreaType } from "./AreaType";

// const onMapClick = (area: AreaType, index: number) => {
//   const tip = `click map${area.href || index + 1}`;
//   console.log(tip);
//   alert(tip);
// };

// // in hooks
// export default function Example() {
//   const img =
//     "https://qiuziz.github.io/react-image-map/static/media/example.3373acbe.png";

//   const mapArea = [
//     { left: "0%", top: "6%", height: "12%", width: "33%" },
//     { left: "10%", top: "6%", height: "12%", width: "33%" }
//   ];
//   const ImageMapComponent = React.useMemo(
//     () => (s
//       <ImageMap
//         className="usage-map"
//         src={img}
//         map={mapArea}
//         onMapClick={onMapClick}
//       />
//     ),
//     [mapArea, img]
//   );

//   return <div>{ImageMapComponent}</div>;
//   }

import React from "react";
import ImageMapper from 'react-image-mapper';
import { positional } from "yargs";
import { makeMovement, makeSuggestion, makeAccusation, makeDisprove } from './ClientManager';

  class MapExample extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        actions: this.props.actions,
        hoveredArea: null,
        msg: null, 
        moveMsg: null
      };
    }
    state = {
      actions: []
    };
  
    load() {
      this.setState({ msg: "Interact with image !" });
    }
    clicked(area) {
      this.setState({
        msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
          area.coords
        )} !`
      });
      console.log(this.state.msg)
      makeMovement("true", "hallway");
    }

    clickedOutside(evt) {
      const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
      this.setState({
        msg: `You clicked on the image at coords ${JSON.stringify(coords)} !`
      });
    }

    moveOnImage(evt) {
      const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
      this.setState({
        moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`
      });
    }

    enterArea(area) {
      this.setState({
        hoveredArea: area,
        msg: `You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
          area.coords
        )} !`
      });
    }

    leaveArea(area) {
      this.setState({
        hoveredArea: null,
        msg: `You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
          area.coords
        )} !`
      });
    }

    moveOnArea(area, evt) {
      const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
      this.setState({
        moveMsg: `You moved on ${area.shape} ${
          area.name
        } at coords ${JSON.stringify(coords)} !`
      });
    }
  
    getTipPosition(area) {
      return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
    }

  render() {
    //console.log('MessageState:' + this.state.actions)
    //console.log('MessageProps:' + this.props.actions)
  
  const URL = "/gameboard/GBG.png"
  const MAP = {
    name: "my-map",
    areas: [
      {name: "11", shape: "rect", coords: [93,213,286,439], preFillColor: "green" },
      {name: "12", shape: "poly", coords: [350,278,416,277,416,243,542,245,543,279,607,279,606,468,349,468], preFillColor: "green"},
      {name: "13", shape: 'rect', coords: [673,216,863,407], preFillColor: "green" },
      {name: "21", shape: 'poly', coords: [92,503,253,505,254,534,349,537,348,727,93,727], preFillColor: "green" },
      {name: "22", shape: 'rect', coords: [418,537,575,724], preFillColor: "green" },
      {name: "23", shape: 'poly', coords: [642,538,670,538,671,506,831,506,832,538,862,539,864,632,831,636,833,664,670,666,669,633,639,632], preFillColor: "green" },
      {name: "31", shape: 'rect', coords: [91,822,316,1020], preFillColor: "green" },
      {name: "32", shape: 'rect', coords: [382,792,571,1001], preFillColor: "green" },
      {name: "33", shape: 'rect', coords: [639,892,862,1017], preFillColor: "green" },
      {name: "1112", shape: 'rect', coords: [288,373,348,403], preFillColor: "green" },
      {name: "1213", shape: 'rect', coords: [610,371,671,404], preFillColor: "green" },
      {name: "2122", shape: 'rect', coords: [352,597,416,629], preFillColor: "green" },
      {name: "2223", shape: 'rect', coords: [578,563,639,598], preFillColor: "green" },
      {name: "3132", shape: 'rect', coords: [318,921,381,953], preFillColor: "green" },
      {name: "3233", shape: 'rect', coords: [576,920,637,953], preFillColor: "green" },
      {name: "1121", shape: 'rect', coords: [218,440,252,501], preFillColor: "green" }, 
      {name: "1222", shape: 'rect', coords: [542,471,576,531], preFillColor: "green" },
      {name: "1323", shape: 'rect', coords: [734,409,771,503], preFillColor: "green" },
      {name: "2131", shape: 'rect', coords: [282,730,318,819], preFillColor: "green" },
      {name: "2232", shape: 'rect', coords: [444,729,479,789], preFillColor: "green" },
      {name: "2333", shape: "rect", coords: [680,668,716,884], preFillColor: "green" },
    ]
  }

  const ROOM = [
    { id: "11", name: "Kitchen"},
    { id: "12", name: "Ballroom"},
    { id: "13", name: "Conservatory"},
    { id: "21", name: "Diningroom"},
    { id: "22", name: "Billiardroom"},
    { id: "23", name: "Library"},
    { id: "31", name: "Lounge"},
    { id: "32", name: "Hall"},
    { id: "33", name: "Study"},
    { id: "1112", name: "1112"},
    { id: "1213", name: "1213"},
    { id: "2122", name: "2122"},
    { id: "2223", name: "2223"},
    { id: "3132", name: "3132"},
    { id: "3233", name: "3233"},
    { id: "1121", name: "1121"},
    { id: "1222", name: "1222"},
    { id: "1323", name: "1323"},
    { id: "2131", name: "2131"},
    { id: "2232", name: "2232"},
    { id: "2333", name: "2333"}
  ]

    return (
  <div className="container">
    <ImageMapper src={URL} map={MAP} width={500}
    	onLoad={() => this.load()}
    	onClick={area => this.clicked(area)}
    	onMouseEnter={area => this.enterArea(area)}
    	onMouseLeave={area => this.leaveArea(area)}
    	onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
    	onImageClick={evt => this.clickedOutside(evt)}
      onImageMouseMove={evt => this.moveOnImage(evt)}
      imgWidth={1230}
    />
    {
    	this.state.hoveredArea &&
    	<span className="tooltip"
    	    style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
    		{ this.state.hoveredArea && this.state.hoveredArea.name }
    	</span>
    }
    <p></p>
</div>
    );
  }
  }
  
export default MapExample;