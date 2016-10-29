/******************************************
 *            Git App Class
 *
 *  Search user and projects
 *  Author: Andre Luiz Reis
 ******************************************/

var github = require('octonode');

///////////////////////////////////////////
//             CONSTRUCTOR
///////////////////////////////////////////
function GitApp() {
}

///////////////////////////////////////////
//               METHODS
///////////////////////////////////////////

/**
 * Search User
 * @param userName
 * @param callback
 * @returns {object} user object
 */
GitApp.prototype.searchUser = function (userName, callback) {
    console.log('***** Search User Method ******');
    console.log('Parameter =  ' + userName);

    // Remove spaces from the username
    userName = userName.replace(/\s/g, '');

    // Create client to access GitHub API
    var client = github.client();

    client.get(`/users/${userName}`, {}, function (err, status, body, headers) {

        // If body is undefined, return error.
        if (body == null) {
            console.log('Error. User Body is undefined.');
            // Return user error
            callback(err, null);
            return;
        }

        // User object with the result data
        var userObj = {
            avatar_url: body.avatar_url,
            name: body.name,
            login: body.login,
            html_url: body.html_url,
            location: body.location,
            email: body.email,
            blog: body.blog,
            company: body.company,
        };

        // Return user object
        callback(null, userObj);
    });
};

/**
 * Search Projects
 * @return {object} projects array
 * @param userName
 * @param callback
 */
GitApp.prototype.searchProjects = function (userName, callback) {
    console.log('***** Search Projects Method ******');
    console.log('Parameter =  ' + userName);

    // Remove spaces from the username
    userName = userName.replace(/\s/g, '');

    var client = github.client();

    client.get(`https://api.github.com/users/${userName}/repos`, {}, function (err, status, body, headers) {

        // If body is undefined, return error.
        if (body == null) {
            // Return error
            callback(err, null);
            return;
        }

        // Project Array
        var projects = [];

        for (var i = 0; i < body.length; i++) {

            // Object with project properties
            var projectObj = {
                name: body[i].name,
                html_url: body[i].html_url,
                description: body[i].description,
                language: body[i].language,
                stargazers_count: body[i].stargazers_count,
                watchers_count: body[i].watchers_count,
                forks_count: body[i].forks_count,

            };
            projects.push(projectObj);
        }
        projects.sort(compare);

        // Return projects array
        callback(null, projects);
    });
};

/**
 * Compare the number of forks.
 * Sort for the highest fork project.
 * @param a
 * @param b
 * @returns {number}
 */
function compare(a, b) {
    if (a.forks_count > b.forks_count)
        return -1;
    if (a.forks_count < b.forks_count)
        return 1;
    return 0;
}

///////////////////////////////////////////
//             EXPORT CLASS
///////////////////////////////////////////
module.exports = GitApp;