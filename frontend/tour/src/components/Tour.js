import axios from 'axios';
import React from 'react';
import { Component } from 'react';
import { Table } from 'react-bootstrap';
import BookModal from './BookModal';

export default class Tour extends Component{

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user_temp: this.props.user_name.user_name,
            user: {},
            all_tours: {},
            data_loaded: false,
            openModal: false
        };
    }

    getAllTours(){
        axios.get("http://localhost:3001/tours/", {withCredentials: true})
        .then((response) => {
            this.setState({
                all_tours: response.data.data,
                data_loaded: true
            }
            );

        });
    }

    componentDidMount(){
        this._isMounted = true;
        this.getAllTours();
    }

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
                        <th>Book</th>
                    </tr>
                </thead>        
                <tbody>
                    {
                        all_tours.map((tour) =>(
                        <tr key={tour.id}>
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
                            <td>
                                <BookModal tour = {tour} user_name = {this.props.user_name} />                                
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
