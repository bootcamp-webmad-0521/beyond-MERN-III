import axios from 'axios'

class CoastersService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api/coasters',
            withCredentials: true
        })
    }

    getCoasters = () => this.app.get('/getAllCoasters')
    getOneCoaster = coaster_id => this.app.get(`/getOneCoaster/${coaster_id}`)
    saveCoaster = coaster_info => this.app.post('/newCoaster', coaster_info)
}

export default CoastersService