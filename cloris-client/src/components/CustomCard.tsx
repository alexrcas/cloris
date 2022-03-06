import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card } from "react-bootstrap"

export const CustomCard = (
  {title, icon, value, unit}: {title: string,
                                  icon: IconProp,
                                  value: number,
                                  unit: string}
  ) => {
  return (
    <Card>
    <Card.Body>
        <Card.Title>{ title }</Card.Title>
        <Card.Text className="d-flex justify-content-center text-info">
          <FontAwesomeIcon icon={icon} size={'6x'} />
        </Card.Text>
        <h2 className="justify-content-center d-flex">{ value } { unit }</h2>
    </Card.Body>
    </Card>
  )
}
