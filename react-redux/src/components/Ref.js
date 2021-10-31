import React from "react";

export default class Ref extends React.Component {
    constructor(props) {
        super(props);
        //Khởi tạo một ref
        this.myRef = React.createRef();
    }

    handleClick = () => {
        this.myRef.current.focus();
    }
    render() {
        return (
            <>
                <code>freetuts.net</code>
                <input
                    name="email"
                    onChange={this.onChange}
                    ref={this.myRef}
                    type="text"
                />
                <button onClick={this.handleClick}>
                    Focus Input
                </button>
            </>
        );
    }
}