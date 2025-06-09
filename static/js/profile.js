const _ui = {
	personal_info: {
		form: "profile_personal_info_form",
		form_fields: {
			names: "profile_name",
			last_name: "profile_last_name",
			username: "profile_username",
			biography: "profile_bio",
		},
		submit_button: "profile_personal_info_submit",
	},
	security: {
		form: "profile_security_form",
		form_fields: {
			mail: "profile_mail",
			password: "profile_password",
			confirm_password: "profile_confirm_password",
			change_password: "profile_change_password",
		},
		submit_button: "profile_security_submit",
	},
	toast: {
		profile: "profile_toast",
	},
};

const patternMail =
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const patternPass =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
window.addEventListener("load", () => {
	document
		.getElementById(_ui.personal_info.submit_button)
		.addEventListener("click", save_personal_info);
	document
		.getElementById(_ui.security.submit_button)
		.addEventListener("click", save_security_info);

	document
		.getElementById(_ui.security.form_fields.change_password)
		.addEventListener("change", changePasswordElements);
});
const changePasswordElements = (event) => {
	const value = event.target.checked;
	const pass = document.getElementById(_ui.security.form_fields.password);
	const confirm_pass = document.getElementById(
		_ui.security.form_fields.confirm_password
	);
	if (value) {
		pass.removeAttribute("disabled");
		confirm_pass.removeAttribute("disabled");
	} else {
		pass.setAttribute("disabled", "disabled");
		confirm_pass.setAttribute("disabled", "disabled");
	}
};

const save_personal_info = (event) => {
	event.preventDefault();
	const validations = {
		names: true,
		last_name: true,
		username: true,
	};

	const names = document.getElementById(_ui.personal_info.form_fields.names);
	const last_name = document.getElementById(
		_ui.personal_info.form_fields.last_name
	);
	const username = document.getElementById(
		_ui.personal_info.form_fields.username
	);
	const biography = document.getElementById(
		_ui.personal_info.form_fields.biography
	);

	if (names.value === "") {
		validations.names = false;
		setValidation(names, false, "Por favor, ingrese su nombre");
	} else {
		validations.names = true;
		setValidation(names, true, "");
	}
	if (last_name.value === "") {
		validations.last_name = false;
		setValidation(last_name, false, "Por favor, ingrese su apellido");
	} else {
		validations.last_name = true;
		setValidation(last_name, true, "");
	}
	if (username.value === "") {
		validations.username = false;
		setValidation(username, false, "Por favor, ingrese su nombre de usuario");
	} else {
		validations.username = true;
		setValidation(username, true, "");
	}

	if (Object.values(validations).every((value) => value === true)) {
		showToast(_ui.toast.profile);
	}
};

const save_security_info = (event) => {
	event.preventDefault();
	const validations = {
		mail: true,
		password: true,
		confirm_password: true,
	};
	const mail = document.getElementById(_ui.security.form_fields.mail);
	const password = document.getElementById(_ui.security.form_fields.password);
	const confirm_password = document.getElementById(
		_ui.security.form_fields.confirm_password
	);
	const change_password = document.getElementById(
		_ui.security.form_fields.change_password
	);
	if (mail.value === "") {
		validations.mail = false;
		setValidation(mail, false, "Por favor, ingrese su correo electrónico");
	} else if (!patternMail.test(mail.value)) {
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

	if (change_password.checked) {
		debugger;
		if (password.value === "") {
			validations.password = false;
			setValidation(password, false, "Por favor, ingrese su contraseña");
		} else if (!patternPass.test(password.value)) {
			validations.password = false;
			setValidation(
				password,
				false,
				"La contraseña debe tener entre 8 y 15 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial."
			);
		} else {
			validations.password = true;
			setValidation(password, true, "");
		}
		if (confirm_password.value === "") {
			validations.confirm_password = false;
			setValidation(
				confirm_password,
				false,
				"Por favor, confirme su contraseña"
			);
		} else if (confirm_password.value !== password.value) {
			validations.confirm_password = false;
			setValidation(confirm_password, false, "Las contraseñas no coinciden");
		} else {
			validations.confirm_password = true;
			setValidation(confirm_password, true, "");
		}
	}
	if (Object.values(validations).every((value) => value === true)) {
		showToast(_ui.toast.profile);
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

const showToast = (id) => {
	const toastLiveExample = document.getElementById(id);

	const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
	toastBootstrap.show();
};
