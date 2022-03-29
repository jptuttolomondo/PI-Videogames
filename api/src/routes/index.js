require("dotenv").config();
const { APIKEY } = process.env;
const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const router = Router();


//------------------------------------------------------
const getApiInfo = async () => {
  let promises = [];
  let allGames = [];
  try {
    let url = `https://api.rawg.io/api/games?key=${APIKEY}`;
    for (let i = 0; i < 5; i++) {
      let apiVideo = await axios.get(url).then((response) => {
        return response;
      });
      promises = promises.concat(apiVideo);
      url = apiVideo.data.next;
    }

    await Promise.all(promises).then((response) => {
      for (let i = 0; i < promises.length; i++) {
        allGames = allGames.concat(
          response[i].data.results.map((el) => {
            return {
              id: el.id,
              name: el.name,
              released: el.released,
              genres: el.genres.map((e) => {
                return { name: e.name };
              }),
              platforms: el.platforms.map((e) => {
                return { name: e.platform.name };
              }),
              rating: el.rating,
              background_image: el.background_image,
            };
          })
        );
      }
    });

    return allGames;
  } catch (error) {
    console.log(error);
  }
};
//-------------------------------------------------------
const getDbInfo = async () => {
  return await Videogame.findAll({
    include: {
      //trae el modelo genre mediante el atributo name
      model: Genre,
      attributes: ["name"],
      througth: {
        //mediante los atributos, traeme el name. sino traeria solo name porque es el unico, pero
        //si hubiera mas atributos podria traer mas
        attributes: [],
      },
    },
  });
};
//-------------------------------------------------------

const getAllVideogames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;


};
//-------------------------------------------------------
router.get("/videogames", async (req, res) => {
  const name = req.query.name;
  const infoTotal = await getAllVideogames();
  if (name) {
    let videoNames = await infoTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    videoNames.length
      ? res.status(200).send(videoNames)
      : res.status(400).send("no existe el videogame");
  } else {
    res.status(200).send(infoTotal);
  }
});
//-------------------------------------------------------

const getInfoById = async function (idGame) {
  const apiUrl = await axios.get(
    `https://api.rawg.io/api/games/${idGame}?key=${APIKEY}`
  );
  let array = [];
  let e = {
    id: apiUrl.data.id,
    name: apiUrl.data.name,
    released: apiUrl.data.released,
    background_image: apiUrl.data.background_image,
    rating: apiUrl.data.rating,
    platforms: apiUrl.data.parent_platforms.map((e) => e.platform.name),
    genres: apiUrl.data.genres?.map((e) => e.name),
    description: apiUrl.data.description,
  };
  array.push(e);
  return array;
};

//-------------------------------------------------------
router.get("/genres", async (req, res) => {
  const genreApi = await axios.get(
    `https://api.rawg.io/api/genres?key=${APIKEY}`
  );
  const genero = genreApi.data.results.map((e) => e.name);
  genero.forEach((el) => {
    Genre.findOrCreate({
      where: { name: el },
    });
  });
  const allGenres = await Genre.findAll();
  res.send(allGenres);
});
//-------------------------------------------------------

router.get("/platforms", async (req, res) => {
  const platformApi = await axios.get(
    `https://api.rawg.io/api/platforms?key=${APIKEY}`
  );
  const plataforma = platformApi.data.results.map((e) => e.name);
  console.log(plataforma);
  res.send(plataforma);
});

//-------------------------------------------------------

router.post("/videogame", async (req, res) => {
  let {
    name,
    description,
    released,
    platforms,
    rating,
    background_image,
    genres,
    createdInDb,
  } = req.body;
  console.log("datos :", req.body);
  let videogameCreated = await Videogame.create({
    //creo en el modelo Videogame una instancia de videogame
    name,
    description,
    released,
    platforms,
    rating,
    background_image,
    createdInDb, //no le pasa genres porque hay que hacer la relacion aparte
  });
  let genreDb = await Genre.findAll({
    where: { name: genres }, //genero hay que encontrarlo en el modelo de bd que ya esta guyardado
    //y que coincida con el seleccionado en el formulario de front, que sera genres
  });
  videogameCreated.addGenre(genreDb);
  res.send("videogame creado correctamente");
});

//-------------------------------------------------------

router.get("/videogame/:id", async (req, res) => {
  let id = req.params.id;
  let videosTotal;
  console.log(id)
  
  if(id.includes('-')===false) videosTotal = await getInfoById(id);
  
else{ let fromDb=await getDbInfo()
  console.log('get from db:',fromDb)
        videosTotal=fromDb.filter(elem=>elem.id===id)
console.log(videosTotal)
}
videosTotal.length? res.status(200).json(videosTotal)
                     : res.status(404).send("videogame no encontrado");
});
//-------------------------------------------------------

async function deleteGame(id){


console.log('id de function',id)

await Videogame.destroy({
  where:{id:id},
  include:{
    model: Genre,
    attributes:['name']
  }
})

}

router.delete('/delete/:id',async (req,res)=>{
let id=req.params.id
console.log(id)
deleteGame(id)
res.send('videogame borrado correctamente')
})

module.exports = router;
