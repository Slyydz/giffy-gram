export const getUsers = () => {

    return fetch("http:localhost:8088/users")
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
        return parsedResponse;
    })
}

//Dad Joke Fetch Function
export const getJoke = () => {
    return fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json"
        }
    })
    .then(response => response.json())
    .then(parsedResponse => {
        console.log(parsedResponse.id,"\n", parsedResponse.joke);
    })
}



