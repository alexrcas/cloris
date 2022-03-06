import { Card } from "react-bootstrap"


export const CustomCard = (
  {title, iconName, value, unit}: {title: string,
                                  iconName: string,
                                  value: number,
                                  unit: string}
  ) => {
  return (
    <Card>
    <Card.Body>
        <Card.Title>{ title }</Card.Title>
        <Card.Text className="d-flex justify-content-center">
            { iconName }
        </Card.Text>
        <h2 className="justify-content-center d-flex">{ value } { unit }</h2>
    </Card.Body>
    </Card>
  )
}
