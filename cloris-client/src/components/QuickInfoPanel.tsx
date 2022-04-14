import { CardGroup, Container, Row } from "react-bootstrap"
import { CustomCard } from "./CustomCard"
import { faTemperatureEmpty } from '@fortawesome/free-solid-svg-icons'
import { faWater } from '@fortawesome/free-solid-svg-icons'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import useFetch from "../hooks/useFetch"
import Moment from "react-moment"
import 'moment/locale/es';
import moment from "moment"

moment.locale('es');

export const QuickInfoPanel = () => {

    const url = 'http://localhost:3000/measures/last';

    interface IenvironmentData {
        id: number,
        temperature: number,
        airHumidity: number,
        terrainHumidity: number,
        timestamp: Date
    }

    const { data, error } = useFetch<IenvironmentData>(url)

    if (!data) {
        return <p>Cargando...</p>
    }

    return (

    <Container className="mt-4">

        <CardGroup>
            <CustomCard title='Temperatura' icon={faTemperatureEmpty} value={data.temperature} unit='ºC'/>
            <CustomCard title='Humedad del aire' icon={faCloud} value={data.airHumidity} unit='%'/>
            <CustomCard title='Humedad del terreno' icon={faWater} value={data.terrainHumidity} unit='%'/>
        </CardGroup>

        <Row className="mt-2 d-flex">
            <span className="d-flex justify-content-end fst-italic fw-light">Última sincronización: <Moment format='DD/MM/YYYY HH:mm'>{data.timestamp}</Moment></span>
        </Row>

    </Container>

    )


}
