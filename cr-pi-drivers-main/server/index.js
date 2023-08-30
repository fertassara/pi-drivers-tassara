const app = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 5000;

// conn.sync({ force: true }).then(() => {
// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// })
// }).catch(error => console.error(error))


conn.sync({ force: true }) // Esto sincronizará y creará las tablas en la base de datos
  .then(() => {
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });