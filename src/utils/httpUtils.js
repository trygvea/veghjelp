
export const toHttpParams = (obj) =>
    Object.keys(obj).map( key => `${key}=${encodeURIComponent(obj[key])}`).join("&")

