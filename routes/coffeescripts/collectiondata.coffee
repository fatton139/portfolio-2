express = require 'express'
router = express.Router()
database = require '../routes/database'
item = require '../routes/item'
db = null

router.post '/new', (req, res, next) ->
  req.body._id = database.getId()
  showcase = req.body.showcase == 'true'
  req.body.itemType = 'collection'
  db.insertOne(req.body).then () ->
    if showcase
      database.generateShowcase 'collections', req.params.id, req.body
    res.redirect 'back'

router.post '/getData', (req, res, next) ->
  database.getDb().collection('collection').findOne({'_id': database.getId req.body.id}).then (result) ->
    res.send result

router.post '/delete', (req, res, next) ->
  database.getDb().collection('item').updateMany(
    {
      'parentCollection': req.body.id
    },
    {
      $set: { 
        'parentCollection': ''
        }
    }
  ).then () ->
      db.deleteOne({'_id': database.getId req.body.id}).then () ->
        res.send true

router.post '/update/:id', (req, res, next) ->
  showcase = req.body.showcase == 'true'
  db.updateOne(
    {'_id': database.getId req.params.id},
    {$set: req.body}
  ).then () ->
    if showcase
      database.generateShowcase 'collections', req.params.id, req.body
    res.redirect 'back'

router.get '/', (req, res, next) ->
  if express().get('env') == 'development'
    db = database.getDb().collection('collection')
    db.find({}).toArray (err, collections) ->
      database.getDb().collection('team').find({}).toArray (err, teams) ->
        res.render 'collectiondata',
          collectionKeys: Object.keys(collections)
          collections: collections,
          teamKeys: Object.keys(teams),
          teams: teams
  else 
    err = new Error('Forbidden')
    err.status = 403
    next(err)
    
module.exports = router