// Importa las acciones de Redux y funciones de validación desde otros módulos
import { createDriver } from '../../redux/actions';
import {
    validateName,
    validateSurname,
    validateNationality,
    validateDob,
    validateDescription,
    validateTeams,
} from './Validation';

// Define una función llamada 'handleSubmit' que se exporta para su uso en otros módulos
export function handleSubmit(event, driverData, setErrors, dispatch, setDriverData) {
    // Previene el comportamiento por defecto de un evento (en este caso, la recarga de la página al enviar un formulario)
    event.preventDefault();

    // Verifica si la propiedad 'image' en 'driverData' está vacía o es 'null', y la establece como una cadena vacía si es necesario
    if (!driverData.image) {
        driverData.image = ''; 
    }

    // Realiza validaciones en los datos del conductor y almacena los errores en un objeto 'errors'
    const errors = {
        name: validateName(driverData.name),
        surname: validateSurname(driverData.surname),
        nationality: validateNationality(driverData.nationality),
        dob: validateDob(driverData.dob),
        description: validateDescription(driverData.description),
        teams: validateTeams(driverData.teams),
    };

    // Actualiza el estado de los errores utilizando la función 'setErrors'
    setErrors(errors);

    // Comprueba si no hay errores en ninguna de las validaciones realizadas
    const noErrors = Object.values(errors).every((error) => !error);

    // Si no hay errores, envía los datos del conductor utilizando la acción 'createDriver' y luego limpia los campos del formulario
    if (noErrors) {
        dispatch(createDriver(driverData));
        setDriverData({
            name: '',
            surname: '',
            nationality: '',
            image: null,
            dob: '',
            description: '',
            teams: [],
        });
    }
}

// Define una función llamada 'handleInputChange' que actualiza el estado de 'driverData' cuando cambian los valores de los campos del formulario
export function handleInputChange(event, driverData, setDriverData) {
    // Extrae el nombre y el valor del campo del evento
    const { name, value } = event.target;
    
    // Actualiza el estado de 'driverData' con el nuevo valor
    setDriverData({ ...driverData, [name]: value });
}

// Define una función llamada 'handleImageChange' que actualiza el estado de 'driverData' cuando se selecciona una imagen
export function handleImageChange(event, driverData, setDriverData) {
    // Obtiene el archivo de imagen seleccionado del evento
    const imageFile = event.target.files[0];
    
    // Actualiza el estado de 'driverData' con la nueva imagen seleccionada
    setDriverData({ ...driverData, image: imageFile });
}
