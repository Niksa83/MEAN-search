'use strict';
// CALL THE PACKAGES ----------------------------------------------------
const express = require('express');
const app = express();
const config = require('./config');
const seedHeroes = require('./seed');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

	// APP CONFIGURATION ----------------------------------------------------
	// body parser helps us retrieve data from POST requests
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// configure our app to handle CORS requests (request from any domain) - will remove later
	 app.use(function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
		next();
	});
	 
	// log all requests to console
	app.use(morgan('dev'));

	// DB CONNECTION --------------------------------------------------------
    const options = { 
                    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
                }; 

    mongoose.connect(config.database, options);
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

	// seed our DB with some x-man using our seed.js file
	seedHeroes.seedDb();

    // point static path to client 
    app.use(express.static(path.join(__dirname, 'client/dist')));    

	// API ROUTES ------------------------------------------------------------
	let apiRoutes = require('./app/routes/api')(app, express);

	// OUR routes/api.js route file :p
	app.use('/api', apiRoutes);

    // Catch all other routes and return the index file from angular2
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/dist/index.html'));
    });  

// START THE SERVER
// =================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);