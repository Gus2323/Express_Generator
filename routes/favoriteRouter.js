const express = require("express");
const cors = require("./cors");
const authenticate = require("../authenticate");
const Favorite = require("../models/favorite");

const favoriteRouter = express.Router();

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) =>
    res.sendStatus(200)
  )
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id })
      .populate("user")
      .then((user) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
      .then((favorite) => {
        if (favorite) {
          req.body.forEach((campFavorite) => {
            if (!favorite.campsites.includes(campFavorite._id)) {
                favorite.campsites.push(campFavorite._id);
            }
          });
          favorite
            .save()
            .then((fav) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(fav);
            })
            .catch((err) => {
              next(err);
            });
        } else {
          Favorite.create({ user: req.user._id, campsites: req.body })
            .then((campsite) => {
              console.log("Campsite Created", campsite);
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(campsite);
            })
            .catch((err) => {
              next(err);
            });
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {})
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    (req, res, next) => {}
  );

favoriteRouter
  .route("/:campsiteId")
  .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) =>
    res.sendStatus(200)
  )
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {})
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {})
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {})
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    (req, res, next) => {}
  );

module.exports = favoriteRouter;
