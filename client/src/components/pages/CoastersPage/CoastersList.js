import { Component } from 'react'
import CoastersService from './../../../services/coasters.service'
import { Row, Button, Modal } from 'react-bootstrap'
import CoasterCard from './CoasterCard'
import CoasterForm from '../CoasterForm/CoasterForm'

class CoastersList extends Component {

    constructor() {
        super()
        this.state = {
            coasters: undefined,
            modal: false
        }
        this.coastersService = new CoastersService()
    }


    loadCoasters = () => {
        this.coastersService
            .getCoasters()
            .then(response => this.setState({ coasters: response.data }))
            .catch(err => console.log(err))
    }


    componentDidMount = () => {
        this.loadCoasters()
    }


    render() {

        return (

            !this.state.coasters
                ?
                <h3>CARGANDO...</h3>
                :
                (<>
                    {this.props.loggedUser && <Button onClick={() => this.setState({ modal: true })} variant="dark" style={{ marginBottom: '20px' }}>Crear nueva montaña</Button>}

                    <Row>
                        {this.state.coasters.map(elm => <CoasterCard key={elm._id} {...elm} owned={this.props.loggedUser?._id === elm.owner} />)}
                    </Row>

                    <Modal show={this.state.modal} onHide={() => this.setState({ modal: false })}>
                        <Modal.Header>
                            <Modal.Title>Nueva Montaña rusa</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CoasterForm refreshCoasters={this.loadCoasters} closeModal={() => this.setState({ modal: false })} />
                        </Modal.Body>
                    </Modal>
                </>
                )
        )
    }
}

export default CoastersList