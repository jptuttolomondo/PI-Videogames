
const initialState={
videogames:[],
detail:[],
copiaVideogames:[],
genres:[],
filters:[],
order:[],
platforms:[],
auxiliar:[],
search:[]

}
function rootReducer(state=initialState,action){
switch(action.type){
 case 'GET_ALL_VIDEOGAMES': 
 if(state.auxiliar.length<1){console.log('video por if',state.videogames)
 return{...state,videogames:action.payload,copiaVideogames:action.payload}}
else {console.log('video por else',state.videogames)
  
  return{...state,videogames:action.payload}}



 case 'FILTER_BY_GENRE': 
 
 //const filtrado=state.filters
 
const allVideos=state.copiaVideogames

const genreFiltered=action.payload==='All'?allVideos:allVideos.filter(elem =>

{
  for(let i=0;i<elem.genres.length;i++){
    if(elem.genres[i].name===action.payload) return true
  }
  return undefined
}
)

return {...state,order:genreFiltered,auxiliar:genreFiltered}




case 'FILTER_CREATED': 
if(state.auxiliar.length<1){
  const filterCreated=action.payload==='created'?state.copiaVideogames.filter(el=>el.createdInDb):state.copiaVideogames.filter(el=>!el.createdInDb)
                        return{
                          ...state,videogames:action.payload==='All'?state.videogames:filterCreated
                        }
}
else{
  
  const filterCreated=action.payload==='created'?state.auxiliar.filter(el=>el.createdInDb):state.auxiliar.filter(el=>!el.createdInDb)
  return{ ...state,order:action.payload==='All'?state.auxiliar:filterCreated}
}
                      

case 'ORDER_BY_NAME': 
if(state.auxiliar.length<1){

let sortedArray=action.payload==='asc'?state.copiaVideogames.sort(function(a,b){

  if(a.name>b.name)return 1 //1 a va para atras
  if(b.name>a.name)return -1 // a va para adelante, noo hace nada
  return 0; //son iguales,queda igual
  })
  :
  state.videogames.sort(function(a,b){
    if(a.name>b.name)return -1
    if(b.name>a.name)return 1
    return 0;
    })
return{...state,order:sortedArray}

}
else{

  let sortedArray=action.payload==='asc'?state.auxiliar.sort(function(a,b){

    if(a.name>b.name)return 1 //1 a va para atras
    if(b.name>a.name)return -1 // a va para adelante, noo hace nada
    return 0; //son iguales,queda igual
    })
    :
    state.auxiliar.sort(function(a,b){
      if(a.name>b.name)return -1
      if(b.name>a.name)return 1
      return 0;
      })
  return{...state,order:sortedArray}
  


  
}

case'ORDER_BY_RATING':
if(state.auxiliar.length<1){
let sortedRating=action.payload==='RatingAsc'?state.copiaVideogames.sort(function(a,b){
  if(a.rating>b.rating)return 1
  if(b.rating>a.rating)return -1
  return 0;
  })
  :
  state.videogames.sort(function(a,b){
    if(a.rating>b.rating)return -1
    if(b.rating>a.rating)return 1
    return 0;
    })
return{...state,order:sortedRating}
  }
else{

  let sortedRating=action.payload==='RatingAsc'?state.auxiliar.sort(function(a,b){
    if(a.rating>b.rating)return 1
    if(b.rating>a.rating)return -1
    return 0;
    })
    :
    state.auxiliar.sort(function(a,b){
      if(a.rating>b.rating)return -1
      if(b.rating>a.rating)return 1
      return 0;
      })
  return{...state,order:sortedRating}

}






case 'GET_NAME_VIDEOGAME': return{...state,search:action.payload}
case 'GET_GENRES': return{...state,genres:action.payload}
case 'POST_VIDEOGAME': return{...state}
case 'GET_PLATFORMS':return {...state,platforms:action.payload}
case 'GET_DETAIL': return  {...state,detail:action.payload}
case 'CLEAN_DETAIL': return{...state,detail:action.payload}
case 'CLEAN_SEARCH':return{...state,search:action.payload}
case 'CLEAN_STATES': return{...state,filters:action.payload,
                                      search:action.payload,
                                      detail:action.payload,
                                      order:action.payload,
                                      auxiliar:action.payload}
  default:return state 
}
}


export default rootReducer






/*case 'FILTER_BY_PLATFORM': 
const allVideos1=state.copiaVideogames

const     platformFiltered=action.payload==='seleccionar'?allVideos1:allVideos1.filter(elem => 

{

  for(let i=0;i<elem.platforms.length;i++){

    if(elem.createdInDb===true&&elem.platforms[i]===action.payload) return true
    if(elem.platforms[i].name===action.payload) return true
  }

  return undefined
}
)
    //console.log(allVideos1)
return {...state,videogames:platformFiltered}
*/