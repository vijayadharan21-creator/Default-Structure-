import {Route,Routes} from 'react-router-dom';
import AuthPage from './pages/login.jsx'
import Home from './pages/home.jsx'
function App() {
 

  return (
   <Routes>
    <Route path="/login" element={<AuthPage/>}/>
    <Route path="/" element={<Home/>}/>
   </Routes>
  )
}

export default App
