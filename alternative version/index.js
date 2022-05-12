module.exports = {
    shuffle: (array) => { // Fisher-Yates Algoritm //
        let currentIndex = array.length, randomIndex

        while (currentIndex != 0) {

            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]]
        }

        return array
    } ,

    createEquilibratedGroups: (restaurants, people) => {
        
        const extraEatersCount = people.length % restaurants.length
        const groupMinSize = (people.length - extraEatersCount) / restaurants.length
        const extraEaters = []
        const payload = []

        // selecting the excess of people to be distributed //

        for (let i = 0; i < extraEatersCount; i++) {
            extraEaters.push(people[people.length - extraEatersCount + i].name)
        }

        // creating one group for each restaurant //

        let round = 0

        restaurants.forEach((place, idx) => {

            const eaters = []
            const restaurant = place._id

            console.log(place)

            let counter = round

            for (let i = 0; i < groupMinSize; i++) {

                eaters.push(people[counter]._id)

                counter++
            }
            // distributing excess people //
            if (extraEaters[idx]) {
                eaters.push(extraEaters[idx])
            }
            // making one eater per group a random leader //
            const leader = eaters[Math.floor(Math.random() * eaters.length)]

            round += groupMinSize

            payload.push({ restaurant, leader, eaters })
           
        })
        
        return payload
    },

    createManyEaters(number){
        const eaters = []

        for (let i = 0; i < number; i++) {
            eaters.push({ name: `person${i+1}`, email: `email${i+1}@cabify.com` })
        }
        
        return eaters
    },

    createManyRestaurants(number) {
        const restaurants = []

        for (let i = 0; i < number; i++) {
            restaurants.push({ name: `Restaurant ${i+1}`, adress: `C/del desencanto nº${i+1}, Madrid` })
        }

        return restaurants
    }
}