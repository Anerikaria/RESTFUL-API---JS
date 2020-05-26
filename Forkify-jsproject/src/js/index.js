import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader}  from './views/base';


/** Global state of the App
 * - Search object
 * - current recipe object
 * -shopping list object
 * - Likes recipes
 */

 const state = {};

 const controlSearch = async () => {
     //1 query from the view
     const query = searchView.getInput();// TODO
     console.log(query);

     if(query){
         //2 new sesrch object add to state
         state.search =  new Search(query);

         //3 Prepare UI for results
         searchView.clearInput();
         searchView.clearResult();
         renderLoader(elements.searchRes);


         //4 Search for recipes
        await  state.search.getResults();

         //5 Render results on UI
         searchView.renderResult(state.search.result);

     }
 }

 elements.searchForm.addEventListener('submit', e => {
     e.preventDefault();
     controlSearch();
 });

