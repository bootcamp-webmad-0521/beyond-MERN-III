import { Col, Card, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'

const CoasterCard = ({ title, imageUrl, _id, owned }) => {

    const editCoasterr = () => alert('TE LO CURRAS!')

    return (

        <Col md={4}>

            <Card className="coaster-card">
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Link to={`/montañas-rusas/detalle/${_id}`}>
                        <Button variant="dark" block >Ver detalles</Button>
                    </Link>
                    {owned && <Button variant="warning" block onClick={editCoasterr}>Editar</Button>}
                </Card.Body>
            </Card>

        </Col>
    )
}

export default CoasterCard