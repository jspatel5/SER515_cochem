module.exports = {
    editProfile: (req, res) => {
    let userId = req.params.id;
    let query =  "SELECT * FROM `users` ORDER BY id ASC"; 

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('AllUsers.ejs', {
                title: "Welcome to Euler Project | Edit User Profile"
        ,users: result
            });
        });
    },
};
