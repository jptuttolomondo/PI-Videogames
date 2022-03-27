
const initialState={
videogames:[],
detail:[],
copiaVideogames:[],
genres:[],
platforms:[]
}
function rootReducer(state=initialState,action){
switch(action.type){
 case 'GET_ALL_VIDEOGAMES':  return{...state,videogames:action.payload,copiaVideogames:action.payload}

 case 'FILTER_BY_GENRE': //la logica va antes del return. adentro del return se rompe
const allVideos=state.copiaVideogames//cuando haya filtrado y vuelva a enderizar, vuelve a tomar el estado original, no los filtrados
//console.log('payload: ',action.payload)
//console.log('allvideo [0] genres[0]:',allVideos[0].genres[0].name)
const genreFiltered=action.payload==='All'?allVideos:allVideos.filter(elem =>

{
  for(let i=0;i<elem.genres.length;i++){
    if(elem.genres[i].name===action.payload) return true
  }
  return undefined
}
)
//console.log(genreFiltered)
return {...state,videogames:genreFiltered}


case 'FILTER_BY_PLATFORM': //la logica va antes del return. adentro del return se rompe
const allVideos1=state.copiaVideogames//cuando haya filtrado y vuelva a enderizar, vuelve a tomar el estado original, no los filtrados
console.log('payload: ',action.payload)
//console.log('allvideo [0] genres[0]:',allVideos[0].genres[0].name)
const     platformFiltered=action.payload==='seleccionar'?allVideos1:allVideos1.filter(elem => 

{
  console.log(elem.platforms)
  console.log(action.payload)
  console.log('createInDb:',elem.createdInDb,'elem.platforms[0].name:',elem.platforms[1])
  for(let i=0;i<elem.platforms.length;i++){
    if(elem.createdInDb===true&&elem.platforms[i]===action.payload) return true
    if(elem.platforms[i].name===action.payload) return true
  }
  return undefined
}
)
//console.log(platformFiltered)
return {...state,videogames:platformFiltered}


case 'FILTER_CREATED': 
                        const filterCreated=action.payload==='created'?state.copiaVideogames.filter(el=>el.createdInDb):state.copiaVideogames.filter(el=>!el.createdInDb)
                        return{
                          ...state,videogames:action.payload==='All'?state.videogames:filterCreated
                        }

case 'ORDER_BY_NAME': console.log(state.videogames)
let sortedArray=action.payload==='asc'?state.copiaVideogames.sort(function(a,b){
  if(a.name>b.name)return 1
  if(b.name>a.name)return -1
  return 0;
  })
  :
  state.videogames.sort(function(a,b){
    if(a.name>b.name)return -1
    if(b.name>a.name)return 1
    return 0;
    })
return{...state,copiaVideogames:sortedArray}


case'ORDER_BY_RATING':let sortedRating=action.payload==='RatingAsc'?state.copiaVideogames.sort(function(a,b){
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
return{...state,copiaVideogames:sortedRating}


case 'GET_NAME_VIDEOGAME': return{...state,videogames:action.payload}
case 'GET_GENRES': return{...state,genres:action.payload}
case 'POST_VIDEOGAME': return{...state}
case 'GET_PLATFORMS':return {...state,platforms:action.payload}
case 'GET_DETAIL': return{...state,detail:action.payload}

  default:return state 
}
}


export default rootReducer
