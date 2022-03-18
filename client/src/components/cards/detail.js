import React ,{useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import {Link} from'react-router-dom'
import { getDetail } from "../../actions";


export default function  Detail(){
        const { id} = useParams();

const dispatch= useDispatch()

useEffect(()=>{

 dispatch(getDetail(id))

},[dispatch])

const myVideo= useSelector((state)=>state.detail)

function sacarPlataforma(elemento){
let aux=elemento.slice(elemento.indexOf("{")+2,elemento.indexOf(",")-1)+('   ') +elemento.slice(elemento.indexOf(",")+2,elemento.indexOf("}")-1)
return aux
}

return(
<div>
{
        myVideo.length>0?
        <div>
<h1> {myVideo[0].name}</h1>
<img src={myVideo[0].background_image }width="150" height="100"></img>
<h3>Descripcion: {myVideo[0].description}</h3>
<h3>rating: {myVideo[0].rating}</h3>
<h3>Plataformas  : {myVideo[0].createdInDb===true? sacarPlataforma(myVideo[0].platforms)
                        :myVideo[0].platforms.map(el=>el.name + (' '))}</h3>
<h3>Genero: { myVideo[0].genres.map(el=>el.name + (' '))} </h3>
        </div>
                    : <p>Loading..</p>
    }

    <Link to='/home' ><button>Volver</button></Link>
    </div>
)

}
/* ver con los creados
<h3>Genero: {!myVideo[0].createdDb?myVideo[0].genres[0].name+ ' ': myVideo[0].genres.map(el=>el.name + (' '))} </h3>
*/