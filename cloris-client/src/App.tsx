import { Container, Navbar } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { MainNavbar } from './components/MainNavbar';
import { QuickInfoPanel } from './components/QuickInfoPanel';
import './app.css';
import { WateringInfoPanel } from './components/WateringInfoPanel';

function App() {
  return (

    <>
    
      <MainNavbar titulo={'Cloris'} />
      
      <QuickInfoPanel />

      <WateringInfoPanel />
      
    </>

  );
}

export default App;
