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











/*const paginado = actualState.slice(currentPage, currentPage +12)

  let nextPage = () => {
        if (actualState.length <= currentPage + 12) {
          setCurrentPage(currentPage);
        } else setCurrentPage(currentPage + 12);
      };

<button onClick={nextPage}>  {'>Siguiente'}   </button>

paginado.map (e=>(  //ver si solo son uno o dos tipos o hay que usar map para mostra
 <div className="pokecards" key={e.id}>  
      <h3>Pokemon: {e.name}</h3> 
        <h4>ID: {e.id} </h4>
     
        <h4>Type:  {e.type[0]}<p>{e.type[1]}</p>
        </h4>
         <NavLink to={`/pokemonsDetail/${e.id}`}>  < img src= {e.sprites} width="200" height="150" alt="imagen"/></NavLink> 
        
     </div> ))
     }*/