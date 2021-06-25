const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const users = require('../data/users');
const jsonParser = bodyParser.json();
try{
  router.get('/users', (req, res) =>{
    if(!users || !users.length){
      return res.status(404).json({
        message: "Users not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Users retrieved",
      success: true,
      data: users
    });
  });
  router.post('/add', jsonParser, (req, res) => {
    users.push(req.body);
    return res.status(200).json({
      message: "User added",
      success: true,
    });
  });
  router.put('/update/:id', jsonParser, (req, res) => {
    const result = users.filter(jsonObj => {
      if(jsonObj.id === req.params.id && jsonObj.id === req.body.id){
          jsonObj.lastName = req.body.lastName;
          jsonObj.firstName = req.body.firstName;
          jsonObj.email = req.body.email;
          jsonObj.title = req.body.title;
          jsonObj.picture = req.body.picture;
          return res.status(200).json({
            message: "User updated",
            success: true,
          });
        }
    });
    if(!result || !result.length){
      return res.status(404).json({
        message: "User not found for update",
        success: false,
      });
    }
  });
  router.get('/user/:id', (req, res) => {
    const result = users.filter(jsonObj => {
      if(jsonObj.id === req.params.id){
        return jsonObj;
      }
    });
    if(!result || !result.length){
      return res.status(404).json({
        message: "User not found with id",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User retrieved",
      success: true,
      data: result
    });
  });
}
catch(err){
  return res.status(500).json({
    message: "Internal server error",
    success: false,
  });
}
module.exports = router;
