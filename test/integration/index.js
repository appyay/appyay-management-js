const tape = require('tape');
const _test = require('tape-promise').default;
const test = _test(tape); 

const appyay = require('../../dist/appyay-management-js.node.js');

let currentItem;
const contentTypeId = '5d78b460bbf82a3ddeb75238'; 
const itemId = '5d99ab2fe68697bce786cdbc'; 
const params = {
    environmentId: '5d40c2ea35a5e11c976a0ce3',
    apikey: 'HR5TCWRROZLVMWZYM4YS45KHNZSTGNSIJJZF24RYHFBGQY2LLB5Q',
    accessToken: 'abc123'
  }

let client = appyay.createClient(params);

//run tests
testClientAPI(client)
.then(() => testItemAPI())

/**
 * Test AppyayClientAPI 
 * @param {Object} client - AppyayClient object
 */
 function testClientAPI(client){
     return new Promise(function(resolve, reject){
        test('should get content types', async function (t) {
            client.getContentTypes()
            .then(function(response){
                t.ok(response.contentTypes, 'content types retrieved')
             });
            });
            
            test('should get content type', async function (t) {
              client.getContentType(contentTypeId)
              .then(function(response){
                    t.ok(response.id, 'content type retrieved')
               });
            });
            
            test('should get items of content type', async function (t) {
              client.getItems(contentTypeId)
              .then(function(response){
              t.ok(response.items, 'items retrieved')
               });
            });
            
            test('should get item', async function (t) {
              client.getItem(itemId)
              .then(function(item){
              t.ok(item.id, 'item retrieved')
            });
        });
        resolve();
     });
        
 }

/**
 * Test AppyayItemAPI 
 */
function testItemAPI(){
    test('should create, update and delete item', async function (t) {
        //create item
         let item = await client.createItem(contentTypeId, { 
             fields: {
               title: 'New post',
               references: {}
             },
             status: 'published'
           });
         t.ok(item.id, 'item created');
     
         //update item
     
         let title = 'Updated post';
         item.fields.title = title;
         let updatedItem = await item.update();
         t.ok(updatedItem.fields.title === title, 'item updated');
     
         //delete item
     
         let response = await item.delete();
         t.ok(response.status === 204, 'item deleted');
       });
}
