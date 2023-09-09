
const axios = require('axios')
const { Driver } = require('../db')
const { Op } = require("sequelize");


//  PETICION A LA BASE DE DATOS  LOS 15 
const getByName = async (name) => {

   const nombresConverido= name.toUpperCase().charAt(0)+name.slice(1).toLowerCase();
   
   const buscadorDeName = await Driver.findAll({
      where: {
         forename: {
            [Op.iLike]: `%${name}%`
         }
      },
      limit: 15
   })
   const buscadorNameDb = buscadorDeName?.map(driver => driver.dataValues)
   console.log(buscadorNameDb)

//http://localhost:3001/drivers/search?name=lucas
   const URL = `http://localhost:5000/drivers?name.forename=${nombresConverido}`
   const data = (await axios.get(`${URL}`)).data
  
   if(data.length==0 && buscadorNameDb.length==0) throw Error (`el nombre no existe ${nombresConverido}`)
   
   const newData = data.map((elem) => ({
      id: elem.id,
      forename: elem.name.forename,
      surename: elem.name.surname,
      description: elem.description,
      image: elem.image.url,
      nationality: elem.nationality,
      dob: elem.dob,
      teams: elem.teams,
      created: false,
      
   }))
   
  
   const filtrado = newData.filter((driver) => driver.forename.toLowerCase() === name.toLowerCase())
     

   const completado = 15 - buscadorDeName.length
   const list15 = filtrado.slice(0,completado)

   return [...buscadorNameDb,...list15]

}

module.exports = { getByName }





// 