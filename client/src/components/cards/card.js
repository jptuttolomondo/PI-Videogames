import React from "react";
import cardFormat from'./card.module.css'

export default function Card({name,image,genres,id}){
return(
<div className={cardFormat.cards}>
   <div className={cardFormat.containerCard}>
       <div key={id} className={cardFormat.videocards}title="Click para más detalles..">
         <div className={cardFormat.cardTitle}>{name}</div>
         <div className={cardFormat.cardData}>{genres[0]}</div>
         
            <img src={image} alt='' width="70px" height="50px" />
        </div> 
    </div>
</div>
 

)


}
