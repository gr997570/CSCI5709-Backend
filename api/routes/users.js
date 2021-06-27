const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const users = require('../data/users');
const {v4:uuid} = require('uuid');
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
    if(req.body.id){
      return res.status(400).json({
        message: "Id not required. It will be auto-generated.",
        success: false,
      });
    }
    jsonObj = {
      "id": uuid(),
      "lastName": req.body.lastName,
      "firstName": req.body.firstName,
      "email": req.body.email,
      "title": req.body.title,
      "picture": req.body.picture
    };
    users.push(jsonObj);
    return res.status(201).json({
      message: "User added",
      success: true,
    });
  });
  router.put('/update/:id', jsonParser, (req, res) => {
    const result = users.filter(jsonObj => {
      if(jsonObj.id === req.params.id){
        if(req.params.id !== req.body.id){
          return res.status(400).json({
            message: "id value mismatch for request parameter and request body!",
            success: false,
          });
        }
        if(req.body.lastName)
          jsonObj.lastName = req.body.lastName;
        if(req.body.firstName)
          jsonObj.firstName = req.body.firstName;
        if(req.body.email)
          jsonObj.email = req.body.email;
        if(req.body.title)
          jsonObj.title = req.body.title;
        if(req.body.picture)
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
