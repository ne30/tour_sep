import axios from 'axios';
import React from 'react';
import { Component } from 'react';

export default class Ticket extends Component{
    
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            user_tickets: {},
            data_loaded: false
        };
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

    render(){
        const{data_loaded, user_tickets} = this.state;
        if (!data_loaded) {
            return <div>
                <h1>Loading...</h1>
            </div>
        }
        return (
            <div className='Ticket'>
                <h1>{this.props.user_name}</h1>
                {
                    user_tickets.map((ticket) =>(
                        <ol key = { ticket.id } >
                        Ticket : { ticket.attributes.tour.tour_code }
                        </ol>
                    ))
                }
            </div>
        );
    }
}