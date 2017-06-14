
const jsonHeaders = ({
    'Content-Type': 'application/json'
})


const handleFetchErrors = response => {
    if (response.ok) {
        return Promise.resolve(response)
    }
    if (response.status === "401" || response.status === "403") {
        window.location = window.location   // TODO: this one (sometimes) fail after re-login by showing ajax response
                                            //      to the user.
                                            //      Maybe better to send off a new action, this creates a coupling
                                            //      from util to action, which feels weird. Think a bit....
    }
    return Promise.reject({status: response.status, statusText: response.statusText})
}


export const fetchJson = (url, config = {}) =>
    fetch(url, {...config})
        .then(handleFetchErrors)
        .then(response => response.json())


export const postJson = (url, body, config = {}) =>
    fetchJson(url, {
        ...config,
        method: 'POST',
        headers: {...body.headers, jsonHeaders},
        body: JSON.stringify(body)
    })


export const fetchAction = (url, actionType) => dispatch =>
    fetchJson(url)
        .then(
            body => dispatch({type: actionType.SUCCESS, body}),
            err => dispatch({type: actionType.FAILURE})
        )
