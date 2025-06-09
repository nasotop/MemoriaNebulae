const _ui = {
	form: "login_form",
	form_fields: {
		title: "post_title",
		content: "post_content",
		mood: "post_mood",
	},
	submit: "post_submit",
};

window.addEventListener("load", () => {
	document.getElementById(_ui.submit).addEventListener("click", post);
	document
		.getElementById(_ui.form_fields.mood)
		.addEventListener("change", rangeChange);
});

const post = (event) => {
	event.preventDefault();
	const validations = {
		title: true,
		content: true,
		mood: true,
	};

	const title = document.getElementById(_ui.form_fields.title);
	const content = document.getElementById(_ui.form_fields.content);

	if (title.value === "") {
		validations.title = false;
		setValidation(title, false, "Por favor, ingrese un título");
	} else {
		validations.title = true;
		setValidation(title, true, "");
	}

	if (content.value === "") {
		validations.content = false;
		setValidation(content, false, "Por favor, ingrese el contenido del post");
	} else {
		validations.content = true;
		setValidation(content, true, "");
	}

	
};

const rangeChange = (event) => {
	const rango = document.getElementById(_ui.form_fields.mood);
	const v = parseInt(event.target.value, 10);
	rango.classList.remove("range--low", "range--mid", "range--high");
	if (v < 2) {
		rango.classList.add("range--low");
	} else if (v < 4) {
		rango.classList.add("range--mid");
	} else {
		rango.classList.add("range--high");
	}
};

const setValidation = (element, isValid, errorMsg) => {
	const validation_message = element.parentElement.querySelector(
		'div[name="validation_message"]'
	);
	if (isValid) {
		element.classList.remove("is-invalid");
		element.classList.add("is-valid");
		validation_message.classList.add("opacity-0");
	} else {
		element.classList.remove("is-valid");
		element.classList.add("is-invalid");
		validation_message.classList.remove("opacity-0");
	}
	validation_message.textContent = errorMsg;
	element.focus();
};
