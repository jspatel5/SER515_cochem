module.exports = {
    goBack: (req, res) => {
        let query = "SELECT * FROM `projecteuler` ORDER BY userId ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('headmain.ejs', {
                title: "Welcome to Euler Project | Edit User Profile"
        ,projecteuler: result
            });
        });
    },
};
