import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import AuthService from '../../../services/auth.service'

const Navigation = ({ storeUser, loggedUser, showMessage }) => {

    const authserVice = new AuthService()

    const logout = () => {
        authserVice
            .logout()
            .then(() => {
                showMessage('Has cerrado sesión')
                storeUser(undefined)
            })
            .catch(err => console.log(err))
    }

    return (
        <Navbar bg="dark" variant="dark" expand="md" style={{ marginBottom: '30px' }}>
            <Navbar.Brand href="#home">CoastersApp_</Navbar.Brand >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/">Inicio</Link>
                    <Link className="nav-link" to="/montañas-rusas">Montañas rusas</Link>

                    {!loggedUser
                        ?
                        <>
                            <Link className="nav-link" to="/registro">Registro</Link>
                            <Link className="nav-link" to="/iniciar-sesion">Acceder</Link>
                        </>
                        :
                        <>
                            <Link className="nav-link" to="/mi-perfil">Perfil</Link>
                            <span className="nav-link" onClick={logout}>Cerrar sesión</span>
                        </>
                    }

                    <span className="nav-link">¡Hola, {loggedUser ? loggedUser.username : 'invitad@'}!</span>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Navigation