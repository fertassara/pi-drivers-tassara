// const axios = require("axios");
const server = require("../server/src/server.js");
const { getTeams } = require("./src/controllers/teamsController");
const PORT = 3001;
const { conn } = require('./src/db.js');


conn.sync({ alter: true  }).then( async () => {
  await getTeams();
  server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))

// -----------------------------------------------------

// conn.sync({ force: true  }).then( () => {
//   server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// })
// }).catch(error => console.error(error))

// -----------------------------------------------------
