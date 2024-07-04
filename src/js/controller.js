import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";

///////////////////////////////////////
// if (module.hot) {
// 	module.hot.accept();
// }

const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		if (!id) return;
		recipeView.renderSpinner();

		await model.loadRecipe(id);

		recipeView.render(model.state.recipe);
	} catch (err) {
		recipeView.renderError(err);
	}
};

const controlSearchResults = async function () {
	try {
		const query = searchView.getQuery();

		if (!query) return;
		resultsView.renderSpinner();

		await model.loadSearchResults(query);
		resultsView.render(model.getSearchResultsPage(3));
	} catch (err) {
		console.error(err);
		recipeView.renderError(err);
	}
};

const init = function () {
	recipeView.addHandlerRender(controlRecipes);
	searchView.addHandlerSearch(controlSearchResults);
};

init();
