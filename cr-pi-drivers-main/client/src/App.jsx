import { Create, Detail, Home, Landing } from './views/index';
import {Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>        
      <Routes>
        <Route exact path="/" element={<Landing/>}/> 
        <Route path="/home" element={<Home/>}/> 
        <Route path="/detail/:id" element={<Detail/>}/> 
        <Route path="/create" element={<Create/>}/> 
      </Routes>
    </>
  )
}

export default App
