import axios from 'axios';
import React from 'react';
import { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

export default class Ticket extends Component{
    
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            user_tickets: {},
            data_loaded: false
        };

        this.cancelUserTicket = this.cancelUserTicket.bind(this);
    }

    getUserTickets(){
        // console.log(this.user_temp);
        // console.log(this.props.user_name.user_name);
        const ticket_url = "http://localhost:3001/tickets?user_name="+this.props.user_name;
        axios.get(ticket_url,{withCredentials: true})
        .then((response) => {
            // console.log(this.state.user.user_name);
            this.setState({
                user_tickets: response.data.data,
                data_loaded: true
            });
        })
        .catch(error => {
            console.error('Error ', error);
        });
    }

    cancelUserTicket(ticket_id){
        // console.log(t);
        axios.post("http://127.0.0.1:3001/cancel",{
            param: ticket_id
        },
        {withCredentials: true})
        .then(
            response => {
                this.getUserTickets();
                console.log(response.data.ticket_deleted);
                if (response.data.ticket_deleted){
                    alert("Successfully cancelled the ticket!");
                }
                else{
                    //TODO
                    alert("Something went wrong!");
                }
                // window.location.reload();
            }
        );
    }

    componentDidMount(){
        this._isMounted = true;
        this.getUserTickets();
    }

    // componentWillUnmount() {
    //     this._isMounted = false;
    //     this.setState = (state,callback)=>{
    //         return;
    //     };
    // }

    getDayOfWeek(date) {
        const dayOfWeek = new Date(date).getDay();    
        return isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'][dayOfWeek];
    }

    render(){
        const{data_loaded, user_tickets} = this.state;
        
        if (!data_loaded) {
            return <div>
                <h1>Loading...</h1>
            </div>
        }
        return (
            <div className='Ticket'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ticket Code</th>
                            <th>Tour Code</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Day & Date</th>
                            <th>Companion</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user_tickets.map((ticket) =>(
                                <tr>
                                    <td>
                                        { ticket.id }
                                    </td>
                                    <td>
                                        { ticket.attributes.tour.tour_code }
                                    </td>
                                    <td>
                                        { ticket.attributes.tour.from }
                                    </td>
                                    <td>
                                        { ticket.attributes.tour.to }
                                    </td>
                                    <td>
                                        { this.getDayOfWeek(ticket.attributes.tour.date) }, { ticket.attributes.tour.date }
                                    </td>
                                    <td>
                                        { ticket.attributes.companion_user_name ? ticket.attributes.companion_user_name : "-" }
                                    </td>
                                    <td>
                                        <Button variant="outline-danger" onClick={() => this.cancelUserTicket(ticket.id)}>Cancel</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    
                </Table>
            </div>
        );
    }
}