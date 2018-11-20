module.exports ={
    leaderBoard: (req, res) => {
    let userId = req.params.userId;
    let query =  "SELECT * FROM `projecteuler` ORDER BY points DESC"; 

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('AllUsers.ejs', {
                title: "Welcome to Euler Project | Edit User Profile"
        ,users : result
            });
        });
    },
};
