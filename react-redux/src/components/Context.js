import React from "react";

const MessageContext = React.createContext();

class ComponentChau extends React.Component {
    render() {
        return <h1>Ông bảo là : "{this.context}"</h1>;
    }
}
ComponentChau.contextType = MessageContext;

const ComponentOng = () => {
    return (
        <MessageContext.Provider value="Vào freetuts.net học lập trìn1111h">
            <ComponentChau />
        </MessageContext.Provider>
    );
};
export default ComponentOng;