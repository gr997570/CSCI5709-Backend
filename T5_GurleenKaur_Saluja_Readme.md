# Tutorial 5

* Date Created: 26 06 2021
* Last Modification Date: 26 06 2021
* Application URL: https://csci5709-tutorial-backend.herokuapp.com/
* GitHub URL: https://github.com/gr997570/CSCI5709-Backend

## Authors

* Gurleen Kaur Saluja(gr997570@dal.ca) - Collaborator / Maintainer

## Getting Started

### Prerequisites

To have a local copy of this lab / assingnment / project up and running on your local machine, you will first need to install the following software / libraries / plug-ins

1. [Node v6.14.12](https://nodejs.org/en/)
2. [NPM v14.16.1](https://nodejs.org/en/)
3. [Express v14.17.1](https://www.npmjs.com/package/express)  (Using CLI: npm install express)
4. [Node Body Parser](https://www.npmjs.com/package/body-parser) (Using CLI: npm install body-parser)
5. [Postman](https://www.postman.com/downloads/)

See the following section for detailed step-by-step instructions on how to install this software / libraries / plug-ins

### Installing

A step by step series of examples that tell you how to get a development env running

1. Checkout the code from GitHub.
2. Open CLI on the source package which contains package.json and run npm install to install all the dependencies.	
3. Run npm start on local. The application should start at port 8080 which is configured in index.js file.

```
Hit the following URLs with the given request methods.

GET		https://csci5709-tutorial-backend.herokuapp.com/users
This will display list of all users.

PUT		https://csci5709-tutorial-backend.herokuapp.com/update/:id
This will display the user having the id given in the request parameter.

POST	https://csci5709-tutorial-backend.herokuapp.com/add
This will add the details of user passed in request body.

GET		https://csci5709-tutorial-backend.herokuapp.com/user/:id
This will fetch the user with particular id passed in request parameter.

Please note, for POST request, id will be auto-generated otherwise 400 will be returned.
```

## Deployment

## Sources Used

The below sources were referred for this tutorial:

- [Tutorial 5](https://dal.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=8095b86d-3584-4a62-8326-ad4f014362e4&start=undefined)
- [Express Body Parser](http://expressjs.com/en/resources/middleware/body-parser.html)
- [Express API](http://expressjs.com/en/api.html)

### users.js
Lines 7 - 19
---------------

```
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
```

The code above was created by adapting the code in [Tutorial 5](https://dal.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=8095b86d-3584-4a62-8326-ad4f014362e4&start=undefined) as shown below: 

```
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
```

- The code by [Tutorial 5](https://dal.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=8095b86d-3584-4a62-8326-ad4f014362e4&start=undefined) was implemented/shared by Aadesh Shah

- [Tutorial 5](https://dal.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=8095b86d-3584-4a62-8326-ad4f014362e4&start=undefined)'s code was used to refer how GET method in node.js can be implemented.

- [Tutorial 5](https://dal.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=8095b86d-3584-4a62-8326-ad4f014362e4&start=undefined)'s code was modified by Gurleen Kaur Saluja.


Lines 20 - 26
---------------

```
router.post('/add', jsonParser, (req, res) => {
	users.push(req.body);
	return res.status(200).json({
		message: "User added",
		success: true,
	});
});
```

The code above was created by adapting the code in [Express Body Parser](http://expressjs.com/en/resources/middleware/body-parser.html) as shown below: 


```
// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  // create user in req.body
})
```

- The code by [Express Body Parser](http://expressjs.com/en/resources/middleware/body-parser.html) was implemented/shared by Express.js official website.

- [Express Body Parser](http://expressjs.com/en/resources/middleware/body-parser.html)'s code was used to refer how POST method in node.js can be implemented.

- [Express Body Parser](http://expressjs.com/en/resources/middleware/body-parser.html)'s code was modified by Gurleen Kaur Saluja.


Line 48
---------------

```
router.get('/user/:id', (req, res)
```

The code above was created by adapting the code in [Express API](http://expressjs.com/en/api.html) as shown below: 


```
app.get('/user/:id', function (req, res, next)
```

- The code by [Express API](http://expressjs.com/en/api.html) was implemented/shared by Express.js official website.

- [Express API](http://expressjs.com/en/api.html)'s code was used to refer how id can be passed as a request paramter to a method in node.js.

- [Express API](http://expressjs.com/en/api.html)'s code was modified by Gurleen Kaur Saluja.