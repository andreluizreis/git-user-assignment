var express = require('express');
var router = express.Router();

var GitApp = require('../server/gitapp');

/* GET home page. */
router.get('/', function(req, res, next) {

    var user = null;
    res.render('index', { user: user});

    console.log('======= ROUTER.GET ======= ');
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
                        res.render('index', {user: user, projects: projects});
                    }
                });
            }
        });
	}
});


module.exports = router;
