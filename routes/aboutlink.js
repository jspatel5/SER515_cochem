module.exports = {
    aboutPage: (req, res) => {
             
            res.render('about.ejs', {
                title: "Welcome to Euler Project | Edit User Profile"
            });
        },

    };