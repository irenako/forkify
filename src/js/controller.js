import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";

///////////////////////////////////////
// if (module.hot) {
// 	module.hot.accept();
// }

const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		if (!id) return;
		recipeView.renderSpinner();

		bookmarksView.update(model.state.bookmarks);

		resultsView.update(model.getSearchResultsPage());

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
		resultsView.render(model.getSearchResultsPage());

		paginationView.render(model.state.search);
	} catch (err) {
		console.error(err);
		recipeView.renderError(err);
	}
};

const controlPagination = function (goToPage) {
	resultsView.render(model.getSearchResultsPage(goToPage));

	paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
	model.updateServings(newServings);
	recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
	if (!model.state.recipe.bookmarked) {
		model.addBookmark(model.state.recipe);
	} else if (model.state.recipe.bookmarked) {
		model.deleteBookmark(model.state.recipe.id);
	}

	recipeView.update(model.state.recipe);

	bookmarksView.render(model.state.bookmarks);
};

const controlBookMarks = function () {
	bookmarksView.render(model.state.bookmarks);
};

const init = function () {
	recipeView.addHandlerRender(controlRecipes);
	recipeView.addHandlerUpdateServings(controlServings);
	searchView.addHandlerSearch(controlSearchResults);
	paginationView.addHandlerClick(controlPagination);
	recipeView.addHandlerAddBookMark(controlAddBookmark);
	bookmarksView.addHandlerRender(controlBookMarks);
};

init();
