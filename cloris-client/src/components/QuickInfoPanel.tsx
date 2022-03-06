import { CardGroup, Container, Row } from "react-bootstrap"
import { CustomCard } from "./CustomCard"


export const QuickInfoPanel = () => {

    const response = {
        id: "62241adb0371d9f051048717",
        temperature: 15,
        airHumidity: 82,
        terrainHumidity: 43,
        timestamp: "2022-03-06T02:22:19.351Z"
    }

    const cardAttributes: {title: string, iconName: string, value: number, unit: string}[] = [
        {
            title: 'Temperatura',
            iconName: 'fa-temp',
            unit: 'ºC',
            value: response.temperature
        },
        {
            title: 'Humedad del aire',
            iconName: 'fa-hum',
            unit: '%',
            value: response.airHumidity
        },
        {
            title: 'Humedad del terreno',
            iconName: 'fa-terr',
            unit: '%',
            value: response.terrainHumidity
        }
    ];

    return (

    <Container className="mt-4">

        <CardGroup>
            {
                cardAttributes.map(cardAttribute => (
                    <CustomCard {...cardAttribute}  />
                ))
            }
        </CardGroup>

        <Row className="mt-2 d-flex">
            <span className="d-flex justify-content-end fst-italic fw-light">Última sincronización: 04/03/2022 17:42</span>
        </Row>

    </Container>

    )

}
