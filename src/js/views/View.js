import icons from "url:../../img/icons.svg";

export default class View {
	_data;

	/**
	 * Render receive objext to the dom 
	 * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
	 * @param {boolean} [render=true] if false, create markup string instead of rendering to the DOM
	 * @returns {undefined | string} A markup string is returned if render=false
	 * @this {Object} View instance
	 * @author Iryna Koval (irenako)
	 * @todo Finish Implementation
	 */

	render(data, render = true) {
		if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

		this._data = data;
		const markup = this._generateMarkup();

		if (!render) return markup;

		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	renderSpinner() {
		const markup = `<div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
        </div>`;

		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	addHandlerRender(handler) {
		["hashchange", "load"].forEach((ev) => window.addEventListener(ev, handler));
	}

	renderError() {
		const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${this._errorMessage}</p>
          </div>`;

		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	renderMessage() {
		const markup = `<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${this._message}</p>
          </div>`;

		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	_clear() {
		this._parentElement.innerHTML = "";
	}

	update(data) {
		this._data = data;
		const newMarkup = this._generateMarkup();

		const newDOM = document.createRange().createContextualFragment(newMarkup);
		const newElements = Array.from(newDOM.querySelectorAll("*"));
		const curElements = Array.from(this._parentElement.querySelectorAll("*"));

		newElements.forEach((newEl, i) => {
			const curEl = curElements[i];

			// Updates changed TEXT
			if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") {
				curEl.textContent = newEl.textContent;
			}

			// Updates changed ATTRIBUES
			if (!newEl.isEqualNode(curEl))
				Array.from(newEl.attributes).forEach((attr) =>
					curEl.setAttribute(attr.name, attr.value)
				);
		});
	}
}
