const fs = require('fs');
module.exports = {
singleProfile: (req, res) => {
        let Id = req.params.userId;
        let query = "SELECT * FROM `projecteuler` WHERE userId = '" + Id + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('UserProfile.ejs', {
                title: "Display User"
                ,users: result[0]
                ,message: ''
            });
        });
    }
};