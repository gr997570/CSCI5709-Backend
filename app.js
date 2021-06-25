const express = require('express');
const app = express();
/*app.use('/', (req, res)=>{
  res.status(200).json({
    message: "It works!"
  })
});*/
const userRoutes = require('./api/routes/users');
const rootRoute = "/";
app.use(rootRoute, userRoutes);
module.exports = app;
