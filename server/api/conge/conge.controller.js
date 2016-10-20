/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/conges              ->  index
 * POST    /api/conges              ->  create
 * GET     /api/conges/:id          ->  show
 * PUT     /api/conges/:id          ->  update
 * DELETE  /api/conges/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import moment from 'moment'
import {Conge} from '../../sqldb';
import {User} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Conges
export function index(req, res) {
  return Conge.findAll({
    include:{model:User , as:'worker'}
  })
    .then(results=>{
      results=JSON.parse(JSON.stringify(results));
      for(var i in results){
        results[i].startDate=moment(results[i].start).format("DD MMM YYYY");
        results[i].endDate=moment(results[i].end).format("DD MMM YYYY");
      }
      return results;
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Conge from the DB
export function show(req, res) {
  return Conge.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Conge in the DB
export function create(req, res) {
  return Conge.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Conge in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Conge.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Conge from the DB
export function destroy(req, res) {
  return Conge.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
