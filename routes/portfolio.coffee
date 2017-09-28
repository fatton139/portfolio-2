express = require 'express'
router = express.Router()
database = require '../routes/database'
async = require 'async'

router.get '/', (req, res, next) ->
  db = database.getDb()
  colDatas = []
  db.collection('collection').find({
    featured: 'true'
  }).toArray (err, collections) ->
    async.each collections, (colData, callback) ->
      if colData.parentTeam
        db.collection('team').find({
          _id: database.getId colData.parentTeam
        }).toArray (err, teamData) ->
          colData.parentTeamData = teamData[0]
          colDatas.push(colData)
          callback()
      else
        colDatas.push(colData)
        callback()
    , (err) ->
      if err then throw err
      res.render 'portfolio', {
        title: 'AXISIO'
        selectedCollections: colDatas.reverse()
      }

module.exports = router