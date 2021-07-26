import { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import CoastersService from '../../../services/coasters.service'
import UploadsService from '../../../services/uploads.service'
import Spinner from '../../shared/Spinner/Spinner'


class CoasterForm extends Component {

    constructor() {
        super()
        this.state = {
            coaster: {
                title: '',
                description: '',
                length: '',
                inversions: '',
                imageUrl: ''
            },
            loading: false,
            errors: undefined
        }
        this.coastersService = new CoastersService()
        this.uploadsService = new UploadsService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ coaster: { ...this.state.coaster, [name]: value } })
    }


    handleFormSubmit = e => {
        e.preventDefault()

        this.coastersService
            .saveCoaster(this.state.coaster)
            .then(() => {
                this.props.closeModal()
                this.props.refreshCoasters()
                this.setState({ coaster: { title: '', description: '', length: '', inversions: '', imageUrl: '' } })
            })
            .catch(err => this.setState({ errors: err.response.data.errors }))
    }


    handleFileUpload = e => {

        this.setState({ loading: true })

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        this.uploadsService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    loading: false,
                    coaster: { ...this.state.coaster, imageUrl: response.data.cloudinary_url }
                })
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <Container>

                <Form onSubmit={this.handleFormSubmit}>

                    <Form.Group controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={this.state.coaster.title} onChange={this.handleInputChange} name="title" />
                    </Form.Group>

                    <Form.Group controlId="desc">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="text" value={this.state.coaster.description} onChange={this.handleInputChange} name="description" />
                    </Form.Group>

                    <Form.Group controlId="inve">
                        <Form.Label>Inversiones</Form.Label>
                        <Form.Control type="text" value={this.state.coaster.inversions} onChange={this.handleInputChange} name="inversions" />
                    </Form.Group>

                    <Form.Group controlId="lng">
                        <Form.Label>Longitud</Form.Label>
                        <Form.Control type="text" value={this.state.coaster.length} onChange={this.handleInputChange} name="length" />
                    </Form.Group>

                    {/* <Form.Group controlId="lng">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="text" value={this.state.coaster.imageUrl} onChange={this.handleInputChange} name="imageUrl" />
                    </Form.Group> */}

                    <Form.Group controlId="lng">
                        <Form.Label>Imagen (file) </Form.Label>
                        <Form.Control type="file" onChange={this.handleFileUpload} />
                    </Form.Group>

                    {this.state.loading && <Spinner size='sm' shape='circle' />}

                    <Button style={{ marginTop: '20px', width: '100%' }} variant="dark" type="submit" disabled={this.state.loading}>
                        {this.state.loading ? 'Subiendo...' : 'Crear montaña rusa'}
                    </Button>

                </Form>

            </Container >
        )
    }
}

export default CoasterForm
