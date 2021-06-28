const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const users = require('../data/users');
const {v4:uuid} = require('uuid');
const jsonParser = bodyParser.json();
var isBodyValid = true;
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
    if(Object.keys(req.body).length > 0) {
      if(req.body.id){
        return res.status(400).json({
          message: "Id not required. It will be auto-generated.",
          success: false,
        });
      }
      jsonObj = {
        "id": uuid(),
        "lastName": "",
        "firstName": "",
        "email": "",
        "title": "",
        "picture": ""
      };
      validateBody(req, jsonObj);
      if(!isBodyValid){
        return res.status(400).json({
          message: "JSON value is empty.",
          success: false,
        });
      }
      users.push(jsonObj);
      return res.status(201).json({
        message: "User added",
        success: true,
      });
    }
    return res.status(400).json({
      message: "Request Body is empty.",
      success: false,
    });
  });
  router.put('/update/:id', jsonParser, (req, res) => {
    const result = users.filter(jsonObj => {
      if(Object.keys(req.body).length > 0) {
        if(jsonObj.id === req.params.id){
          if(req.body.id && req.params.id !== req.body.id){
            return res.status(400).json({
              message: "id value mismatch for request parameter and request body!",
              success: false,
            });
          }
          validateBody(req, jsonObj);
          if(!isBodyValid){
            return res.status(400).json({
              message: "JSON value is empty.",
              success: false,
            });
          }
          return res.status(200).json({
            message: "User updated",
            success: true,
          });
        }
      }
      else{
        return res.status(400).json({
          message: "Request Body is empty.",
          success: false,
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

function validateBody(req, jsonObj){
  if(req.body.lastName != undefined && req.body.lastName !== ''){
    isBodyValid = true;
    jsonObj.lastName = req.body.lastName;
  }
  else if (req.body.lastName === ''){
    isBodyValid = false;
  }
  if(req.body.firstName != undefined && req.body.firstName !== ''){
    jsonObj.firstName = req.body.firstName;
    isBodyValid = true;
  }
  else if (req.body.firstName === ''){
    isBodyValid = false;
  }
  if(req.body.email != undefined && req.body.email !== ''){
    jsonObj.email = req.body.email;
    isBodyValid = true;
  }
  else if (req.body.email === ''){
    isBodyValid = false;
  }
  if(req.body.title != undefined && req.body.title !== ''){
    jsonObj.title = req.body.title;
    isBodyValid = true;
  }
  else if (req.body.title === ''){
    isBodyValid = false;
  }
  if(req.body.picture != undefined && req.body.picture !== ''){
    jsonObj.picture = req.body.picture;
    isBodyValid = true;
  }
  else if (req.body.picture === ''){
    isBodyValid = false;
  }
}
module.exports = router;
