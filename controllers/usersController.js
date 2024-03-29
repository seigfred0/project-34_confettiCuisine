const User = require("../models/user");

// module.exports = {
//     index: (req, res) => {
//         User.find({}).then(users => {
//             console.log("Users found:", users);
//             res.render("users/index", {
//                 users: users
//             })
//         }).catch(error => {
//             console.log(`Error fetching users: ${error.message}`)
//             res.redirect("/")
//         })
//     }
// }

module.exports = {
    index: (req, res, next) => {
        User.find().then(users => {
            res.locals.users = users;
            next();
        }).catch(error => {
            console.log(`error fetching users: ${error.message}`);
            next(error)
        })
    },
    indexView: (req,res) => {
        res.render("users/index");
    },
    new: (req, res) => {
        res.render("users/new");
    },
    create: (req, res, next) => {
        let userParams = {
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode
        };
        User.create(userParams).then(user => {
            res.locals.redirect = "/users";
            res.locals.user = user;
            next();
        }).catch(error => {
            console.log(error.message);
            next(error);
        });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId).then(user => {
            res.locals.user = user;
            next();
        }).catch(error => {
            console.log(error);
            next(error);
        })
    },
    showView: (req, res) => {
        res.render("users/show")
    },


    // update
    edit: (req,res,next) => {
        let userId = req.params.id
        User.findById(userId).then(user => {
            res.render("users/edit", {
                user: user
            })
        }).catch(error => {
            console.log(error.message);
            next(error);
        })
    },
    update: (req, res, next) => {
        let userId = req.params.id;
        let userParams = {
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode
        };

        User.findByIdAndUpdate(userId, {
            $set: userParams
        }).then(user => {
            res.locals.redirect = `/users/${userId}`;
            res.locals.user = user;
            next();
        }).catch(error => {
            console.log(error);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndDelete(userId).then(() => {
            res.locals.redirect = "/users";
            next();
        }).catch(error => {
            console.log(error.message);
            next();
        })
    }
}