# alphaville-marketslive-wordpress-api

## How to use

Require in your project:

```js
const WpApi = require('alphaville-marketslive-wordpress-api');
```

Set the base URL:

```js
WpApi.setBaseUrl('http://ftalphaville-wordpress.ft.com');
```


Use the API for a specific article:

```js
const api = new WpApi('uuid');
api.catchupJson().then((data) => {
    // use the data;
}).catch((err) => {
        // report the error
});
```
