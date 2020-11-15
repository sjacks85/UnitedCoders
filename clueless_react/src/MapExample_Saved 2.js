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
  
    const URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg"
  const MAP = {
    name: "my-map",
    areas: [
     { name: "1", shape: "poly", coords: [25,33,27,300,128,240,128,94], preFillColor: "green", fillColor: "blue"  },
      { name: "2", shape: "poly", coords: [219,118,220,210,283,210,284,119], preFillColor: "pink"  },
      { name: "3", shape: "poly", coords: [381,241,383,94,462,53,457,282], fillColor: "yellow"  },
      { name: "4", shape: "poly", coords: [245,285,290,285,274,239,249,238], preFillColor: "red"  },
      { name: "5", shape: "circle", coords: [170, 100, 25 ] },
    ]
  }

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
    />
    {
    	this.state.hoveredArea &&
    	<span className="tooltip"
    	    style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
    		{ this.state.hoveredArea && this.state.hoveredArea.name}
    	</span>
    }
    <p></p>
</div>
    );
  }
  }
  
export default MapExample;

// 	render() {
// 		return (
// 			<div className="grid">
// 				<div className="presenter">
// 					<div style={{ position: "relative" }}>
// 						<ImageMapper
// 							src={URL}
// 							map={MAP}
// 							width={500}
// 							onLoad={() => this.load()}
// 							onClick={area => this.clicked(area)}
// 							onMouseEnter={area => this.enterArea(area)}
// 							onMouseLeave={area => this.leaveArea(area)}
// 							onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
// 							onImageClick={evt => this.clickedOutside(evt)}
// 							onImageMouseMove={evt => this.moveOnImage(evt)}
// 							lineWidth={4}
// 							strokeColor={"white"}
// 						/>
// 						{this.state.hoveredArea && (
// 							<span
// 								className="tooltip"
// 								style={{ ...this.getTipPosition(this.state.hoveredArea) }}
// 							>
// 								{this.state.hoveredArea && this.state.hoveredArea.name}
// 							</span>
// 						)}
// 					</div>
// 					<pre className="message">
// 						{this.state.msg ? this.state.msg : null}
// 					</pre>
// 					<pre>{this.state.moveMsg ? this.state.moveMsg : null}</pre>
// 				</div>
// 			</div>
// 		);
// 	}
// });
