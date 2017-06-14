import 'whatwg-fetch'
import {parseString} from 'xml2js'


const getDefaultHeaders = () =>
    // new Headers  // this is what the spec says, but it works without and is easer to test
    ({
        "X-Requested-With": "XMLHttpRequest"   // Need this to get authorisation failure as redirects to authAjax
    })


const jsonHeaders = () => ({
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


export const fetchXml= (url, config = {}) =>
    fetch(url, {...config})
        .then(handleFetchErrors)
        .then(response => response.text())
        .then(xml => parseString(xml, (err, result) => {
            if (err) {
                Promise.reject(err);
            } else {
                Promise.resolve(result);
            }
        }))


export const fetchJson = (url, config = {}) =>
    fetch(url, {
        ...config,
        credentials: 'same-origin',
        headers: getDefaultHeaders()
    })
        .then(handleFetchErrors)
        .then(response => response.json())


export const postJson = (url, body, config = {}) =>
    fetchJson(url, {
        ...config,
        method: 'POST',
        headers: {...body.headers, jsonHeaders},
        body: JSON.stringify(body)
    })


export const fetchXmlAction = (url, actionType) => dispatch =>
    fetchXml(url)
        .then(
            xml => dispatch({type: actionType.SUCCESS}),
            err => dispatch({type: actionType.FAILURE})
        )
