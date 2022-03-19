import React from "react";

export default function Paginado({videosPerPage,allVideos,paginado}){
const pageNumber=[]
for(let i=1;i<=Math.ceil(allVideos/videosPerPage);i++){
pageNumber.push(i)
}

return(
<nav>
<ul>
    {pageNumber&&pageNumber.map(number=>(//genera un link a cada numero de pagina,
    // y podemos pasar a la pagina directamente
    //poner classneme al li!!!
        <li key={number}>
            <a onClick={()=>paginado(number)}>{number}</a>
        </li>
    ))
    }
</ul>
</nav>
)
}