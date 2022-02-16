import axios from "axios";
import { Component } from "react";

export default class AddTour extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            tour_code: "",
            from: "",
            to: "",
            start_time: "",
            end_time: "",
            passenger_limit: "",
            price: "",
            date: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        axios.post("http://127.0.0.1:3001/add_tour",{
            tour_code: this.state.tour_code,
            from: this.state.from,
            to: this.state.to,
            start_time: this.state.start_time,
            end_time: this.state.end_time,
            passenger_limit: this.state.passenger_limit,
            price: this.state.price,
            date: this.state.date
        },
        {withCredentials: true}
        ).then(
            response => {
                if(response.data.tour_added){
                    alert(response.data.status);
                    this.setState({
                        tour_code: "",
                        from: "",
                        to: "",
                        start_time: "",
                        end_time: "",
                        passenger_limit: "",
                        price: "",
                        date: ""
                    });
                }
                else{
                    alert(response.data.status);
                }
            }
        )
        console.log("Form is submitted");
        event.preventDefault();
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log("Change event");
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="tour_code" placeholder="Tour Code" value={this.state.tour_code} onChange={this.handleChange} required />
                    
                    <input type="text" name="from" placeholder="From" value={this.state.from} onChange={this.handleChange} required />
                    
                    <input type="text" name="to" placeholder="To" value={this.state.to} onChange={this.handleChange} required />
                    
                    <input type="time" name="start_time" placeholder="Start Time" value={this.state.start_time} onChange={this.handleChange} required />

                    <input type="time" name="end_time" placeholder="End Time" value={this.state.end_time} onChange={this.handleChange} required />

                    <input type="number" min="1" name="passenger_limit" placeholder="Passenger Limit" value={this.state.passenger_limit} onChange={this.handleChange} required />

                    <input type="number" min="1" name="price" placeholder="Price" value={this.state.price} onChange={this.handleChange} required />

                    <input type="date" name="date" placeholder="Date" value={this.state.date} onChange={this.handleChange} required />

                    <button type='submit'>Add</button>
                </form>
            </div>
        );
    }
}