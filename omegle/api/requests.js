class Requests {
    constructor(debug) {
        this.debug = debug;
    }

    message(status, url, method) {
        if (status === 200) {
            console.log(`\x1b[0;32m${method.toUpperCase()}:\x1b[0m ${url} | Status: ${status}`);
        } else {
            console.log(`\x1b[0;31m${method.toUpperCase()}:\x1b[0m ${url} | Status: ${status}`);
        }
    }

    async get(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (this.debug) this.message(response.status, url, "get");
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
        if (this.debug) {
            if (response.status === 200) {
                console.log(`\x1b[0;32mPOST:\x1b[0m ${url} | Status: ${response.status.toString()}`);
            } else {
                console.log(`\x1b[0;31mPOST:\x1b[0m ${url} | Status: ${response.status.toString()}`);
            }
        }
        return response;
    }
}
