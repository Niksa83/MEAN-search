'use strict';
// CALL THE PACKAGES ----------------------------------------------------
let Hero = require('../models/hero'),
    config = require('../../config');
    
	/*
	* Export our route logic
	* accept (app, express) from server.js file
	**/
	module.exports = function(app,express) {

		const apiRouter = express.Router();

			/* ==================================================
			* Our routes that end in /heroes/search?name={req.query.name}
			* ==================================================
			**/			
			apiRouter.route('/heroes/search')
				.get( function(req,res){
					let heroName = req.query.name;

					Hero.find(
						// search inside multiple fields in our DB (case insensitive)
						{'$or':[
							{'nick':new RegExp(heroName,'i')},
							{'name':new RegExp(heroName,'i')}
						]})
					.limit(5)
					.exec(function(err, heroes){
						if(err) res.send(err);
						res.json(heroes);
					});

				}); //.get  

		// RETURN apiRouter with  routes
		return apiRouter;

	}; 
