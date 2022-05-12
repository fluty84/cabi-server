const { createManyRestaurants, createManyEaters, createEquilibratedGroups } = require('./utils')

const { areEquilibrated, createRandomPeople, createRandomRestaurants } = require('./functionTestUtils')

test("CreateEquilibratedGroups => Groups's arrays of eaters has the same length +/- 1", () => {
    expect(areEquilibrated(createRandomRestaurants(), createRandomPeople())).toBe(true)
})

test("CreateEquilibratedGroups => If there are more Restaurants than Eaters, don't create empty groups", () => {
    expect(areEquilibrated(createManyRestaurants(40), createManyEaters(5))).toBe(true)
})

test(`CretaeEquilibratedGroups => 
    if receives => 

    restaurants = [{
        name:"testTaurant",
        adress:"C/ test nº0"
    }]
    eaters = [{
        name:"test1",
        email:"test@email.com"
    }] 

    returns => 

    [{
        restaurant:"testTaurant",
        leader:"test1"
        eaters:[tesTaurant]
    }]`
    , () => {
        const restaurants = [{
            name: "testTaurant",
            adress: "C / test nº0"
        }]
        const eaters = [{
            name: "test1",
            email: "test@email.com"
        }]
        const expectedReturn = [{
            restaurant: "testTaurant",
            leader: "test1",
            eaters: ["test1"]
        }]
        expect(createEquilibratedGroups(restaurants, eaters)).toMatchObject(expectedReturn)
    })
