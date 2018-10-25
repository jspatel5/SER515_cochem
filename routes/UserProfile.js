const fs = require('fs');
module.exports = {
singleProfile: (req, res) => {
        let userId = req.params.id;
        let query = "SELECT * FROM `users` WHERE id = '" + userId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('UserProfile.ejs', {
                title: "Display User"
                ,user: result[0]
                ,message: ''
            });
        });
    }
};