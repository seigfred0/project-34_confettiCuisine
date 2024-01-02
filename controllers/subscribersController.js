const mongoose = require('mongoose');
const Subscriber = require("../models/subscriber");
const subscriber = require('../models/subscriber');

// exports.getAllSubscribers = (req, res, next) => {
//     Subscriber.find({})
//         .then(subscribers => {
//             req.data = subscribers;
//             next();
//         })
//         .catch(error => {
//             next(error);
//         });
// };

exports.getAllSubscribers = (req,res) => {
    Subscriber.find({}).exec().then((subscribers) => {
        res.render("subscribers", {
            subscribers: subscribers
        });
    }).catch((error) => {
        console.log(error.message);
        return [];
    }).then(() => {
        console.log("promise complete");
    });
}


exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};


// exports.saveSubscriber = async (req, res) => {
//     try {
//         let newSubscriber = new Subscriber({
//             name: req.body.name,
//             email: req.body.email,
//             zipCode: req.body.zipCode
//         });

//         await newSubscriber.save();
//         res.render("thanks");
//     } catch (error) {
//         res.send(error);
//     }
// };

exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });

    newSubscriber.save()
        .then(() => {
            res.render("thanks");
        })
        .catch(error => {
            res.send(error); 
        });
};


