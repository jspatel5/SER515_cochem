module.exports = {
    getHomePage: (req, res) => {
             
            res.render('header.ejs', {
                title: "Welcome to Euler Project | Edit User Profile"
            });
        },

    };


