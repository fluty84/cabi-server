const LunchService = (require('./test-lunch.service'))

test("CLEAN BBDD BEFORE START => erase all documents responds 200",
    () => {
        Promise.all([
            LunchService.deleteEatersAndRestaurants(),
            LunchService.deleteGroups(),])
            .then(response => expect(response[0].status).toBe(200))
    }
)

test("API IS RUNNING => Call '/' with GET method returns 201 'Cabify LunchService Backend'",
    async () => {

        const response = await LunchService.getApi()
        expect(response.data).toBe("Cabify LunchService Backend")
    }
)

test("CREATE EATER => Call '/eaters' with POST method returns number 201",
    async () => {
        const name = "eater1"
        const email = "email@email.com"

        const response = await LunchService.createEater(name, email)
        expect(response.data).toBe(201)
    }
)

test("GET EATERS => Call '/eaters' whith GET method returns an array of objects with keys 'name' and 'email'",
    async () => {
        const response = await LunchService.getAllEaters()
        response.data.forEach(element => {
            expect(Object.keys(element)).toContain("name")
            expect(Object.keys(element)).toContain("email")
        })

    }
)

test("CREATE RESTAURANT => Create new restaurant returns {message:'created'}",
    async () => {
        const name = "eater1"
        const adress = "email@email.com"

        const response = await LunchService.createRestaurant(name, adress)
        expect(response.data).toMatchObject({ message: "created" })
    }
)

test("GET RESTAURANTS => Call '/restaurants' whith GET method returns an array of objects with keys 'name' and 'adress'",
    async () => {
        const response = await LunchService.getAllRestaurants()
        response.data.forEach(element => {
            expect(Object.keys(element)).toContain("name")
            expect(Object.keys(element)).toContain("adress")
        })
    }
)

test("DELETE EATERS & RESTAURANTS => Call '/eaters' with DELETE method returns {message: 'eaters and restaurants removed'}",
    async () => {
        const response = await LunchService.deleteEatersAndRestaurants()
        expect(response.data).toMatchObject({ message: "eaters and restaurants removed" })

    }
)

test("GET GROUPS => Call '/groups' with method GET before create groups, returns {message: 'group not created yet'}",
    async () => {
        const response = await LunchService.getGroups()

        expect(response.data).toMatchObject({ message: 'group not created yet' })
    }
)

test("CREATE GROUPS => Call '/create_groups' with method POST returns one array of objects with keys 'leader', 'eaters' & 'restaurant'",
    async () => {
        Promise.all = [LunchService.generateEaters(9), LunchService.generateRestaurants(3), LunchService.deleteGroups()]

        const response = await LunchService.generateGroups()

        response.data.forEach(element => {
            expect(Object.keys(element)).toContain("leader")
            expect(Object.keys(element)).toContain("eaters")
            expect(Object.keys(element)).toContain("restaurant")
        })
    }
)

test("GET GROUPS => Call '/groups' with method GET returns one array of objects with keys 'leader', 'eaters' & 'restaurant'",
    async () => {
        const response = await LunchService.getGroups()

        response.data.forEach(element => {
            expect(Object.keys(element)).toContain("leader")
            expect(Object.keys(element)).toContain("eaters")
            expect(Object.keys(element)).toContain("restaurant")
        })
    }
)

test("CAN'T CREATE GROUPS IF THERE ARE GROUPS CREATED => if there are groups, response error 401 {message: 'groups already created'}",

    async () => {

        await LunchService.generateGroups().catch(error => {

            expect(error).toBeInstanceOf(Error)
            expect(error.message).toMatch(new RegExp('Request failed with status code 401'))
            expect(error.response.statusText).toBe("groups already created")
        })

    }

)

test("DELETE GROUPS => Call '/groups' with method DELETE returns {message: 'Groups removed, you can make-it again'}",
    async () => {
        const response = await LunchService.deleteGroups()
        expect(response.data).toMatchObject({ message: "Groups removed, you can make-it again" })
    }
)

test("GROUPS MAX SIZE 7=> if try to create groups bigger than 7 people, response error 401 {message: 'groups already created'}",
    async () => {

        Promise.all = [LunchService.generateEaters(50), LunchService.generateRestaurants(1)]

        await LunchService.generateGroups().catch(error => {

            expect(error).toBeInstanceOf(Error)
            expect(error.message).toMatch(new RegExp('Request failed with status code 402'))
            expect(error.response.statusText).toBe("Sorry, can't handdle more than 7 people per restaurant")
        })
    }
)


