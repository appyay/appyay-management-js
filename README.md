# Appyay Management Javascript SDK

Client Javascript library (node and browser) for (Appyay)[https://appyay.com] Content Management API.

# Getting started

To get started with the Appyay Management JS SDK you'll need to install it, and then get credentials which will allow you to access your content in Appyay.

## Installation

```
npm i
```

This library is still in development and not yet available on NPM.

## Usage

### Initialisation

#### Node & browser

```js
import {createClient} from "appyay-management-js";
```

```js
const client = createClient({
        environmentId: '<environment_id>', 
        accessToken: '<access_token>', //for write access
        apikey: '<api_key>' //for read access
   });
```

#### Browser

```js
<script src="path/to/appyay-delivery-js/dist/appyay-management.browser.js"></script>
```
Accessing the global variable:

```js
const client = appyayManagement.createClient({
        environmentId: '<environment_id>', 
        accessToken: '<access_token>', //for write access
        apikey: '<api_key>' //for read access
   });
```

## API

### Client API

#### Get Content Types

```js
    client.getContentTypes()
    .then(function(response){
        console.log('content types retrieved', response.contentTypes);
    });
```

#### Get Content Type

```js       
    client.getContentType(contentTypeId)
    .then(function(response){
        console.log('content type retrieved', response.id);
    });
```

#### Get Items

```js
    client.getItems(contentTypeId)
    .then(function(response){
        console.log('items retrieved', response.items);
    });
```

#### Get Content Item

```js
    client.getItem(itemId)
    .then(function(item){
        console.log('item retrieved', item);
    });
```

#### Create Item

```js
    client.createItem(contentTypeId, { 
        fields: {
        title: 'New post'
        },
        status: 'published'
    })
    .then(function(item){
        console.log('item created', item);
    });
```

### Content Types API

#### Get Items

```js
    contentType.getItems()
    .then(function(response){
        console.log('items retrieved', response.items);
    });
```

#### Delete Content Type

```js
    contentType.delete();
```

#### Add Item

```js
    contentType.addItem({
        fields: {
        title: 'New post'
        },
        status: 'published'
    })
    .then(function(response){
        console.log('items retrieved', response.items);
    });
```

### Item API

#### Update Item

```js
    let title = 'Updated post';
    item.fields.title = title;
    item.update();
```
#### Delete Item

```js
    item.delete();
```

## Supported environments

Browsers and Node.js:
- Chrome
- Firefox
- Edge
- Safari
- node.js (6.x, 8.x)

## Testing
node <path_to_appyay-management-js>/test/integration/index.js

## Support
If you have a problem with this library, please file an [issue](https://github.com/appyay/appyay-management-js/issues/new) here on GitHub.
