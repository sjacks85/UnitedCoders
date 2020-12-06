import React from "react";
import './NoteBook.css';


class NoteBook extends React.Component {

    constructor(props) {
        super(props);
        /*this.state = {
            actions: this.props.actions
        };*/
    }

    openModal() {
		var all = document.getElementsByClassName("notebookCell");
		for (var i = 0; i < all.length; i++) {
		    all[i].onclick = inputClickHandlerx;
		}
		
		var allco = document.getElementsByClassName("notebookCello");
		
		for (var i = 0; i < allco.length; i++) {
	        allco[i].onclick = inputClickHandlerox;
		}
        var modal = document.getElementById("xnotebookModal");
        modal.style.display = "block";
    }

    closeModal() {
        var modal = document.getElementById("xnotebookModal");
        modal.style.display = "none";
    }

    render() {
        return (
            <div>
                <button onClick={this.openModal}>NoteBook</button>
                <div id="xnotebookModal" class="xmodal">
                    <div class="xnotebookContent">
                        <span onClick={this.closeModal} class="close">&times;</span>
						<span class="detective"><img src="/gameboard/sh.png" style={{width:"80px",height:"140px"}}></img></span> 
                        <img src="/gameboard/NoteBook.png"/>
                        <table>
                            <tr class="hrow">
                                <th colspan="6"><b>Suspects</b></th>
                            </tr>
                            <tr class="orow">
                                <td>Colonel Mustard</td>
                                <td class='notebookCello' onclick='inputClickHandlerox(this);'></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                            </tr>
                            <tr>
                                <td>Professor Plum</td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                            </tr>
                            <tr class="orow">
                                <td>Mr. Green</td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                            </tr>
                            <tr>
                                <td>Ms. Peacock</td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                            </tr>
                            <tr class="orow">
                                <td>Ms. Scarlet</td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                            </tr>
                            <tr>
                                <td>Mrs. White</td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                            </tr>
                            <tr class="hrow">
                                <th colspan="6"><b>Weapons</b></th>
                            </tr>
                            <tr>
                                <td>Knife</td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                            </tr>
                            <tr class="orow">
                                <td>Candlestick</td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                            </tr>
                            <tr>
                                <td>Revolver</td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                            </tr>
                            <tr class="orow">
                                <td>Rope</td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                            </tr>
                            <tr>
                                <td>Lead Pipe</td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                            </tr>
                            <tr class="orow">
                                <td>Wrench</td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                            </tr>
                            <tr class="hrow">
                                <th colspan="6"><b>Rooms</b></th>
                            </tr>
                            <tr>
                                <td>Hall</td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                            </tr>
                            <tr class="orow">
                                <td>Lounge</td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                            </tr>
                            <tr>
                                <td>Dining Room</td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                            </tr>
                            <tr class="orow">
                                <td>Kitchen</td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                            </tr>
                            <tr>
                                <td>Ballroom</td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                            </tr>
                            <tr class="orow">
                                <td>Conservatory</td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                            </tr>
                            <tr>
                                <td>Billiard Room</td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                            </tr>
                            <tr class="orow">
                                <td>Library</td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                                <td class='notebookCello' ></td>
                            </tr>
                            <tr>
                                <td>Study</td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                                <td class='notebookCell' ></td>
                            </tr>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

window.onload = function () {
    var all = document.getElementsByClassName("notebookCell");
    for (var i = 0; i < all.length; i++) {
        all[i].onclick = inputClickHandlerx;
    }
	
	var allco = document.getElementsByClassName("notebookCello");
	
    for (var i = 0; i < allco.length; i++) {
        allco[i].onclick = inputClickHandlerox;
    }
};

function inputClickHandlerx(e) {
    e = e || window.event;
    var tdElm = e.target || e.srcElement;
    if (tdElm.style.backgroundColor == 'blue') {
        tdElm.style.backgroundColor = '#f5f9fb';
    } else {
        tdElm.style.backgroundColor = 'blue';
    }
}

function inputClickHandlerox(e) {
    e = e || window.event;
    var tdElm = e.target || e.srcElement;
    if (tdElm.style.backgroundColor == 'blue') {
        tdElm.style.backgroundColor = '#9dcae8';
    } else {
        tdElm.style.backgroundColor = 'blue';
    }
}

export default NoteBook;
