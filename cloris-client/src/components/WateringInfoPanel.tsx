import { Accordion, Alert, Button, Card, CardGroup, Container } from "react-bootstrap"

export const WateringInfoPanel = () => {


    const litersUsedInfo = {
        today: 0.5,
        week: 3,
        month: 7
    };

    const labels = ['Hoy', 'Esta semana', 'Este mes']

  return (

    <Container className="mt-4">
        
        <Card>
            <Card.Header>Información del riego</Card.Header>
            <Card.Body>

                <CardGroup>

                    <Card>
                        <Card.Body>
                            <Card.Title>Último riego</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Hoy, a las 17:41</Card.Subtitle>
                            <Card.Text>
                                <h6>0.5 litros</h6>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Body>
                            <Card.Title>Consumo de agua</Card.Title>

                                <Accordion alwaysOpen defaultActiveKey={['0', '1', '2']}>
                                    {
                                        Object.values(litersUsedInfo).map((value, i) => 
                                            (
                                                <Accordion.Item eventKey={i.toString()} key={i}>
                                                    <Accordion.Header>{labels[i]}</Accordion.Header>
                                                    <Accordion.Body>
                                                        {value} litros
                                                    </Accordion.Body>
                                                </Accordion.Item>          
                                            )
                                        )
                                    }
                                </Accordion>

                        </Card.Body>
                    </Card>

                </CardGroup>

            </Card.Body>
        </Card>

    </Container>

  )
}
