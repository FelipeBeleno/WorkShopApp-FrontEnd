const baseURL = process.env.REACT_APP_API_URL
//'https://work-shop-app.herokuapp.com' 


export const rutasSinToken = (endpoint, data, peticion = 'GET') => {
    const url = `${baseURL}${endpoint}`   ///login

    if (peticion === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method: peticion,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

export const rutasConToken = (endpoint, data, peticion = 'GET') => {
    const url = `${baseURL}${endpoint}`   ///login

    if (peticion === 'GET') {
        return fetch(url, {
            method: peticion,
            headers: {
                token: localStorage.getItem('token') || ''
            }
        });
    } else {
        return fetch(url, {
            method: peticion,
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token') || ''
            },
            body: JSON.stringify(data)
        })
    }
}
