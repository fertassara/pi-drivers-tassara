//VALIDACION DE FORMULARIOS PARA UQE HAYA UN STRING

export function validateName(name) {
    if (name.trim() === '') {
        return 'El nombre del conductor es obligatorio.';
    }
    return null;
}

export function validateSurname(surname) {
    if (surname.trim() === '') {
        return 'El apellido del conductor es obligatorio.';
    }
    return null;
}

export function validateNationality(nationality) {
    if (nationality.trim() === '') {
        return 'La nacionalidad es obligatoria.';
    }
    return null;
}

export function validateDob(dob) {
    if (dob.trim() === '') {
        return 'La fecha de nacimiento es obligatoria.';
    }
    return null;
}

export function validateDescription(description) {
    if (description.trim() === '') {
        return 'La descripción es obligatoria.';
    }
    return null;
}

export function validateTeams(teams) {
    if (teams.length === 0) {
        return 'Tienes que seleccionar una equipo.';
    }
    return null;
}
