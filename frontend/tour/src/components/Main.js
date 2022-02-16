import axios from "axios";
import { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Ticket from "./Ticket";
import Tour from "./Tour";


export default class Main extends Component{

    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            curr: 0,
            is_admin: false
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

    checkIsAdmin(){
        const admin_url = "http://127.0.0.1:3001/is_admin?user_name="+this.props.location.state.user_name;
        axios.get(admin_url
            ,{
                withCredentials:true
            })
            .then((response) => {
                this.setState({is_admin:response.data.is_admin});
                // console.log(response.data);
            });
    }

    componentDidMount(){
        this._isMounted = true;
        this.checkIsAdmin();
    }

    render(){
        return(
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand >Tours</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link onClick={()=>this.setState({curr:1})}>Book Tour</Nav.Link>
                            <Nav.Link onClick={()=>this.setState({curr:0})}>My Tickets</Nav.Link>
                            { this.state.is_admin ? <Nav.Link> All Tickets </Nav.Link> : null }
                            { this.state.is_admin ? <Nav.Link> Add Tour </Nav.Link> : null }
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
                    { this.state.curr===1 ? <Tour user_name = {this.props.location.state.user_name}/> : <Ticket user_name = {this.props.location.state.user_name}/>}
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