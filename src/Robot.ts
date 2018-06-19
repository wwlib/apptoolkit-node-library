import axios from 'axios';
import {EventEmitter} from 'events';
import {CommandRequester} from '@jibo/command-requester';
import {ENDPOINT, MAX_CERT_TRIES, PORT} from './constants';

/** 
 * An API handle to a Jibo robot, used to request commands 
 * @class Robot
 * @hideconstructor
 */
export class Robot extends EventEmitter {

    private _certificate: string;
    private _connected: boolean;
    private _fingerprint: string;
    private _ip: string;
    private _key: string;
    private _requester: CommandRequester;

    /** @private */
    constructor(
        /**
         * The "friendly serial name" from the bottom of the robot,
         * e.g. My-Friendly-Robot-Name
         */
        readonly serialName: string,
        private tokenType: string,
        private accessToken: string,
    ) {
        super();
    }

    /** 
     * `true` if the app is currently connected to this robot
     * @method Robot#connected
     * @returns {boolean}
     */
    get connected(): boolean {
        return this._connected;
    }

    /** 
     * A handle to the command requester for this robot
     * @method Robot#requester
     * @returns {CommandRequester}
     */
    get requester(): CommandRequester {
        return this._requester;
    }

    /** 
     * Establish a connection to this robot
     * @method Robot.connect 
     */
    async connect(): Promise<void> {
        if (this.connected) {
            await this.disconnect();
        }
        if (!this._ip) {
            await this._requestCertificate();
            await this._retrieveCertificate();
        }
        const options = {
            port: PORT,
            key: this._key,
            cert: this._certificate,
            rejectUnauthorized: false,
            perMessageDeflate: false,
            fingerprint: this._fingerprint,
        };
        this._requester = new CommandRequester();
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
    disconnect(): void {
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

    private async _requestCertificate(): Promise<void> {
        const certificateCreationUri = `https://${ENDPOINT}/rom/v1/certificates`;
        const body = {friendlyId: this.serialName};
        const headers = {'Authorization': `${this.tokenType} ${this.accessToken}`};
        await axios.post(certificateCreationUri, body, {headers})
        .then(() => this.emit('status', 'certificateRequested'))
        .catch(err => { throw new Error(err.message); });
    }


    private async _retrieveCertificate(): Promise<void> {
        const certificateRetrievalUri = `https://${ENDPOINT}/rom/v1/certificates/client?friendlyId=${this.serialName}`;
        const headers = {'Authorization': `${this.tokenType} ${this.accessToken}`};
        this._ip = null;
        let numTries = 0;
        while (!this._ip && numTries < MAX_CERT_TRIES) {
            try {
                await axios.get(certificateRetrievalUri, {
                    headers,
                    timeout: 5000,
                }).then(res => {
                    this._certificate = res.data.data.cert;
                    this._fingerprint = res.data.data.fingerprint;
                    this._ip = res.data.data.payload.ipAddress;
                    this._key = res.data.data.private;
                });
            } catch (err) {
                numTries++;
            }
        }
        if (!this._ip) {
            throw new Error('Failed to retrieve certificate');
        }
        this.emit('status', 'certificateReceived');
    }
}
