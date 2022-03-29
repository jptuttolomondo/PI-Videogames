import './App.css';
import {Route,Routes} from 'react-router-dom'
import {LandingPage} from'./components/landing/landingPage'
import {Home} from './components/home/home';
import {VideogameCreate} from'./components/cards/VideogameCreate'
import Detail from './components/cards/detail'
import { Provider } from 'react-redux';
import {store}from'./store/index'
import './App.css';
function App() {
  return (      
   <div className="App">
        <Provider store= {store}>
         <Routes>
                <Route  path="/" element={<LandingPage/>} > </Route>
                <Route exact path="/home" element={<Home/>} > </Route>
                <Route path="/videogames" element={<VideogameCreate/>} > </Route>
                <Route path="/videogame/:id" element={<Detail/>} > </Route>

      </Routes>
    </Provider>
     </div>   
     );
}
export default App;

