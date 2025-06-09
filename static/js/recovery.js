const _ui = {
    form: "recovery_form",
    mail: "recovery_mail",
    submit: "recovery_submit",
    alert: "recovery_alert",
}

const pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

window.addEventListener("load", () => {
    document.getElementById(_ui.submit).addEventListener("click", recovery);
});
const recovery = (event) => {
    event.preventDefault();
    const mail = document.getElementById(_ui.mail);
    const validations = {
        mail: true,
    };

    if (mail.value === "") {
        validations.mail = false;
        setValidation(mail, false, "Por favor, ingrese su correo electrónico");
    }
    else if (!pattern.test(mail.value)) {
        validations.mail = false;
        setValidation(mail, false, "Por favor, ingrese un correo electrónico válido");
    }
    else {
        validations.mail = true;
        setValidation(mail, true, "");
    }

    if (Object.values(validations).every(value => value === true)) {
        appendAlert(document.getElementById(_ui.alert), "Si el correo electrónico ingresado está registrado, se enviará un enlace para restablecer la contraseña.", "info");

        setTimeout(() => {
             window.location.href = event.target.href;

        }, 5000);
    };
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
const appendAlert = (alertPlaceholder, message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper);
};