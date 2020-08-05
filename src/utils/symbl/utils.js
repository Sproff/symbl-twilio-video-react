export const getAccessToken = async ({appId, appSecret}) => {
    return await postData('https://api.symbl.ai/oauth2/token:generate', {
        type: 'application',
        appId,
        appSecret
    });

}

/**
 *
 * @param url
 * @param data
 * @param options
 * @return {Promise<any>}
 */
export const postData = async (url = '', data = {}, options = { credentialsInHeader: false }) => {
    const {credentialsInHeader, appId, appSecret, accessToken} = options;

    const headers = {};

    if (credentialsInHeader && appId) {
        headers['x-app-id'] =  appId;
    }

    if (credentialsInHeader && appSecret) {
        headers['x-app-secret'] =  appSecret;
    }

    if (!credentialsInHeader && accessToken) {
        headers['x-api-key'] =  accessToken;
    }

    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
};