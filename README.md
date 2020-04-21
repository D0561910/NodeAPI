# NodeAPI

## Missing Folder is config 
## Inside config Folder have two 
## ./config/firebase.config.js

```javascript
var admin = require("firebase-admin");
var serviceAccount = require("path/to/serviceAccountKey.json");
const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
};
module.exports = firebase = admin.initializeApp(firebaseConfig);
```

## ./config/serviceAccountKey.json
To generate a private key file for your service account:
1. In the Firebase console, open Settings > Service Accounts.
2. Click Generate New Private Key, then confirm by clicking Generate Key.
3. Securely store the JSON file containing the key.
