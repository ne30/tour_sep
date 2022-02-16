import axios from "axios";
import { Component } from "react";
import { Button, Table } from "react-bootstrap";
import Modal from "react-modal/lib/components/Modal";

export default class BookModal extends Component{

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            data_loaded: false,
            openModal: false
        };

        this.bookTicketWithCompanion = this.bookTicketWithCompanion.bind(this);
        this.bookTicketWithoutCompanion = this.bookTicketWithoutCompanion.bind(this);
    }

    bookTicketWithCompanion(){
        console.log("Without companion");
        const tour_book_url = "http://127.0.0.1:3001/tours_with_companion";
        axios.post(tour_book_url, {
            param: this.props.tour.id,
            user_name: this.props.user_name
        },{
            withCredentials: true
        }).then(
            response => {
                this.setState({openModal: false});
                console.log(response.data);
                if(response.data.ticket_created){
                    alert("Successfully booked the tour!");
                }
                else{
                    alert(response.data.status);
                }
            }
        )
    }

    bookTicketWithoutCompanion(){
        console.log("Without companion");
        const tour_book_url = "http://127.0.0.1:3001/tours_without_companion";
        axios.post(tour_book_url, {
            param: this.props.tour.id,
            user_name: this.props.user_name
        },{
            withCredentials: true
        }).then(
            response => {
                this.setState({openModal: false});
                console.log(response.data);
                if(response.data.ticket_created){
                    alert("Successfully booked the tour!");
                }
                else{
                    alert(response.data.status);
                }
            }
        )
    }

    onClickButton = e =>{
        e.preventDefault()
        this.setState({openModal: true})
    }

    onCloseModal = ()=>{
        this.setState({openModal: false})
    }

    getDayOfWeek(date) {
        const dayOfWeek = new Date(date).getDay();    
        return isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'][dayOfWeek];
    }

    render(){
        return(
            <div>
                <Button variant="outline-info" onClick={this.onClickButton}>Book</Button>
                <Modal isOpen={this.state.openModal} ariaHideApp={false}>
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Tour Code</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Day & Date</th>
                                    <th>Price</th>
                                </tr>
                            </thead> 
                            <tbody>
                                <tr>
                                    <td>
                                        { this.props.tour.attributes.tour_code }
                                    </td>
                                    <td>
                                        { this.props.tour.attributes.from }
                                    </td>
                                    <td>
                                        { this.props.tour.attributes.to }
                                    </td>
                                    <td>
                                        { this.getDayOfWeek(this.props.tour.attributes.date) }, { this.props.tour.attributes.date }
                                    </td>
                                    <td>
                                        { this.props.tour.attributes.price }
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div>
                            <Button variant="outline-primary" onClick={() => this.bookTicketWithCompanion()}>Book With Compnaion</Button>
                            <Button variant="outline-danger" onClick={() => this.bookTicketWithoutCompanion()}>Book Without Compnaion</Button>
                        </div>
                        <div className="justify-content-end" >
                            <Button variant="outline-danger" onClick={this.onCloseModal}>Close</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}