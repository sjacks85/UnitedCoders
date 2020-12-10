import React from "react";
import Relaxed from "./Music/relaxed.wav";
import Electronic from "./Music/electronic.wav";
import Marimba from "./Music/marimba.wav";
import Dreamy from "./Music/dreamy.wav";
import Mellow from "./Music/mellow.wav";

import './Music.css';



class Music extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            play: false,
            pause: true,
            selectValue: Relaxed,
        } 

        //default
        this.audio = new Audio(Relaxed);

        this.audio.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);

    }

    play = () => {
        this.setState({ play: true, pause: false })
        this.audio.play();
    }

    pause = () => {
        this.setState({ play: false, pause: true })
        this.audio.pause();
    }


    getInitialState = () => {
        return { selectValue: Relaxed };
    }

    handleChange = (e) => {
        this.audio = new Audio(e.target.value);
        this.setState({ selectValue: e.target.value });
    }


    render() {

        return (
            <div>
                <button id="music-button" onClick={this.play}>Play</button>
                <button id="music-button" onClick={this.pause}>Pause</button>

                <select id="music-dropdown" value={this.state.selectValue} onChange={this.handleChange}>
                    <option value={Relaxed}>Relaxed</option>
                    <option value={Electronic}>Electronic</option>
                    <option value={Marimba}>Marimba</option>
                    <option value={Dreamy}>Dreamy</option>
                    <option value={Mellow}>Mellow</option>
                </select>
            </div>




        );
    }


}




// ReactDOM.render(
//   <Music />,
//   document.getElementById('music-container')
// );

export default Music;
