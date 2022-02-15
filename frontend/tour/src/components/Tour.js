import axios from 'axios';
import React from 'react';
import { Component } from 'react';
import { Nav } from 'react-bootstrap';
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
        // console.log(this.props.location.state);
        this.props.history.push({
            pathname: '/my_tickets'
        });
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
                <h1>{this.props.user_name}</h1>
                <div>         
                    {
                        all_tours.map((tour) =>(
                            <ol key = { tour.id } >
                            Tour_code : { tour.attributes.tour_code }
                        </ol>
                        ))
                    }
                </div>  
            </div>
        );
    }
}
