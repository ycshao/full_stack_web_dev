var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findOne({ postedBy: req.decoded._doc._id })
            .populate('postedBy')
            .populate('dishes')
            .exec(function (err, favorite) {
                if (err) throw err;
                res.json(favorite);
            });
    })

    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findOne({ postedBy: req.decoded._doc._id })
            .exec(function (err, favorite) {
                if (err) throw err;
                if (!favorite) {
                    Favorites.create(
                        {
                            postedBy: req.decoded._doc._id,
                            dishes: [req.body._id]
                        },
                        function (err, favorite) {
                            if (err) throw err;
                            console.log('Favorite created!');
                            var id = favorite._id;
                            res.writeHead(200, {
                                'Content-Type': 'text/plain'
                            });

                            res.end('Added the favorite with id: ' + id);
                        });
                }
                else if (-1 === favorite.dishes.indexOf(req.body._id)) {
                    favorite.dishes.push(req.body._id);
                    favorite.save(function (err, favorite) {
                        if (err) throw err;
                        console.log('Updated favorite!');
                        res.json(favorite);
                    });
                }
                else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });

                    res.end('Favorite was already added id: ' + req.body._id);
                }
            });
    })

    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findOneAndRemove({ postedBy: req.decoded._doc._id }, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

favoriteRouter.route('/:favoriteDishId')
    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findOne({ postedBy: req.decoded._doc._id })
            .exec(function (err, favorite) {
                if (err) throw err;

                if (favorite &&
                    -1 !== favorite.dishes.indexOf(req.params.favoriteDishId)) {
                    favorite.dishes.splice(favorite.dishes.indexOf(req.params.favoriteDishId), 1);
                    favorite.save(function (err, favorite) {
                        if (err) throw err;
                        console.log('Updated favorite!');
                        res.json(favorite);
                    });
                }
                else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });

                    res.end('No such favorite: ' + req.params.favoriteDishId);
                }
            });
    });

module.exports = favoriteRouter;