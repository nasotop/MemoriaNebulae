const _ui={
    personal_info: {
        form: "profile_personal_info_form",
        form_fields: {
            names: "profile_name",
            last_name: "profile_last_name",
            username: "profile_username",
            biography: "profile_bio"
        },
        submit_button: "profile_personal_info_submit",
    },
    security:{

        form: "profile_security_form",
        form_fields: {
            mail: "profile_mail",
            password: "profile_password",
            confirm_password: "profile_confirm_password",
            change_password: "profile_change_password",
        },
        submit_button: "profile_security_submit",
    }
};

const patternMail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const patternPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
window.addEventListener("load", () => {
    document.getElementById(_ui.personal_info.submit_button).addEventListener("click", save_personal_info);
    document.getElementById(_ui.security.submit_button).addEventListener("click", save_security_info);
});

const save_personal_info = (event) => {
event.preventDefault();
    const validations = {
        names: true,
        last_name: true,
        username: true
    };

    const names = document.getElementById(_ui.personal_info.form_fields.names);
    const last_name = document.getElementById(_ui.personal_info.form_fields.last_name);
    const username = document.getElementById(_ui.personal_info.form_fields.username);
    const biography = document.getElementById(_ui.personal_info.form_fields.biography);

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
};

const save_security_info = (event) => {};


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