const { createEquilibratedGroups, createManyRestaurants, createManyEaters } = require('./utils')


const suma = (a, b) => {
    return a + b;
}


const createRandomRestaurants = () => {
    const randomRestaurantsNumber = Math.floor(Math.random() * (50 - 1)) + 1

    return createManyRestaurants(randomRestaurantsNumber)
}

const createRandomPeople = () => {
    const randomPeopleNumber = Math.floor(Math.random() * (300 - 1)) + 1

    return createManyEaters(randomPeopleNumber)
}

const areEquilibrated = (restaurants, people) => {
    
    let equilibrated = true

    const randomRestaurants = restaurants
    const randomPeople = people

    console.log('tested ', randomRestaurants.length, ' restaurants & ', randomPeople.length, 'people')

    const randomTestGroups = createEquilibratedGroups(randomRestaurants, randomPeople)

    const eatersLength = []
    randomTestGroups.forEach(elm => eatersLength.push(elm.eaters.length))

    eatersLength.forEach(elm => {

        if (eatersLength.findIndex(number => number == elm + 2) != -1 ||
            eatersLength.findIndex(number => number == elm - 2) != -1) {

            equilibrated = false
        }
    })

    return equilibrated
}



module.exports = {suma, createRandomPeople, createRandomRestaurants, areEquilibrated};