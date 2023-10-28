import Requests from './api/requests.js';

/**
 * Generates a random ID.
 * @returns {string} The generated random ID.
 */
function generateRandomId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    let id = '';
    for (let i = 0; i < 10; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

class Omegle extends Requests {
    /**
     * ### Omegle class constructor.
     * @param {boolean} debug - Indicates if debugging is enabled.
     * @param {boolean} exceptions - Indicates if exceptions are enabled.
     * @param {string} language - The language for the request, defaults to "pt".
     */
    constructor(debug = true, exceptions = true, language = "pt") {
        super(debug, exceptions);
        this.language = language;
        this.connection = null;
        this.central = null;
        this.apisUrls = new (class {
            constructor() {
                this.front25 = 'https://front25.omegle.com/';
                this.front23 = "https://front23.omegle.com/";
                this.waw4 = 'https://waw4.omegle.com/';
            }
        });

        this.chat = {
            startChat: async () => {
                if (!this.connection) await this.startConnection();
                return await this.post(this.apisUrls.front25 + "events", {
                    "id": this.central ? this.central : (() => {
                        throw new Error("You don't have a clientId to start a chat.");
                    })()
                })
            }
        }
    }

    /**
     * ### Starts the Omegle CHAT connection.
     * @returns {Promise} A Promise with the JSON response.
     */
    async startConnection() {
        if (!this.connection) {
            this.connection = (await (await this.post(this.apisUrls.waw4 + 'check')).text());
        }

        const response = await this.post(this.apisUrls.front25 + 'start', {
            caps: 'recaptcha2,t3',
            firstevents: 1,
            spid: '',
            randid: generateRandomId(),
            cc: this.connection,
            lang: this.language,
        });

        if (response) this.central = await(response).json()['clientID'];
        else (() => { throw new Error(`You did not receive your clientId. (${response.text()})`) })
    }
}