import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model";
import recipeView from "./views/recipeView";

///////////////////////////////////////

const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		if (!id) return;
		recipeView.renderSpinner();

		await model.loadRecipe(id);

		recipeView.render(model.state.recipe);
	} catch (err) {
		alert(err);
	}
};

const init = function () {
	recipeView.addHandlerRender(controlRecipes);
};

init();
