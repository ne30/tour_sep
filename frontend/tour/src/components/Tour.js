import axios from 'axios';
import React from 'react';
import { Component } from 'react';
import { Nav, Table } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import Ticket from './Ticket';

export default class Tour extends Component{

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user_temp: this.props.user_name.user_name,
            user: {},
            all_tours: {},
            data_loaded: false
        };
    }

    getAllTours(){
        console.log(this.props.user_name);
        axios.get("http://localhost:3001/tours/", {withCredentials: true})
        .then((response) => {
            // console.log(this.props.location.state);
            this.setState({
                all_tours: response.data.data,
                data_loaded: true
            }
            );

        })
        .catch(error => {
            console.error('Error ', error);
        });
    }

    componentDidMount(){
        this._isMounted = true;
        this.getAllTours();
    }

    // componentWillUnmount() {
    //     this._isMounted = false;
    //     this.setState = (state,callback)=>{
    //         return;
    //     };
    // }

    handleUserTicket(){
        this.props.history.push({
            pathname: '/my_tickets'
        });
    }

    getDayOfWeek(date) {
        const dayOfWeek = new Date(date).getDay();    
        return isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'][dayOfWeek];
    }

    render(){
        const{data_loaded, all_tours} = this.state;
        if (!data_loaded) {
            return <div>
                <h1>Loading...</h1>
            </div>
        }
        return (
            <div className='Tour'>  
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Tour Code</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Day & Date</th>
                    <th>Price</th>
                    <th></th>
                    </tr>
                </thead>        
                <tbody>
                    {
                        all_tours.map((tour) =>(
                        <tr>
                            <td>
                                { tour.attributes.tour_code }
                            </td>
                            <td>
                                { tour.attributes.from }
                            </td>
                            <td>
                                { tour.attributes.to }
                            </td>
                            <td>
                                { this.getDayOfWeek(tour.attributes.date) }, { tour.attributes.date }
                            </td>
                            <td>
                                { tour.attributes.price }
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
