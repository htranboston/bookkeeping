class APIHandler {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    callAPI(endpoint, data, method='GET') {
        const url = `${this.baseURL}${endpoint}`;
        
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url);
            
            // Set headers for JSON data
            if (data && method !== 'GET') {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }
            
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject({
                        status: xhr.status,
                        message: xhr.statusText
                    });
                }
            };
            
            xhr.onerror = () => {
                reject({
                    status: xhr.status,
                    message: xhr.statusText
                });
            };
            
            // Send the request with JSON data if method is not GET
            if (data && method !== 'GET') {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }
        });
    }
    
    get(endpoint) {
        return this.callAPI(endpoint);
    }
    
    post(endpoint, data) {
        return this.callAPI(endpoint, data, 'POST');
    }
    
    put(endpoint, data) {
        return this.callAPI(endpoint, data, 'PUT');
    }
    
    delete(endpoint) {
        return this.callAPI(endpoint, null, 'DELETE');
    }
}