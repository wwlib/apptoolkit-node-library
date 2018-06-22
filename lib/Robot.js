"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const events_1 = require("events");
const command_requester_1 = require("@jibo/command-requester");
const constants_1 = require("./constants");
/**
 * An API handle to a Jibo robot, used to request commands
 * @class Robot
 * @hideconstructor
 */
class Robot extends events_1.EventEmitter {
    /** @private */
    constructor(
    /**
     * The "friendly serial name" from the bottom of the robot,
     * e.g. My-Friendly-Robot-Name
     */
    serialName, tokenType, accessToken) {
        super();
        this.serialName = serialName;
        this.tokenType = tokenType;
        this.accessToken = accessToken;
    }
    /**
     * `true` if the app is currently connected to this robot
     * @method Robot#connected
     * @returns {boolean}
     */
    get connected() {
        return this._connected;
    }
    /**
     * A handle to the command requester for this robot
     * @method Robot#requester
     * @returns {CommandRequester}
     */
    get requester() {
        return this._requester;
    }
    /**
     * Establish a connection to this robot
     * @method Robot.connect
     */
    async connect() {
        if (this.connected) {
            await this.disconnect();
        }
        if (!this._ip) {
            await this._requestCertificate();
            await this._retrieveCertificate();
        }
        const options = {
            port: constants_1.PORT,
            key: this._key,
            cert: this._certificate,
            rejectUnauthorized: false,
            perMessageDeflate: false,
            fingerprint: this._fingerprint,
        };
        this._requester = new command_requester_1.CommandRequester();
        this._requester.disconnected.on(data => {
            this._connected = false;
            this.emit('disconnected', data);
            this.emit('status', 'disconnected');
        });
        return this._requester.connect(this._ip, options)
            .then(() => {
            this._connected = true;
            this.emit('status', 'connected');
        })
            .catch(err => { throw new Error(err.message); });
    }
    /**
     * Disconnect from this robot
     * @method Robot#disconnect
     */
    disconnect() {
        // Don't throw an error if this is called in a late cleanup and this
        // falls out of scope
        if (this) {
            this._requester.disconnect();
            this._certificate = null;
            this._connected = false;
            this._fingerprint = null;
            this._ip = null;
            this._key = null;
            this._requester = null;
            this.emit('status', 'disconnected');
        }
    }
    async _requestCertificate() {
        const certificateCreationUri = `https://${constants_1.ENDPOINT}/rom/v1/certificates`;
        const body = { friendlyId: this.serialName };
        const headers = { 'Authorization': `${this.tokenType} ${this.accessToken}` };
        await axios_1.default.post(certificateCreationUri, body, { headers })
            .then(() => this.emit('status', 'certificateRequested'))
            .catch(err => { throw new Error(err.message); });
    }
    async _retrieveCertificate() {
        const certificateRetrievalUri = `https://${constants_1.ENDPOINT}/rom/v1/certificates/client?friendlyId=${this.serialName}`;
        const headers = { 'Authorization': `${this.tokenType} ${this.accessToken}` };
        this._ip = null;
        let numTries = 0;
        while (!this._ip && numTries < constants_1.MAX_CERT_TRIES) {
            try {
                await axios_1.default.get(certificateRetrievalUri, {
                    headers,
                    timeout: 5000,
                }).then(res => {
                    this._certificate = res.data.data.cert;
                    this._fingerprint = res.data.data.fingerprint;
                    this._ip = res.data.data.payload.ipAddress;
                    this._key = res.data.data.private;
                });
            }
            catch (err) {
                numTries++;
            }
        }
        if (!this._ip) {
            throw new Error('Failed to retrieve certificate');
        }
        this.emit('status', 'certificateReceived');
    }
}
exports.Robot = Robot;
//# sourceMappingURL=Robot.js.map