import React from "react";
class HeaderText  extends React.Component {
    constructor(props){
        super(props);
    }
    // console.log(props) //Giá trị của props
    componentWillUnmount() {
        console.log('component will unmount1111111')
    }
    render() {
        return <h1>{this.props.title}</h1>
    }
};
class LifeCycle extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            date : new Date(),
            clickedStatus: false,
            list:[],
            showButton: true,
        };
    }
    componentWillMount() {
        console.log('Component will mount!')
    }
    componentDidMount() {
        console.log('Component did mount!')
        this.getList();
    }
    getList=()=>{
        /*** method to make api call***/
        this.setState({ list:[1,2,3] });
        // fetch('https://api.mydomain.com')
        //     .then(response => response.json())
        //     .then(data => this.setState({ list:data }));
    }
    toggleButton = () => {
        this.setState({ showButton: !this.state.showButton });
    };
    // shouldComponentUpdate(nextProps, nextState){
    //     return this.state.list!==nextState.list
    // }
    componentWillUpdate(nextProps, nextState) {
        console.log('Component will update!');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Component did update!')
    }
    componentWillUnmount() {
        console.log('component will unmount 111111111111')
    }

    render() {
        return (
            <div>
                <h3>Component  Lifecycle</h3>
                <button onClick={() => this.toggleButton()}>Toggle button</button>
                {this.state.showButton ? <HeaderText title="Hello React"/> : null}
            </div>
        );
    }
}
export default LifeCycle;

