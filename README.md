# What is this app ?

This is a simple sample application for Ingenico Connect, which illustrates how quickly payment processing capabilities
can be added to an existing web application.

## What is Ingenico Connect ?

Ingenico Connect is a collection of products and services that make it easier than ever to process payment in your application.
For more information check out https://developer.globalcollect.com/.

## What do I need to run this app ?

You'll need to setup [Meteor](https://www.meteor.com/), then create an account on the [Connect Sandbox](https://account-sandbox.globalcollect.com/#/login). Once your account is created and validated, create a file at the root
level of this project named `connectSdkSettings.js` with the following content :
```JavaScript
export const connectSdkSettings = {
    host: 'api-sandbox.globalcollect.com',
    scheme: 'https',
    apiKeyId: 'YOUR_API_KEY_ID',
    secretApiKey: 'YOUR_SECRET_API_KEY',
    merchantId: YOUR_MERCHANT_ID,
    enableLogging: true,
    logger: {
        info: function(msg) {
            console.log(msg);
        },
        warn: function(msg) {
            console.log(msg);
        },
        error: function(msg) {
            console.log(msg);
        }
    }
}
```
You can find your API key id, secret API key and merchant ID under the **ACCOUNT SETUP** tab when logged in to the 
[Sandbox Configuration Center](https://account-sandbox.globalcollect.com/#/account/merchantid).

The application can be started like any other Meteor app by running the `meteor` command in the project root directory :
```Bash
cd /path/to/your/project/
meteor
```

Congratulations ! You can now test the application at `localhost:3000`.
