import { Switch, Route, Redirect } from 'react-router-dom'
import IndexPage from './../pages/IndexPage/IndexPage'
import CoastersPage from './../pages/CoastersPage/CoastersPage'
import CoasterDetails from './../pages/CoasterDetails/CoasterDetails'
import CoasterForm from '../pages/CoasterForm/CoasterForm'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'
import Profile from '../pages/Profile/Profile'

const Routes = ({ storeUser, loggedUser }) => {

    return (
        <Switch>
            <Route path="/" exact render={() => <IndexPage />} />
            <Route path="/montañas-rusas" exact render={() => <CoastersPage loggedUser={loggedUser} />} />
            <Route path="/montañas-rusas/detalle/:coaster_id" render={props => <CoasterDetails {...props} />} />
            <Route path="/montañas-rusas/crear" render={() => <CoasterForm />} />
            <Route path="/registro" render={props => <Signup {...props} />} />
            <Route path="/iniciar-sesion" render={props => <Login {...props} storeUser={storeUser} />} />
            <Route path="/mi-perfil" render={() => loggedUser ? <Profile loggedUser={loggedUser} /> : <Redirect to="/" />} />
        </Switch>
    )
}

export default Routes