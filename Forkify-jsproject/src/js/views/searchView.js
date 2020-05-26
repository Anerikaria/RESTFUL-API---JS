import { elements }  from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => 
{
    elements.searchInput.value = '' ;
}

export const clearResult = () =>  
{
    elements.searchResultList.innerHTML = '' ;
}

/*
//'Pasta with tomato and spinach'
acc : 0 / acc + curr.length = 5 / newTitle = ['Pasta']
acc :  5 / acc + curr.length = 9 / newTitle = ['Pasta', 'With']
acc :  9 / acc + curr.length = 15 / newTitle = ['Pasta', 'With', 'tomato']
acc :  15 / acc + curr.length = 18 / newTitle = ['Pasta', 'With', 'tomato']
acc :  18 / acc + curr.length = 24 / newTitle = ['Pasta', 'With', 'tomato']
*/
 
const limitRecipeTitle = (title, limit = 17)  => {
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, curr) => {
            if(acc + curr.length <= limit){
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);
    
    //return the result
    return `${newTitle.join(' ')}...`;
}
    else {
        return title;
    }
}

const renderRecipe = recipe => {
 const  markup =   `
                 <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
                `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};


// type : 'prev' or 'next'
const createButton = (page, type) => `
            <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
             <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
             </svg>
                <span>Page ${type === 'prev' ? page - 1 : page + 1  }</span>
            </button>
`;

const renderButtons = (page, numResult, resPerPage) =>{
    const pages = Math.ceil(numResult / resPerPage);

    let button;
    if(page === 1 && pages > 1){
        //Button to go to the next page
        button = createButton(page, 'next');
    }
    else if(page < pages ){
        // both buttons
        button = `
                  ${createButton(page, 'prev')}
                  ${createButton(page, 'next')}
                  `;
    }else if(page === pages && pages > 1){
        // only button to go to the previous page
        button = createButton(page, 'prev')
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResult = (recipes, page = 1, resPerPage = 10 ) => {
    //render result of current page
    // const start = (page - 1 ) * resPerPage
    // const end = page * resPerPage;

    let tens = [];
    for(let i = (page - 1 ) * resPerPage; i < page * resPerPage; i++  ){
        tens.push(recipes[i]);
    }

    // recipes.slice(start, end).forEach(renderRecipe);
    tens.forEach(el => renderRecipe(el));

    // render Pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};