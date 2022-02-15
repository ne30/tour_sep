import { Component } from "react";
import { Nav } from "react-bootstrap";
import Ticket from "./Ticket";
import Tour from "./Tour";


export default class Main extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div>
                <h1> Main page </h1>
                <h2>{this.props.location.state.user_name}</h2>
                <Nav variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link ><Tour user_name = {this.props.location.state.user_name}/></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link ><Ticket user_name = {this.props.location.state.user_name}/></Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        )
    }
}