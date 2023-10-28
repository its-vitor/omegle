class Requests {
    constructor(debug, exceptions) {
        this.debug = debug;
        this.exceptions = exceptions;
    }

    message(response, url, method) {
        if (response.status === 200) {
            console.log(`\x1b[0;32m${method.toUpperCase()}:\x1b[0m ${url} | Status: ${response.status}`);
        } else {
            console.log(`\x1b[0;31m${method.toUpperCase()}:\x1b[0m ${url} | Status: ${response.status}`);
            if ( exceptions) throw new Error(response.json)
        }
    }

    async get(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (this.debug) this.message(response, url, "get");
        return response;
    }

    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (this.debug) this.message(response, url, "post");
        return response;
    }
}

export default Requests;