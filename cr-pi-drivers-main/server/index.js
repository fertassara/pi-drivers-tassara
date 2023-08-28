const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 5000;

conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
