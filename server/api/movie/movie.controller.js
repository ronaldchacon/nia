'use strict';

var _ = require('lodash');
var Movie = require('./movie.model');
var canistreamit = require('../../components/canistreamit');
var request = require('request');

// Get list of movies
exports.index = function(req, res) {
  Movie.find(function (err, movies) {
    if(err) { return handleError(res, err); }
    return res.json(200, movies);
  });
};

// Get a single movie
exports.show = function(req, res) {
  var id;
  var movieBasicInfo = canistreamit.searchByTitle(req.params.id)
    .then(function(data){
      return res.json(data);
  });

  // console.log(movie)
  // console.log(movie['year'])
  // var streaming_info = 
  // Movie.findById(req.params.id, function (err, movie) {
  //   if(err) { return handleError(res, err); }
  //   if(!movie) { return res.send(404); }
  //   return res.json(movie);
  // });
  // 51407f58f5f807a93a000004
};


exports.showMore = function(req, res) {
  var movieStreamingInfo = canistreamit.searchByID(req.params.id)
    .then(function(data){
      return res.json(data);
  });
};

// Creates a new movie in the DB.
exports.create = function(req, res) {
  Movie.create(req.body, function(err, movie) {
    if(err) { return handleError(res, err); }
    return res.json(201, movie);
  });
};

// Updates an existing movie in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Movie.findById(req.params.id, function (err, movie) {
    if (err) { return handleError(res, err); }
    if(!movie) { return res.send(404); }
    var updated = _.merge(movie, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, movie);
    });
  });
};

// Deletes a movie from the DB.
exports.destroy = function(req, res) {
  Movie.findById(req.params.id, function (err, movie) {
    if(err) { return handleError(res, err); }
    if(!movie) { return res.send(404); }
    movie.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}