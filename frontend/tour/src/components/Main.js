import { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Ticket from "./Ticket";
import Tour from "./Tour";


export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            curr: false
        }
    }

    render(){
        return(
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand >Tours</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link onClick={()=>this.setState({curr:true})}>Book Tour</Nav.Link>
                            <Nav.Link onClick={()=>this.setState({curr:false})}>My Tickets</Nav.Link>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Welcome {this.props.location.state.user_name}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <br/>
                <div>
                    { this.state.curr ? <Tour user_name = {this.props.location.state.user_name}/> : <Ticket user_name = {this.props.location.state.user_name}/>}
                </div>
            </div>
        )
    }
}