import axios from "axios";
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

    handleLogoutClick(){
        axios.delete("http://127.0.0.1:3001/logout", {withCredentials: true}).then(response => {
          this.props.handleLogout();
        })
        .catch(error => {
          console.log("logout error", error);
        });
        sessionStorage.clear();
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
                            <Nav.Link href="login" onClick={this.handleLogoutClick}>Logout</Nav.Link>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <br/>
                <div class="table-div">
                    { this.state.curr ? <Tour user_name = {this.props.location.state.user_name}/> : <Ticket user_name = {this.props.location.state.user_name}/>}
                </div>
                <style>
                    {"\
                    .table-div{\
                    margin:28px;\
                    }\
                    "}
                </style>
            </div>
        )
    }
}