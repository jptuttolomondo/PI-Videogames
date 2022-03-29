import React from "react";
import formatList from'./paginado.module.css'
export default function Paginado({videosPerPage,allVideos,paginado}){
const pageNumber=[]

for(let i=1;i<=Math.ceil(allVideos/videosPerPage);i++){
pageNumber.push(i)
}

return(
<nav>
<ul className={formatList.numeros}><p className={formatList.letras}>Páginas:</p>   
    {pageNumber&&pageNumber.map(number=>(
           <li key={number} className={formatList.lista}>
            <a href="# " onClick={()=>paginado(number)}>{number}</a>
        </li>
    ))
    }
</ul>
</nav>
)
}