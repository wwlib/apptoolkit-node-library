/// <reference types="node" />
import { EventEmitter } from 'events';
import { CommandRequester } from '@jibo/command-requester';
/**
 * An API handle to a Jibo robot, used to request commands
 * @class Robot
 * @hideconstructor
 */
export declare class Robot extends EventEmitter {
    /**
     * The "friendly serial name" from the bottom of the robot,
     * e.g. My-Friendly-Robot-Name
     */
    readonly serialName: string;
    private tokenType;
    private accessToken;
    private _certificate;
    private _connected;
    private _fingerprint;
    private _ip;
    private _key;
    private _requester;
    /** @private */
    constructor(
    /**
     * The "friendly serial name" from the bottom of the robot,
     * e.g. My-Friendly-Robot-Name
     */
    serialName: string, tokenType: string, accessToken: string);
    /**
     * `true` if the app is currently connected to this robot
     * @method Robot#connected
     * @returns {boolean}
     */
    readonly connected: boolean;
    /**
     * A handle to the command requester for this robot
     * @method Robot#requester
     * @returns {CommandRequester}
     */
    readonly requester: CommandRequester;
    /**
     * Establish a connection to this robot
     * @method Robot.connect
     */
    connect(): Promise<void>;
    /**
     * Disconnect from this robot
     * @method Robot#disconnect
     */
    disconnect(): void;
    private _requestCertificate;
    private _retrieveCertificate;
}
