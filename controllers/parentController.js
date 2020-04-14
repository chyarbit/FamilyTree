const express = require('express');
const router = express.Router();
const db = require('../models');

// get routes
  // getAllParents
  router.get("/api/parents", (req,res)=>{
    db.Parent.findAll({})
      .then(results => res.json(results))
      .catch(error => res.json(error))
  })

  // getOnePair
  router.get("/api/parents/:id", (req, res)=>{
    db.Parent.findAll({
        where:{
            id: req.params.id
        }
    })
    .then(results => res.json(results))
    .catch(error => res.json(error))
  })

// getImmediateFamily: returns the immediate family for that parent id, includes parents and children
router.get("/api/parents/children/:id", (req, res)=>{
    db.Parent.findAll({
        where: {
            id: req.params.id
        },
        include: [db.Child]
    })
    .then(results => res.json(results))
    .catch(error => res.json(error))
})

// post routes
  // addParents
  router.post("/api/parents", (req,res) =>{
      db.Parent.create(req.body)
      .then(results => res.json(results))
      .catch(error => res.json(error))
  })

// update routes- backend only- not available on the front end
// If updating parent1, remember to reflect change in child table.
  // updateParents
  router.put("/api/parents/:id", (req,res) =>{
      db.Parent.update(req.body, {
          where: {
              id: req.params.id
          }
      })
      .then(results => res.json(results))
      .catch(error => res.json(error))
  })



module.exports = router;