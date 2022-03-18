require('dotenv').config();
const {APIKEY} = process.env;

const { Router } = require('express');

const axios=require('axios');
const {Videogame,Genre}=require('../db')
const router = Router();


const getApiInfo= async()=>{
let promises=[]
let allGames=[]
try{
// for(let i=1;i<6;i++){
//      promises.push( axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=${i}`)
//      .then((response)=>{ return response  }) )
//     }//for

            let url = `https://api.rawg.io/api/games?key=${APIKEY}`;
           for(let i =0;i<5;i++){
               let apiVideo = await axios.get(url)
               .then((response)=>{ return response  })
               promises = promises.concat(apiVideo);
                 url=apiVideo.data.next;
              
             }

    await Promise.all(promises)
            .then((response)=>{
                    for(let i=0;i<promises.length;i++){
                        allGames=allGames.concat(response[i].data.results.map(el=>{
                            return{
                                id:el.id,
                                name:el.name,
                                released:el.released,
                                genres:el.genres.map(e=>{return{name:e.name}}),
                                platforms:el.platforms.map(e=>{return{name:e.platform.name}}),
                                rating:el.rating,
                                background_image:el.background_image
                            }
                        }))
                    }  
            })

            console.log(allGames.length)
return allGames
}//try

catch(error){console.log(error)}
}




const getDbInfo= async ()=> {
return await Videogame.findAll({
include:{//trae el modelo genre mediante el atributo name
    model:Genre,
    attributes:['name'],
    througth:{//mediante los atributos, traeme el name. sino traeria solo name porque es el unico, pero
        //si hubiera mas atributos podria traer mas
        attributes:[],
    }
}
})
}


const getAllVideogames= async()=>{
    const apiInfo = await getApiInfo();
    const dbInfo= await getDbInfo();
   const infoTotal= apiInfo.concat(dbInfo)
    return infoTotal
}


router.get('/videogames',async (req,res)=>{
const name=req.query.name
console.log('name  :',name)
const infoTotal=await getAllVideogames()
//console.log(infoTotal)
if(name) {let videoNames= await infoTotal.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()))
videoNames.length?res.status(200).send(videoNames)
                :res.status(400).send('no existe el videogame')}
else{res.status(200).send(infoTotal)}

})


router.get('/genres',async(req,res)=>{
const genreApi= await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`)
//console.log('genreApi: ',genreApi.data.results.map(e=>e.name))
const genero=genreApi.data.results.map(e=>e.name)
console.log('generos: ',genero)
// const generoEach=genero.map(e=>{
//     for (let i=0;i<e.length;i++)return e[i] 
// })

// //ver el .flat de video de selene
 //console.log(generoEach)
genero.forEach(el => {
    Genre.findOrCreate({
        where: {name:el}
    })
});
console.log('guardado')
const allGenres= await Genre.findAll()
res.send(allGenres)
})

router.get('/platforms',async(req,res)=>{
    const platformApi= await axios.get(`https://api.rawg.io/api/platforms?key=${APIKEY}`)
    const plataforma=platformApi.data.results.map(e=>e.name)
    console.log(plataforma)
res.send(plataforma)
})




router.post('/videogame',async (req,res)=>{
let {
    name,
    description,
    released,
    platforms,
    rating,
    background_image,
    genres,
    createdInDb
}=req.body
console.log('datos :',req.body)
let videogameCreated=await Videogame.create({//creo en el modelo Videogame una instancia de videogame
    name,
    description,
    released,
    platforms,
    rating,
    background_image,
    createdInDb//no le pasa genres porque hay que hacer la relacion aparte
})
console.log('videogame creado: ',videogameCreated)
let genreDb= await Genre.findAll({
    where:{name:genres}//genero hay que encontrarlo en el modelo de bd que ya esta guyardado
    //y que coincida con el seleccionado en el formulario de front, que sera genres 
})

videogameCreated.addGenre(genreDb)
res.send('videogame creado correctamente')
})


router.get('/videogame/:id',async(req,res)=>{

let id=req.params.id
let videosTotal= await getAllVideogames()
if(id){ let videogameId=await videosTotal.filter(e=>e.id==id)
        videogameId.length?res.status(200).json(videogameId)
                        : res.status(404).send ('videogame no encontrado')}
})

module.exports = router;
