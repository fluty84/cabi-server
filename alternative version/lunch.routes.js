const router = require("express").Router()
const { shuffle, createEquilibratedGroups } = require('../utils')


//---Models---//
const Eater = require('../models/eater.model')
const Group = require("../models/group.model")
const Restaurant = require("../models/restaurant.model")



router.get("/", (req, res) => {
    
    res.json("Cabify LunchService Backend")
})

///// Create Eaters /////

router.post('/eaters', (req, res) => {
   
    const { name, email } = req.body
    Eater
        .create({ name, email })
        .then(() => res.status(201).json(201))
        .catch((err) => res.status(500).json(err))
})


///// Get all Eaters /////

router.get('/eaters', (req, res) => {

    Eater
        .find()
        .then((eaters) => res.json(eaters))
        .catch((err) => res.status(500).json(err))

})


///// Delete all Eaters and Restaurants /////

router.delete('/eaters', (req, res) => {

    const promises = [
        Eater.deleteMany(),
        Restaurant.deleteMany()
    ]

    Promise.all(promises)
        .then(() => res.json({ message: "eaters and restaurants removed" }))
        .catch((err) => res.status(500).json(err))

})


///// Create Restaurant ////

router.post('/restaurants', (req, res) => {

    const { name, adress } = req.body

    Restaurant
        .create({ name, adress })
        .then(() => res.json({ message: "created" }))
        .catch((err) => res.status(500).json(err))
})


//// Get all Restaurants ////

router.get('/restaurants', (req, res) => {

    Restaurant
        .find()
        .then((restaurants) => res.json(restaurants))
        .catch((err) => res.status(500).json(err))

})


//// Create Group ////

router.post('/create_groups', (req, res) => {

    // Getting initial data from DB //
    let restaurants
    let cabiEaters
    let groupsHasAlreadyCreated = false 

    const promises = [
        Restaurant.find().populate('name').then(response => restaurants = response),
        Eater.find().then(response => cabiEaters = response),
        Group.find().then(response => groupsHasAlreadyCreate = response.length > 0 )
    ]

    Promise.all(promises)

        .then(() => {

            if (groupsHasAlreadyCreated) {
                res.json({ 
                    message: "groups already created" })
                return
            }

            if (cabiEaters.length / restaurants.length > 7) {
                res.json({ 
                    message: "sorry, too many people!! We can't handdle more than 7 eaters per group-restaurant" })
                return
            }
            shuffle(cabiEaters)
            
            const data = createEquilibratedGroups(restaurants, cabiEaters)
           
            Group
                .collection.insertMany(data)
                .then(() => res.json(data))
                .catch((err) => res.status(500).json(err))

        })
        .catch((err) => res.status(500).json(err))


})

///// Get Groups /////

router.get('/groups', (req, res) => {
    Group
        .find()
        .populate('restaurant')
        .populate('eaters')
        .populate('leader')
        .then(groups => res.json(groups))
        .catch((err) => res.status(500).json(err))
})

///// Clear Groups ///// Extra Feature!!! 

router.delete('/groups', (req, res) => {
    Group
        .deleteMany()
        .then(() => res.json({ message: "Groups removed, you can make-it again" }))
        .catch((err) => res.status(500).json(err))
})

module.exports = router