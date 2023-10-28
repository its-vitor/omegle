import Requests from './api/requests.js';

/**
 * Generates a random ID.
 * @returns {string} The generated random ID.
 */
async function generateRandomId() {
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
                this.waw4 = 'https://waw4.omegle.com/';
            }
        });

        this.chat = {
            startChat: async () => {
                if (!this.connection) await this.startConnection();
                return await this.post(this.apisUrls.front25 + "events", {
                    "id": this.central ? this.central : (() => {
                        throw new Error("You don't have a center to start a chat.");
                    })()
                })
            }
        }
    }

    /**
     * ### Starts the Omegle CHAT connection.
     * @param {string} cc - The cc value.
     * @returns {Promise} A Promise with the JSON response.
     */
    async startConnection(cc) {
        if (!this.connection) {
            this.connection = await this.post(this.apisUrls.waw4 + 'check').text;
        }

        const response = await this.post(this.apisUrls.front25 + 'start', {
            caps: 'recaptcha2,t3',
            firstevents: 1,
            spid: '',
            randid: this.connection ? this.connection : generateRandomId(),
            cc: cc,
            lang: this.language,
        });

        this.central = response.json['clientID'];
    }
}

(async () => {
    const omegle = new Omegle();
    await omegle.startConnection(); // Certifique-se de passar um valor válido de 'cc' se necessário
    const response = await omegle.chat.startChat();
    console.log(response); // Imprime a resposta
})();