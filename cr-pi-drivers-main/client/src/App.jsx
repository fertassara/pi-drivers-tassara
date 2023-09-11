import { Create, Detail, Home, Landing } from './views/index';
import {Route, Routes} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';


function App() {
const location = useLocation();
  return (
    <div>   
    {location.pathname !== '/' && (<NavBar/>)}
     
      <Routes>

        <Route exact path="/" element={<Landing/>}/> 
        <Route path="/Home" element={<Home/>}/> 
        <Route path="/detail/:id" element={<Detail/>}/> 
        <Route path="/Create" element={<Create/>}/> 
      </Routes>
    </div>
  )
}

export default App
