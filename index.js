import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const defaultData = { favoriteRecipes: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

import express from 'express';
let app = express();

//Serve static files from a public folder
app.use(express.static('public'));
app.use(express.json());

//Set port variable to listen for requests
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('listening at ', port);
});

/*ROUTES */
app.post('/new-data', (request, response) => {
  let newFavoriteRecipe = request.body;

  db.data.favoriteRecipes.push(newFavoriteRecipe)

  db.write()
    .then(() => {
      response.json({ 'msg': 'Success' });
    });
});

app.get('/data', (request, response) => {
  db.read()
    .then(() => {
      let theData = {favoriteRecipes : db.data.favoriteRecipes};
      response.json(theData);
    });

});
