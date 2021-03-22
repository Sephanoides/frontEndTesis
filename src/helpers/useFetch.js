const baseUrl = process.env.REACT_APP_API_URL

export const fetchSinToken = ( endpoint, data, method = 'GET') =>{

    const url = `${baseUrl}/${endpoint}`;

    if( method === 'GET'){
        return fetch( url );
    }else{
        return fetch( url, {
            method,
            body: data
            // headers:{
            //     // 'Content-type': 'application/json'
            //     'Content-type': 'multipart/form-data'
            // },
            // body: JSON.stringify( data )
        });
    }

}