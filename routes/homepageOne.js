module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `users` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('headmain.ejs', {
                title: "Welcome to Euler Project | Edit User Profile"
        ,users: result
            });
        });
    },
};
