/*
  Unit Testing of Competition API
  The main stream focus is to test the procedure of Create, Search, Participate, ban in competition
  The API's will use Store's underlying but stores will be tested 
  
  Creation Testing
  API will be called, after all the requred information will be checked
     @required name, tag, images, hobbies, start, end, result, details, judged_by_user=false, is_public_competition
  1. Check tag musn't exist else break the process
  2. Testing Micro Actions
     a. Testing isTagUnique while user input
     b. Insert, Remove, Replace Images
     c. Replace name
     d. Retrieve Hobby
     e. Select Hobby
     f. Insert, Remove Hobby
     g. Set/Change Start, End & Result
     h. Insert/Remove Details as key value pairs
  3. Send data to server if not failed then redirect to competition's page
*/
import Competition from "@/static/api/Competition";
import * as fixtures from "@/tests/fixtures/competitio.json";

describe("Testing Competition Create API Piecewise", () => {
    describe("Test tag is unqiue", ()=>{
       for(let i=0; i < fixtures.tag_unique_test.length; i++){
          Competition.isTagUnique(fixtures.tag_unique_test[i]['tag']).then((exist) => {
             expect(exist).toBe(fixtures.tag_unique_test[i]['status']);
          });
       }
    });

    describe("Insert/Remove/Replace Image API using image manipulation", () => {
       let cases = fixtures.image_manipulation;
       for(let i=0; i < cases.length; i++){
          
       }
    });
});