import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
	recipe: {},
};

export const loadRecipe = async function (id) {
	try {
        const data = await getJSON(`${API_URL + id}`)
        console.log(data);
        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            ingredients: recipe.ingredients,
            cookingTime: recipe.cooking_time,
        };
        console.log(state.recipe)
    } catch (err) {
        console.error(err)
        throw err;
    }
};
