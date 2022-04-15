import { Accordion, Alert, Button, Card, CardGroup, Container } from "react-bootstrap"
import Moment from "react-moment";
import useFetch from "../hooks/useFetch";

export const WateringInfoPanel = () => {

    const urlSummary = 'http://192.168.0.18:3000/waterings/summary';

    const urlLastWatering = 'http://192.168.0.18:3000/waterings/last';

    interface IWateringSummary {
        last: number,
        history: {
            today: number,
            week: number,
            month: number
        }
    }

    interface IWatering {
        id: string
        litersUsed: number,
        timestamp: Date,
    }

    const { data: summaryData, error: summaryError } = useFetch<IWateringSummary>(urlSummary);

    const { data: lastData, error: lastError } = useFetch<IWatering>(urlLastWatering);

    const labels = ['Hoy', 'Esta semana', 'Este mes']

    if (!summaryData || !lastData) {
        return <p>Cargando...</p>
    }

  return (

    <Container className="mt-4">
        
        <Card>
            <Card.Header><h5>Información del riego</h5></Card.Header>
            <Card.Body>


            <Card className="mb-2">
                <Card.Body>
                    <Card.Title>Último riego</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><Moment fromNow>{lastData.timestamp}</Moment></Card.Subtitle>
                    <Card.Text>
                        <h6>{lastData.litersUsed} litros usados</h6>
                    </Card.Text>
                </Card.Body>
            </Card>


                    <Card>
                        <Card.Body>
                            <Card.Title>Historial de Consumo</Card.Title>

                                <Accordion alwaysOpen defaultActiveKey={['0', '1', '2']}>
                                    {
                                        Object.values(summaryData.history).map((value, i) => 
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


            </Card.Body>
        </Card>

    </Container>

  )
}
