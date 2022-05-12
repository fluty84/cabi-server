const LunchService = require('./lunch.service')
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process')
const rl = readline.createInterface({ input, output })
const Async = require('async');

// Async.series([

//     rl.question('Insert number of Eaters => ', (number) => {
//        LunchService.generateEaters(number);
//     }),

//     rl.question('Insert number of Restaurants => ', (number) => {
//        LunchService.generateRestaurants(number)
//     })

// ], () => {
//     rl.close();
//     runSomeOtherModuleNow();
// })



Promise.all([
    rl.question('Insert number of Restaurants => ', (numberRest) => {
        LunchService.createRestaurant(numberRest)
        rl.close()
    }),

    rl.question('Insert number of Eaters => ', (number) => {
        LunchService.generateEaters(number)
        rl.close()
    })

])
