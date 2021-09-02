import { getUsers } from "./data/DataManager.js";



const testArray = getUsers().then(apiUser => {
    apiUser.forEach(count => {
        console.log(count);
    })
});

 


