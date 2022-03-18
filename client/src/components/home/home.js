import React, { Fragment, useState } from 'react'
import {useEffect } from 'react'
import {useDispatch,useSelector} from'react-redux'
import {Link} from'react-router-dom'
import { getAllVideogames,filterVideosByGenre,filterCreated,orderByName } from '../../actions'
import Card from '../cards/card'
import Paginado from './paginado'
import SearchBar from '../seachBar'

export  function Home (){
const dispatch=useDispatch()
const allVideos=useSelector((state)=>state.videogames)


const [currentPage,setCurrentPage]=useState(1)
const [videosPerPage,setVideosPerPage]=useState(15)
const [order,setOrder]=useState('')
const [created,setCreated]=useState('')


const indexOfLastVideo= currentPage* videosPerPage
const indexOfFirstVideo=indexOfLastVideo-videosPerPage
const currentVideos=allVideos.slice(indexOfFirstVideo,indexOfLastVideo)
const paginado= (PageNumber)=>{
setCurrentPage(PageNumber)
}



useEffect(()=>{
    dispatch(getAllVideogames()) //despacha a la action invocada()

},[dispatch]) 

//el ,[] es para evitar un loop infinito de llamados
//si hay algo o no dentro del array depende de que necesite el useEffect. si depende del que ocurra o no 
//el dispatch, entonces dse pone ,[dispatch]. sino se deja vacio
//puede depender de otro estado. si ese estado existe, que se haga el useEffect. en ese caso
//se popne el estado en el array.
function handleClick(e){
  e.preventDefault(); // el preventDefault en la funcion, no en el formulario
  dispatch(getAllVideogames())  //carga todo de nuevo

}

function handleFilterByGenre(e){
//console.log('target: ',e.target.value)
 dispatch(filterVideosByGenre(e.target.value))   
}

function handleFilterCreated(e){
    e.preventDefault();
    if(e.target.value==="All") dispatch(getAllVideogames())
     dispatch(filterCreated(e.target.value))
     setCurrentPage(1)

}
function handleOrderByName(e){
    e.preventDefault(); // el preventDefault en la funcion, no en el formulario
   // dispatch(getAllVideogames())
   console.log(e.target.value)
   if(e.target.value==="all") dispatch(getAllVideogames())
      dispatch(orderByName(e.target.value))  
       
   setOrder(`Ordenado ${e.target.value}`) 
   setCurrentPage(1)
   console.log(order)

 
   
    

}

return(
        <div>
        <Link to='/videogames'>Crear un videojuego</Link>
        <h1>home de videogames</h1>
    <button onClick={e=>handleClick(e)}>cargar videogames</button>


            <select onChange={e=> handleOrderByName(e)}>
            <option value="all">Sin Ordenar</option>
        <option value="asc">Ordenar videogames ascendente</option>
        <option value="desc">Ordenar videogames descendente</option>
            </select>

            <select onChange={e=> handleFilterByGenre(e)}>
            <option value="All">All</option>
            <option value="Action">Action</option>
            <option value="Shooter">Shooter</option>
            <option value="Adventure">Adventure</option>
            </select>

            <select onChange={e=>handleFilterCreated(e)}>
            <option value="All">All</option>
            <option value="created">Created</option>
            <option value="api">existente</option>

            </select>
            <Paginado videosPerPage={videosPerPage}
            allVideos={allVideos.length}
            paginado={paginado}
            />
            <SearchBar/>
            { 
                    currentVideos?.map(e=>{
                        return(
                      <div key={e.id}>
                                <Link to={'/videogame/'+ e.id}>
                                 
                <Card name={e.name} image={e.background_image} genres={e.genres.map(
                    elem=>(elem.name ) )   } key={e.id} /> 
            </Link>
                     </div>
                     )
                        //console.log(e.name)
            })
        }
        </div>



)





    }



