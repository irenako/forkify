class SearchView {
	#parentElement = document.querySelector(".search");
	#data;
	#errorMessage = "We couldnt find recipe. Please try another one.";
	#message = "";

	getQuery() {
		const query = this.#parentElement.querySelector(".search__field").value;
		this.#clearInput();
		return query;
	}

	addHandlerSearch(handler) {
		this.#parentElement.addEventListener("submit", function (e) {
			e.preventDefault();
			handler();
		});
	}

	#clearInput() {
		this.#parentElement.querySelector(".search__field").value = "";
	}
}

export default new SearchView();
