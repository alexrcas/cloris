import { CardGroup, Container, Row } from "react-bootstrap"
import { CustomCard } from "./CustomCard"
import { faTemperatureEmpty } from '@fortawesome/free-solid-svg-icons'
import { faWater } from '@fortawesome/free-solid-svg-icons'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { useEffect, useState } from "react"

export const QuickInfoPanel = () => {

    interface IenvironmentData {
        id: number,
        temperature: number,
        airHumidity: number,
        terrainHumidity: number,
        timestamp: Date
    }

    const [environmentData, setEnvironmentData] = useState<IenvironmentData>()

    useEffect(() => {
        fetch('http://localhost:3000/measures')
            .then(response => response.json())
            .then(data => console.log(data))
    }, [])
    
    

    const response = {
        id: "62241adb0371d9f051048717",
        temperature: 15,
        airHumidity: 82,
        terrainHumidity: 43,
        timestamp: "2022-03-06T02:22:19.351Z"
    }

    const cardAttributes: {title: string, icon: IconDefinition, value: number, unit: string}[] = [
        {
            title: 'Temperatura',
            icon: faTemperatureEmpty,
            unit: 'ºC',
            value: response.temperature
        },
        {
            title: 'Humedad del aire',
            icon: faCloud,
            unit: '%',
            value: response.airHumidity
        },
        {
            title: 'Humedad del terreno',
            icon: faWater,
            unit: '%',
            value: response.terrainHumidity
        }
    ];

    return (

    <Container className="mt-4">

        <CardGroup>
            {
                cardAttributes.map(cardAttribute => (
                    <CustomCard {...cardAttribute} key={cardAttribute.title} />
                ))
            }
        </CardGroup>

        <Row className="mt-2 d-flex">
            <span className="d-flex justify-content-end fst-italic fw-light">Última sincronización: 04/03/2022 17:42</span>
        </Row>

    </Container>

    )

}
