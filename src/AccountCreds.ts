

 /**
  * @interface AccountCreds
  * @prop clientID {string} The client identifier provided to you by Jibo, Inc.
  * @prop clientSecret {string} The client secret provided to you by Jibo, Inc.
  * @prop email {string} The email address associated with your Jibo account 
  * @prop password {string} The password for your Jibo account 
  */
 export interface AccountCreds {
    clientId: string;
    clientSecret: string;
    email: string;
    password: string;
}