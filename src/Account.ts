import {AccountCreds} from './AccountCreds';
import axios from 'axios';
import {ENDPOINT} from './constants';
import {Robot} from './Robot';

/**
 * @description A reference to a Jibo account. Log in here to get an API handle
 * to a Jibo robot or robots.
 * @class Account
 */
export class Account {

    /** The client identifier provided by Jibo, Inc. */
    readonly clientId: string;
    /** The email address associated with the account */
    readonly email: string;

    private _accessToken: string;
    private _clientSecret: string;
    private _endpoint: string;
    private _password: string;
    private _tokenType: string;

    constructor(creds: AccountCreds) {
        this.clientId = creds.clientId;
        this._clientSecret = creds.clientSecret;
        this.email = creds.email;
        this._password = creds.password;
    }

    /** 
     * Log into the account with the credentials provided in the 
     * {@link AccountCreds}
     * @method Account#login
     */
    async login(): Promise<void> {
        if (this._accessToken) {
            this.logout();
        }
        const getTokenUri = `https://${ENDPOINT}/token`;
        const body = {
            grant_type: "password",
            client_id: this.clientId,
            client_secret: this._clientSecret,
            username: this.email,
            password: this._password,
        };
        return axios.post(getTokenUri, body).then(res => {
            this._accessToken = res.data.access_token;
            this._tokenType = res.data.token_type;
        }).catch(err => { throw new Error(err.message); });
    }

    /** 
     * Get an API handle for each robot associated with the account
     * @method Account#getRobots
     * @returns {Promise<Robot[]>}
     */
    async getRobots(): Promise<Robot[]> {
        if (!this._accessToken) {
            throw new Error('Not logged in');
        }
        const getRobotListUri = `https://${ENDPOINT}/rom/v1/robots`;
        return axios.get<{data: {robotName: string}[]}>(getRobotListUri, {
            headers: { "Authorization": `${this._tokenType} ${this._accessToken}` },
        })
        .then(res => res.data.data.map(data => new Robot(
            data.robotName,
            this._tokenType,
            this._accessToken,
        )))
        .catch(err => { throw new Error(err.message); });
    }

    /** 
     * Log out from the account 
     * @method Account#logout
     */
    logout() {
        // Don't throw an error if this is called in a late cleanup and this
        // falls out of scope
        if (this) {
            this._accessToken = null;
            this._tokenType = null;
        }
    }
}