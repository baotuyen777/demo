
import './App.css';
import React from "react";
import ReactDOM from "react-dom";

import LifeCycle from './components/LifeCycle'
import Clothes from "./components/Clothes"; //Import component vào
import Event from "./components/Event";
import Form from "./components/Form";
import ComponentOng from "./components/Context";
import LiftingStateUp from "./components/LiftingStateUp";
import Ref from "./components/Ref";
import RandomNumberComponent from "./components/Hook";
class App extends React.Component {
    constructor(props) {
        super(props);
        //Chỉ định một state
        this.state = { index: 1 };
    }
    countDown() {
        this.setState({
            index: this.state.index - 1
        });
    }
    countUp(){
        this.setState((prevState, props) => {
            return {
                index: prevState.index + 1
            }
        });
    }
    changeColor() {
        var title = document.getElementById("title");
        ReactDOM.findDOMNode(title).style.color = "red";
    }
    render() {
        return (
            <div>
                <p>Giá trị: {this.state.index}</p>
                <button onClick={() => this.countDown()}>Down</button>
                <button onClick={() => this.countUp()}>Up</button>
                <p>Giá trị2: {Math.random()}</p>
                <button onClick={() => this.forceUpdate()}>Reload</button>
                <button onClick={() => this.changeColor()}>Change Color</button>
                <h1 id="title">Học ReactJS căn bản tại {this.state.website} </h1>
                <Clothes name="Quần jean" type="Skinny" color ="Đen" size = "L">Clothes 1</Clothes>
                <Clothes name="Váy" type="váy công chúa" color ="Trắng" size = "M">Clothes 2</Clothes>
                <LifeCycle/>
                <Event/>
                <Form/>
                <LiftingStateUp/>
                <ComponentOng/>
                <Ref/>
                <RandomNumberComponent/>
                <br/><br/>

            </div>
        );
    }
}
export default App;
