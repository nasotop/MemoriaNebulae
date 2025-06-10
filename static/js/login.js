const _ui = {
	form: "login_form",
	mail: "user_mail",
	password: "user_pass",
	submit: "login_submit",
};

const pattern =
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

window.addEventListener("load", () => {
	document.getElementById(_ui.submit).addEventListener("click", login);
});

const login = (event) => {
	event.preventDefault();
	const validations = {
		mail: true,
		password: true,
	};

	const mail = document.getElementById(_ui.mail);
	const password = document.getElementById(_ui.password);

	if (mail.value === "") {
		validations.mail = false;
		setValidation(mail, false, "Por favor, ingrese su correo electrónico");
	} else if (!pattern.test(mail.value)) {
		validations.mail = false;
		setValidation(
			mail,
			false,
			"Por favor, ingrese un correo electrónico válido"
		);
	} else {
		validations.mail = true;
		setValidation(mail, true, "");
	}

	if (password.value === "") {
		validations.password = false;
		setValidation(password, false, "Por favor, ingrese su contraseña");
	} else {
		validations.password = true;
		setValidation(password, true, "");
	}

	const esAdmin =
		mail.value === "admin@admin.cl" && password.value === "admin123";

	if (Object.values(validations).every((value) => value === true)) {
		window.location.href = esAdmin ? "index-admin.html" : event.target.href;
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
