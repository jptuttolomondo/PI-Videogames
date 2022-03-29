import React from "react";
import { Link } from "react-router-dom";
import landPageStyles from './landingPage.module.css'

export function LandingPage() {
return(
<div className={landPageStyles.background}>


<div className={landPageStyles.h1}> PI videogames Henry FT course</div>
   <p> <span className={landPageStyles.span}>Juan Pablo Tuttolomondo</span></p>
   <br></br>
         <br></br>
    <Link to= '/home'> <button className={landPageStyles.btn}>Ingresar</button> </Link>
    <br></br>
         <br></br>
         <br></br>
         <br></br>
    <p><span className={landPageStyles.span}>Techs: React-Redux-NodeJs-Css-PostGreSql-Sequelize-Express</span></p>
</div>
)
}
