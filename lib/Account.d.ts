import { AccountCreds } from './AccountCreds';
import { Robot } from './Robot';
/**
 * @description A reference to a Jibo account. Log in here to get an API handle
 * to a Jibo robot or robots.
 * @class Account
 */
export declare class Account {
    /** The client identifier provided by Jibo, Inc. */
    readonly clientId: string;
    /** The email address associated with the account */
    readonly email: string;
    private _accessToken;
    private _clientSecret;
    private _endpoint;
    private _password;
    private _tokenType;
    constructor(creds: AccountCreds);
    /**
     * Log into the account with the credentials provided in the
     * {@link AccountCreds}
     * @method Account#login
     */
    login(): Promise<void>;
    /**
     * Get an API handle for each robot associated with the account
     * @method Account#getRobots
     * @returns {Promise<Robot[]>}
     */
    getRobots(): Promise<Robot[]>;
    /**
     * Log out from the account
     * @method Account#logout
     */
    logout(): void;
}
