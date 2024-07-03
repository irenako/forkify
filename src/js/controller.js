import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model";
import recipeView from "./views/recipeView";


const recipeContainer = document.querySelector(".recipe");

///////////////////////////////////////

const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		if (!id) return;
		recipeView.renderSpinner()

		await model.loadRecipe(id);

		recipeView.render(model.state.recipe);
	} catch (err) {
		alert(err);
	}
};

["hashchange", "load"].forEach((ev) => window.addEventListener(ev, controlRecipes));
