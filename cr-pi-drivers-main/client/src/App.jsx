// Importa los componentes Create, Detail, Home y Landing desde el directorio 'views/index'
import { Create, Detail, Home, Landing } from './views/index';

// Importa los componentes Route y Routes desde 'react-router-dom' para definir las rutas
import { Route, Routes } from 'react-router-dom';

// Importa el hook useLocation desde 'react-router-dom' para obtener la ubicación actual de la ruta
import { useLocation } from 'react-router-dom';

// Importa el componente NavBar desde el directorio './components/NavBar/NavBar'
import NavBar from './components/NavBar/NavBar';

// Define la función App como el componente principal
function App() {
  // Obtiene la ubicación actual de la ruta utilizando el hook useLocation
  const location = useLocation();

  return (
    <div>
      {/* Renderiza el componente NavBar si la ubicación actual no es la página de inicio ('/') */}
      {location.pathname !== '/' && (<NavBar/>)}
      
      {/* Define las rutas utilizando el componente Routes */}
      <Routes>
        {/* Ruta exacta para la página de inicio ('/') que renderiza el componente Landing */}
        <Route exact path="/" element={<Landing/>}/> 

        {/* Ruta para la página Home ('/Home') que renderiza el componente Home */}
        <Route path="/Home" element={<Home/>}/> 

        {/* Ruta dinámica para detalles de conductor ('/detail/:id') que renderiza el componente Detail */}
        <Route path="/detail/:id" element={<Detail/>}/> 

        {/* Ruta para la página de creación ('/Create') que renderiza el componente Create */}
        <Route path="/Create" element={<Create/>}/> 
      </Routes>
    </div>
  );
}

// Exporta el componente App como componente principal
export default App;
