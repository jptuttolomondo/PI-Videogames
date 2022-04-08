import React, {useState } from 'react'
import {useEffect } from 'react'
import {useDispatch,useSelector} from'react-redux'
import {Link} from'react-router-dom'
import { getAllVideogames,filterVideosByGenre,filterCreated,orderByName,
    getGenres, getPlatforms,orderByRating,cleanStates } from '../../actions'
import Card from '../cards/card'
import Paginado from './paginado'
import SearchBar from '../searchBar/seachBar'
import homeStyles from'./home.module.css'

export  function Home (){
const dispatch=useDispatch()

//--------estados---------
var allVideos=useSelector((state)=>state.videogames)
//var todosVideos=allVideos
const filters=useSelector((state)=>state.filters)
const sort=useSelector((state)=>state.order)
var searchState=useSelector((state)=>state.search)
const genres=useSelector((state)=>state.genres)
const [order,setOrder]=useState('')


//---------paginado-------

const [currentPage,setCurrentPage]=useState(1)
const [videosPerPage]=useState(15)
const indexOfLastVideo= currentPage* videosPerPage
const indexOfFirstVideo=indexOfLastVideo-videosPerPage

//------------manejo de estados-------
if(sort.length>0)allVideos=sort
else if(filters.length>0)allVideos=filters
      if(searchState.length>0)allVideos=searchState

 //--------paginacion -----------     
const currentVideos=allVideos.slice(indexOfFirstVideo,indexOfLastVideo)
const paginado= (PageNumber)=>{
setCurrentPage(PageNumber)
}
//----------------
useEffect(()=>{
    dispatch(getAllVideogames()) 
    dispatch(getGenres())
    dispatch(getPlatforms())
},[dispatch]) //suscripto a actualizaciones de dispatch. []solo cuando renderice


function handleClick(e){
  //console.log('ccargarvideogame')
  e.preventDefault(); 
  dispatch(getAllVideogames())  
 dispatch(cleanStates())
}

function handleFilterByGenre(e){
 dispatch(filterVideosByGenre(e.target.value))  
 setCurrentPage(1)
}





function handleFilterCreated(e){
    e.preventDefault();
    if(e.target.value==="All") dispatch(getAllVideogames())
     dispatch(filterCreated(e.target.value))
     setCurrentPage(1)

}
function handleOrderByName(e){
    e.preventDefault();
   if(e.target.value==="all") dispatch(getAllVideogames())
      dispatch(orderByName(e.target.value))  
   setOrder(`Ordenado ${e.target.value}`) 
   setCurrentPage(1)
}


function handleOrderByRating(e){
    e.preventDefault();
      if(e.target.value==="all") dispatch(getAllVideogames())
      dispatch(orderByRating(e.target.value))  
     setOrder(`Ordenado ${e.target.value}`) 
    // console.log(order)
   setCurrentPage(1)
 }

return(
        <div className={homeStyles.fondo}> 
         <div className={homeStyles.h1}>Home de videogames</div>

           <label className={homeStyles.h2}>Ordenar A-Z</label>
            <select onChange={e=> handleOrderByName(e)} className={homeStyles.box}>
            <option value="all" className={homeStyles.hbox} >Sin Ordenar</option>
        <option value="asc" className={homeStyles.hbox}>Ordenar videogames ascendente</option>
        <option value="desc" className={homeStyles.hbox}>Ordenar videogames descendente</option>
         </select>

         <label className={homeStyles.h2}>Ordenar por Rating</label>
            <select onChange={e=> handleOrderByRating(e)} className={homeStyles.box}>
            <option value="all" className={homeStyles.hbox} >Sin Ordenar</option>
         <option value="RatingAsc" className={homeStyles.hbox}>Ordenar por Rating ascendente</option>
        <option value="RatingDesc" className={homeStyles.hbox}>Ordenar por Rating Descendente</option>
         </select>
    
            <label className={homeStyles.h2}>Filtrar por genero</label>
            <select onChange={e=> handleFilterByGenre(e)} className={homeStyles.box}>
            <option value='seleccionar' className= {homeStyles.hbox}>seleccionar</option>
        {genres.map((el)=>(
         <option value={el.name} key={el.id}  className={homeStyles.hbox}>{el.name} </option> 
              ))}
            </select>

  
            <label className={homeStyles.h2}>Filtrar por Origen</label>
            <select onChange={e=>handleFilterCreated(e)} className={homeStyles.box}>
            <option value="All"  className={homeStyles.hbox}>All</option>
            <option value="created"  className={homeStyles.hbox}>Created</option>
            <option value="api"  className={homeStyles.hbox}>existente</option>
            </select>

                <p></p>
            <SearchBar/>
             <button onClick={e=>handleClick(e)} className={homeStyles.button1}><div className={homeStyles.hbutton}>Cargar videogames</div></button> 
            <Link to='/videogames'><button  className={homeStyles.button1}><div className={homeStyles.hbutton}>Crear Videogames</div></button>
            </Link>
            <Link to='/'><button  className={homeStyles.button1}><div className={homeStyles.hbutton}>Volver a LandPage</div></button>
            </Link>

            <Paginado videosPerPage={videosPerPage}
            allVideos={allVideos.length}
            paginado={paginado}
            currentPage={currentPage}
            />
        

            <div className={homeStyles.containerCard}>
            { 
                    currentVideos?.map(e=>{
                        return(
                      <div key={e.id} className={homeStyles.cards}>
                              <Link to={'/videogame/'+ e.id}> 
                                <Card name={e.name} image={e.background_image} genres={e.genres.map(
                                elem=>(elem.name ) )   } key={e.id} /> </Link>
                        </div>  
                     )
                     })
            }
           </div>
        </div>
)
    }



    /*      <label className={homeStyles.h2}>Filtrar por plataforma</label>
            <select onChange={e=> handleFilterByPlatform(e)} className={homeStyles.box}>
            <option value='seleccionar'  className={homeStyles.hbox} >seleccionar</option>
        {platforms.map((el)=>(
         <option value={el} key={el}  className={homeStyles.hbox}>{el} </option> 
              ))}
            </select>*/

            /*function handleFilterByPlatform(e){
     dispatch(filterVideosByPlatform(e.target.value))  
     setCurrentPage(1)
    }*/