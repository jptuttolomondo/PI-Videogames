import React from "react";
import formatList from'./paginado.module.css'
export default function Paginado({videosPerPage,allVideos,paginado}){
const pageNumber=[]
for(let i=1;i<=Math.ceil(allVideos/videosPerPage);i++){
pageNumber.push(i)
}

return(
<nav>
<ul className={formatList.numeros}><a className={formatList.letras}>Páginas:</a>   
    {pageNumber&&pageNumber.map(number=>(//genera un link a cada numero de pagina,
    // y podemos pasar a la pagina directamente
    //poner classneme al li!!!
        <li key={number} className={formatList.lista}>
            <a href="# " onClick={()=>paginado(number)}>{number}</a>
        </li>
    ))
    }
</ul>
</nav>
)
}