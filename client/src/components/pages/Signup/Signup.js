import { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import AuthService from './../../../services/auth.service'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            pwd: ''
        }
        this.authService = new AuthService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }


    handleFormSubmit = e => {

        e.preventDefault()

        const { username, pwd } = this.state

        this.authService
            .signup(username, pwd)
            .then(() => this.props.history.push('/iniciar-sesion'))          // Redirect with RRD props
            .catch(err => console.log(err))
    }


    render() {
        return (

            <Container>

                <Row>

                    <Col md={{ span: 4, offset: 4 }}>

                        <h1>Registro</h1>

                        <hr></hr>

                        <Form onSubmit={this.handleFormSubmit}>

                            <Form.Group controlId="username">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control type="text" value={this.state.username} onChange={this.handleInputChange} name="username" />
                            </Form.Group>

                            <Form.Group controlId="pwd">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" value={this.state.pwd} onChange={this.handleInputChange} name="pwd" />
                            </Form.Group>

                            <Button style={{ marginTop: '20px', width: '100%' }} variant="dark" type="submit">Registrarme</Button>

                        </Form>

                        <hr></hr>

                        <Link to="/">
                            <Button variant="dark">Volver</Button>
                        </Link>

                    </Col>
                </Row>

            </Container >

        )
    }
}


export default Signup