const _ui = {
    form: "register_form",
    form_fields: {
        names: "register_name",
        last_name: "register_lastname",
        birth_date: "register_birthdate",
        username: "register_username",
        mail: "register_mail",
        password: "register_pass",
        confirm_password: "register_pass_validation",
    },
    submit: "register_submit",
}

const patternMail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const patternPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
window.addEventListener("load", () => {
    document.getElementById(_ui.submit).addEventListener("click", register);
});
const register = (event) => {
    event.preventDefault();
    const validations = {
        names: true,
        last_name: true,
        birth_date: true,
        username: true,
        mail: true,
        password: true,
        confirm_password: true,
    };

    const names = document.getElementById(_ui.form_fields.names);
    const last_name = document.getElementById(_ui.form_fields.last_name);
    const birth_date = document.getElementById(_ui.form_fields.birth_date);
    const username = document.getElementById(_ui.form_fields.username);
    const mail = document.getElementById(_ui.form_fields.mail);
    const password = document.getElementById(_ui.form_fields.password);
    const confirm_password = document.getElementById(_ui.form_fields.confirm_password);

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

    if (birth_date.value === "") {
        validations.birth_date = false;
        setValidation(birth_date, false, "Por favor, ingrese su fecha de nacimiento");
    } else {
        validations.birth_date = true;
        setValidation(birth_date, true, "");
    }

    if (username.value === "") {
        validations.username = false;
        setValidation(username, false, "Por favor, ingrese su nombre de usuario");
    } else {
        validations.username = true;
        setValidation(username, true, "");
    }

    if (mail.value === "") {
        validations.mail = false;
        setValidation(mail, false, "Por favor, ingrese su correo electrónico");
    } else if (!patternMail.test(mail.value)) {
        validations.mail = false;
        setValidation(mail, false, "Por favor, ingrese un correo electrónico válido");
    } else {
        validations.mail = true;
        setValidation(mail, true, "");
    }

    if (password.value === "") {
        validations.password = false;
        setValidation(password, false, "Por favor, ingrese su contraseña");
    }
    else if (!patternPass.test(password.value)) {
        validations.password = false;
        setValidation(password, false, "La contraseña debe tener entre 8 y 15 caracteres, al menos una letra mayúscula, una minúscula, un número y un carácter especial");

    }
    else {
        validations.password = true;
        setValidation(password, true, "");
    }
    if (confirm_password.value === "") {
        validations.confirm_password = false;
        setValidation(confirm_password, false, "Por favor, confirme su contraseña");
    } else if (confirm_password.value !== password.value) {
        validations.confirm_password = false;
        setValidation(confirm_password, false, "Las contraseñas no coinciden");
    } else {
        validations.confirm_password = true;
        setValidation(confirm_password, true, "");
    }
    if (Object.values(validations).every(value => value === true)) {
        window.location.href = event.target.href;
    }
};

const setValidation = (element, isValid, errorMsg) => {
    if (isValid) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        element.nextElementSibling.classList.add("opacity-0");
    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        element.nextElementSibling.classList.remove("opacity-0");
    }
    element.nextElementSibling.textContent = errorMsg;
    element.focus();
};