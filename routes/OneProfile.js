const fs = require('fs');
module.exports = {
editProfile: (req, res) => {
        let userId = req.params.id;
        let query = "SELECT * FROM `users` WHERE id = '1' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('OneProfile.ejs', {
                title: "Display User"
                ,user: result[0]
                ,message: ''
            });
        });
    }
};