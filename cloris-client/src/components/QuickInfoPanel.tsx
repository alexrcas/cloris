import { CardGroup, Container, Row } from "react-bootstrap"
import { CustomCard } from "./CustomCard"
import { faTemperatureEmpty } from '@fortawesome/free-solid-svg-icons'
import { faWater } from '@fortawesome/free-solid-svg-icons'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import useFetch from "../hooks/useFetch"

export const QuickInfoPanel = () => {

    const url = 'http://localhost:3000/measures';

    interface IenvironmentData {
        id: number,
        temperature: number,
        airHumidity: number,
        terrainHumidity: number,
        timestamp: Date
    }

    const { data, error } = useFetch<IenvironmentData[]>(url)

    if (!data) {
        return <p>Cargando...</p>
    }

    const measure: IenvironmentData = data[0];

    return (

    <Container className="mt-4">

        <CardGroup>
            <CustomCard title='Temperatura' icon={faTemperatureEmpty} value={measure.temperature} unit='ºC'/>
            <CustomCard title='Humedad del aire' icon={faCloud} value={measure.airHumidity} unit='%'/>
            <CustomCard title='Humedad del terreno' icon={faWater} value={measure.terrainHumidity} unit='%'/>
        </CardGroup>

        <Row className="mt-2 d-flex">
            <span className="d-flex justify-content-end fst-italic fw-light">Última sincronización: {measure.timestamp}</span>
        </Row>

    </Container>

    )


}
