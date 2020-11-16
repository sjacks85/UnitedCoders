import React from "react";
import './NoteBook.css';


class NoteBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actions: this.props.actions
        };
    }

    openModal() {
        var modal = document.getElementById("notebookModal");
        modal.style.display = "block";
    }

    closeModal() {
        var modal = document.getElementById("notebookModal");
        modal.style.display = "none";
    }

    render() {
        return (
            <div>
                <button onClick={this.openModal}>NoteBook</button>
                <div id="notebookModal" class="modal">
                    <div class="notebookContent">
                        <span onClick={this.closeModal} class="close">&times;</span>
                        <h1>NoteBook</h1>

                        <table>
                            <tr>
                                <th colspan="6">Suspects</th>
                            </tr>
                            <tr>
                                <td>Colonel Mustard</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Professor Plum</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Mr. Green</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Ms. Peacock</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Ms. Scarlet</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Mrs. White</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <th colspan="6">Weapons</th>
                            </tr>
                            <tr>
                                <td>Knife</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Candlestick</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Revolver</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Rope</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Lead Pipe</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Wrench</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <th colspan="6">Rooms</th>
                            </tr>
                            <tr>
                                <td>Hall</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Lounge</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Dining Room</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Kitchen</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Ballroom</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Conservatory</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Billiard Room</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Library</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>
                            <tr>
                                <td>Study</td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                                <td class='notebookCell'></td>
                            </tr>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

window.onload = function () {
    //console.log("NOTEBOOKONLOD")
    // var all = document.getElementsByTagName("td");
    // for (var i = 0; i < all.length; i++) {
    //     all[i].onclick = inputClickHandler;
    // }

    var all = document.getElementsByClassName("notebookCell");
    for (var i = 0; i < all.length; i++) {
        all[i].onclick = inputClickHandler;
    }
};

function inputClickHandler(e) {
    //console.log("NOTEBOOOKINPUT")
    e = e || window.event;
    var tdElm = e.target || e.srcElement;
    if (tdElm.style.backgroundColor == 'lightblue') {
        tdElm.style.backgroundColor = 'white';
    } else {
        tdElm.style.backgroundColor = 'lightblue';
    }
}

export default NoteBook;
