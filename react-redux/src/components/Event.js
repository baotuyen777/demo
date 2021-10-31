import React from "react";

class Event extends React.Component {
    constructor(props) {
        super(props);
        //Khởi tạo inital state
        this.state = {
            textareaChange: "",
            buttonClick : "",
            mouseOver: ""
        };
        //bind this cho function mouseOver để  tránh gặp lỗi
        //không tồn tại biến this.
        this.mouseOver = this.mouseOver.bind(this)
    }
    changeText(e) {
        this.setState({
            textareaChange: e.target.value
        });
    }
    mouseOver() {
        this.setState({
            mouseOver: this.state.mouseOver + "mouseOver..."
        });
    }
    render() {
        return (
            <div style={{marginTop: "5%"}}>
                <button
                    onClick={() => {
                        this.setState({
                            buttonClick: this.state.buttonClick + "onClick..."
                        });
                    }}
                >
                    Click me..
                </button>{" "}

                <p>
                    button: <code>{this.state.buttonClick}</code>
                </p>
                <hr />
                <textarea onChange={e => this.changeText(e)} placeholder="nhập cái gì đó..."></textarea>
                <p>
                    textarea: <code>{this.state.textareaChange}</code>
                </p>

                <hr />
                <h6 onMouseOver={this.mouseOver}>Di chuột vào đêyyyy nè :v</h6>
                <p>
                    mouseOver: <code>{this.state.mouseOver}</code>
                </p>
            </div>
        );
    }
}

export default Event;