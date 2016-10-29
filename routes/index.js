var express = require('express');
var router = express.Router();

var GitApp = require('../server/gitapp');

/* GET home page. */
router.get('/', function(req, res, next) {

    // The user is null for the website doesn't load the element div container.
    res.render('index', { user: null, userNotFound: false});
});

/* POST method route */
router.post('/', function (req, res) {
	console.log('======= ROUTER.POST ======= ');
	var username = req.body.search;
	if(username != ''){
        var gitApp = new GitApp();
        // Search user
        gitApp.searchUser(username, function(err,user){
            if(!err) {
                // Search Projects
                gitApp.searchProjects(username, function(err,projects){
                    if(!err) {
                        console.log('Route Callback data = ' + user);
                        console.log('Route Callback projects = ' + projects.length);
                        res.render('index', {user: user, projects: projects, userNotFound: false});
                    }
                });
            } else {
                res.render('index', {user: null, projects: null, userNotFound: true});
            }
        });
	}
});


module.exports = router;
