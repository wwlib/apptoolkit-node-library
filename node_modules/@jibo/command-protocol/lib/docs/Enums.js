/**
 * Enum of TakePhoto events.
 * @typedef PhotoEvents
 * @prop TakePhoto `onTakePhoto`
 */

/**
 * Enum of video events
 * @typedef VideoEvents
 * @prop VideoReady `onVideoReady`
 */

/**
 * @description Enum of skill disconnect reasons
 * @typedef DisconnectReason
 * @prop 4000 Skill closed by user
 * @prop 4001 Skill closed due to robot error
 * @prop 4002 Incoming connection is replacing previous connection
 * @prop 4003 Connection closed due to inactivity
 * @prop 4004 Session closed due to reconnection time out
 * @prop 4005 Session closed due to failed reconnection
 */

/**
 * Enum of websocket close codes
 * @typedef DisconnectCode
 * @prop HeadTouchExit `4000` - The Remote skill was exited via head touch on robot
 * @prop RobotError `4001` - The Remote skill was exited due to an error on the robot resulting in the error display taking over.
 * @prop NewConnection `4002` - A new Remote connection is superseding the existing one.
 * @prop InactivityTimeout `4003` - The connection was closed due to inactivity (no commands sent)
 * @prop ReconnectTimeout `4004` - Session timed out waiting for reconnect
 * @prop ReconnectError `4005` - Session unable to wait for a reconnect
 */

/**
 * Enum of async command events.
 * @typedef AsyncCommandEvent
 * @prop Start `onStart` - Asynchronous command has started.
 * @prop Stop `onStop` - Asynchronous command has stopped.
 * @prop Error `onError` - An attempt to move from Requested to Start resulted in an Error.
 */

/**
 * Enum of display events.
 * @typedef DisplayEvents
 * @prop ViewStateChange `onViewStateChange`
 */

/**
 * Enum of possible view states
 * @typedef ViewStates
 * @prop Opened
 * @prop Closed
 */

/**
 * @typedef LookAtEvents
 * @prop LookAtAchieved `onLookAtAchieved`
 * @prop TrackEntityLost `onTrackEntityLost`
 */

/**
 * Enum of speech events.
 * @typedef HotWordEvents
 * @prop HotWordHeard `onHotWordHeard`
 * @prop ListenResult `onListenResult`
 */

/**
 * @typedef ListenEvents
 * @description Enum of listen events.
 * @prop ListenResult `onListenResult`
 */

/**
 * @typedef ListenStopReasons
 * @description Enum of unsuccessful listen stop reasons.
 * @prop NoInput `NoInput`
 * @prop NoMatch `NoMatch`
 * @prop Interrupted `Interrupted`
 */

/**
 * Enum of entity watching events.
 * @typedef EntityTrackEvents
 * @prop TrackUpdate `onEntityUpdate`
 * @prop TrackLost `onEntityLost`
 * @prop TrackGained `onEntityGained`
 */

/**
 * Enum of motion detection events.
 * @typedef MotionEvents
 * @prop MotionDetected `onMotionDetected`
 */

/**
 * Enum of headtouch events.
 * @typedef HeadTouchEvents
 * @prop HeadTouched `onHeadTouch`
 */

/**
 * Enum of screen gesture events.
 * @typedef ScreenGestureEvents
 * @prop Tap `onTap`
 * @prop Swipe `onSwipe`
 */

/**
 * Enum of config events.
 * @typedef ConfigEvents
 * @prop onConfig `onConfig`
 */

/**
 * Enum of asset events.
 * @typedef FetchAssetEvents
 * @prop AssetReady `onAssetReady`
 * @prop AssetFailed `onAssetFailed`
 */

/**
 * Enum of unload asset events.
 * @typedef UnloadAssetEvents
 * @prop UnloadAssetFailed `onUnloadAssetFailed`
 * @prop UnloadAssetDone `onUnloadAssetDone`
 */

/**
 * Enum of available swipe directions.
 * @typedef SwipeDirection
 * @prop Up
 * @prop Down
 * @prop Right
 * @prop Left
 */

/**
 * Enum of entity (face) types.
 * @typedef EntityType
 * @prop person Face is a loop member.
 * @prop unknown Face is not a loop member.
 */

/**
 * @typedef FetchAssetErrorDetails
 * @prop OutOfMemory {string} [Response Code]{@link ResponseCode}
 *       406 (NotAcceptable) - Out of memory
 * @prop InvalidURI {string} [Response Code]{@link ResponseCode}
 *       406 (NotAcceptable) - Invalid or Inaccessible URI
 */

/**
 * @typedef UnloadAssetErrorDetails
 * @prop InvalidName {string}
 *       406 (NotAcceptable) - Invalid or Inaccessible Name
 */

/**
 * @typedef ResponseCode
 * @description Enum of response codes
 * @prop OK `200` - The command was accepted and executed. Synchronous calls only.
 * @prop Created `201` - The command was accepted and executed. Synchronous calls only.
 * @prop Accepted `202` - The command was accepted and will begin execution. Most asynchronous commands will get a this response.
 * @prop BadRequest `400` - Badly formatted request.
 * @prop Forbidden `403` - The command request is not a supported command.
 * @prop NotFound `404` - Command not found.
 * @prop NotAcceptable `406` - The data in the command is not acceptable.
 * @prop RequestTimeout `407 - Unable to marshal the resources and set up the command within the time limits set in the Controller.
 * @prop Conflict `409` - There is a conflicting command already executing
 * @prop PreconditionFailed `412` - The execution of the command requires the execution of a prior command.
 * @prop InternalError `500` - The Controller has crashed or hit a different error that was unexpected.
 * @prop ServiceUnavailable `503` - The Controller is temporarily unavailable. The Robot SSM may be rebooting something.
 * @prop VersionNotSupported `505` - The Version requested is not supported.
 * @prop VersionConflict `506` - The Version requested is not the same version of the current connection.
 */