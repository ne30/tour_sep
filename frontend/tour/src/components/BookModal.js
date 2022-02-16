import { Component } from "react";
import { Button, Table } from "react-bootstrap";
import Modal from "react-modal/lib/components/Modal";

export default class BookModal extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data_loaded: false,
            openModal: false
        };
    }

    onClickButton = e =>{
        console.log("modal button")
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
                <Modal isOpen={this.state.openModal}>
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
                        <Button variant="outline-danger" onClick={this.onCloseModal}>Close</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}