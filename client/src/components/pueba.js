//en App
import LandingPage from'./components/landing/landingPage'

function App() {
    return (       
        <div className="App">
         <BrowserRouter>
              <Routes>
                  <Route exact path="/" element={LandingPage} > </Route>
                  <Route exact path="/home" element={<Home/>} > </Route>
                 </Routes>
  </BrowserRouter>
       </div>
    );
  }
//en landpage.js
export default function LandingPage() {
    return(
        <div>
    <h1>landPage PI videogames</h1>
     </div>
    )
    }