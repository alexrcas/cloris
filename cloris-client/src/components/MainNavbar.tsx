import { Container, Navbar } from 'react-bootstrap';

export const MainNavbar = ({titulo}: {titulo: string}) => {

  return(
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">
            <h3>{titulo}</h3>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}