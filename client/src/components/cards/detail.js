import React ,{useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import {Link} from'react-router-dom'
import { getDetail, cleanDetail} from "../../actions";
import detailFormat from'./detail.module.css'

export default function  Detail(){
const { id} = useParams();
const dispatch= useDispatch()

useEffect(()=>{
   dispatch(cleanDetail())
 dispatch(getDetail(id))
},[dispatch,id])
const myVideo= useSelector((state)=>state.detail)

return(
<div className={detailFormat.detailBody}>
       <p></p>
        Detalle de Videogames
        <p></p>
        <div className={detailFormat.detailCard} >
        <Link to='/home' ><button className={detailFormat.closeIcon}title="Volver a Home">X</button></Link> 
        {
           myVideo.length>0?
        <div >
        <div className={detailFormat.detailTitle} > {myVideo[0].name}</div>
        <img src={myVideo[0].background_image } alt='' width="150" height="100"></img>
        <div className={detailFormat.detailData}>
        <h2>Descripción: </h2><h3 className={detailFormat.detailData}>{myVideo[0].description}</h3>
        <h2>Rating: <div className={detailFormat.numberDetail}>{myVideo[0].rating}</div> </h2>

 
        <h2>Plataformas  : </h2><h4>{myVideo[0].createdInDb===undefined?  myVideo[0].platforms.join(", ")
                                        :myVideo[0].platforms.map(el=><p key={el}>{el} </p>)}</h4>
        <h2>Genero/s:
        </h2><h4>{myVideo[0].createdInDb===undefined?  myVideo[0].genres.join(", ")
                                        :myVideo[0].genres.map(el=><p key={el.name}>{el.name} </p>)}</h4>

        
        </div>

        </div>
                    : <p className={detailFormat.loading}>Loading..</p>
    }
    </div>
</div>
)
}
