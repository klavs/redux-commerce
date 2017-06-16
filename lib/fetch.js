const parseJson = r => r.json()

const myFetch = (url, method = "GET", body) => fetch(url, {
    method,
    headers: {
        "Content-Type": "application/json"
    },
    body: body && JSON.stringify(body, null, 2)
})
.then(parseJson, parseJson)
.catch(err => Promise.reject(`Failed to parse response. ${err}`))

export default myFetch