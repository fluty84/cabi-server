const router = require("express").Router()

const {createManyEaters, createManyRestaurants, shuffle, createEquilibratedGroups} = require('../utils')

//---Models---//
const Eater = require('../models/__mock_models/__mock_eater.model')
const Restaurant = require("../models/__mock_models/__mock_restaurant.model")
const Group = require("../models/__mock_models/__mock_group.model")

//--Routes--//

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
        Restaurant.find().then(response => restaurants = response),
        Eater.find().then(response => cabiEaters = response),
        Group.find().then(response => groupsHasAlreadyCreated = response.length > 0)
    ]

    Promise.all(promises)

        .then(() => {

            if (groupsHasAlreadyCreated) {
                res.statusMessage = "groups already created"
                res.status(401).json({ message: "groups already created" }).end()

                return
            }

            if (cabiEaters.length / restaurants.length > 7) {
                res.statusMessage = "Sorry, can't handdle more than 7 people per restaurant"
                res.status(402)
                    .json({ message: "Sorry, can't handdle more than 7 people per restaurant" })
                    .end()
                return
            }

            if (!cabiEaters.length || !restaurants.length) {
                res.statusMessage = "Imposible to make groups without restarurants or eaters"
                res.status(403)
                    .json({ message: "Imposible to make groups without restarurants or eaters" })
                    .end()
                return
            }

            shuffle(cabiEaters)

            const groups = createEquilibratedGroups(restaurants, cabiEaters)

            Group
                .collection.insertMany(groups)
                .then(() => res.json(groups))
                .catch((err) => res.status(500).json(err))

        })
        .catch((err) => res.status(500).json(err))


})

///// Get Groups /////

router.get('/groups', (req, res) => {
    Group
        .find()
        .then(groups => {

            if (!groups.length) {
                res.json({ message: "group not created yet" })
            } else {
                res.json(groups)
            }
        })
        .catch((err) => res.status(500).json(err))
})

///// Clear Groups ///// Extra Feature!!! 

router.delete('/groups', (req, res) => {
    Group
        .deleteMany()
        .then(() => res.json({ message: "Groups removed, you can make-it again" }))
        .catch((err) => res.status(500).json(err))
})


//// Create multiple eaters ////

router.post('/many-eaters', (req, res)=>{
    
    const number = req.body.number

    const eaters = createManyEaters(number)

    Eater
        .collection.insertMany(eaters)
        .then(response => res.json(`Inserted ${response.insertedCount} eaters`))
        .catch((err) => res.status(500).json(err))

})

//// Create multiple restaurants ////

router.post('/many-restaurants', (req, res) => {

    const number = req.body.number

    const restaurants = createManyRestaurants(number)

    Restaurant
        .collection.insertMany(restaurants)
        .then(response => res.json(`Inserted ${response.insertedCount} restaurants`))
        .catch((err) => res.status(500).json(err))

})

module.exports = router