//Create.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createDriver, getTeams } from '../../redux/actions';
import { Link } from 'react-router-dom';
import './Create.css'; // Importa el archivo CSS

// Importa las funciones de validación
import {
    validateName,
    validateSurname,
    validateNationality,
    validateDob,
    validateDescription,
    validateTeams,
} from './Validation';

const Create = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const opcionesEscuderias = useSelector((state) => state.teams);

    useEffect(() => {
        if (opcionesEscuderias.length === 0) {
            dispatch(getTeams())
                .then(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [opcionesEscuderias, dispatch]);

    const [driverData, setDriverData] = useState({
        forename: '',
        surname: '',
        nationality: '',
        image: null,
        dob: '',
        description: '',
        teams: [],
    });

    const [errors, setErrors] = useState({
        forename: '',
        surname: '',
        nationality: '',
        image: '',
        dob: '',
        description: '',
        teams: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        // Realiza las validaciones
        const nameError = validateName(driverData.forename);
        const surnameError = validateSurname(driverData.surname);
        const nationalityError = validateNationality(driverData.nationality);
        const dobError = validateDob(driverData.dob);
        const descriptionError = validateDescription(driverData.description);
        const teamsError = validateTeams(driverData.teams);

        // Actualiza los errores
        setErrors({
            forename: nameError,
            surname: surnameError,
            nationality: nationalityError,
            dob: dobError,
            description: descriptionError,
            teams: teamsError,
        });

        // Si no hay errores, envía el formulario
        if (!nameError && !surnameError && !nationalityError && !dobError && !descriptionError && !teamsError) {
            dispatch(createDriver(driverData));
            setDriverData({
                forename: '',
                surname: '',
                nationality: '',
                image: null,
                dob: '',
                description: '',
                teams: [],
            });
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDriverData({ ...driverData, [name]: value });
    };

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setDriverData({ ...driverData, image: imageFile });
    };

    const handleTeamsChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setDriverData({ ...driverData, teams:[...driverData.teams, ...selectedOptions] });
        //setDriverData({ ...driverData, teams: selectedOptions});

        console.log(driverData)
    };

    

    return (
        <div className="container">
           
            <div className="form-container">
                <h1>Crear Conductor</h1>
                {loading ? (
                    <p>Cargando opciones de escuderías...</p>
                ) : (
                    <form encType="multipart/form-data" onSubmit={handleSubmit}>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            id="forename"
                            name="forename"
                            value={driverData.forename}
                            onChange={handleInputChange}
                        />
                        {errors.forename && <div className="error">{errors.forename}</div>}

                        <label>Apellido:</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={driverData.surname}
                            onChange={handleInputChange}
                        />
                        {errors.surname && <div className="error">{errors.surname}</div>}

                        <label>Nacionalidad:</label>
                        <input
                            type="text"
                            id="nationality"
                            name="nationality"
                            value={driverData.nationality}
                            onChange={handleInputChange}
                        />
                        {errors.nationality && <div className="error">{errors.nationality}</div>}

                        <label>Imagen:</label>
                        <input
                            type="filehttps://imagenes.elpais.com/resizer/RTU--mDf2a2jeteyBFjrpyI29CY=/1200x0/filters:focal(2052x1240:2062x1250)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/PKRZJN2XG66V7BTAQC3EDZCBFI.jpg"
                            id="image"
                            name="image"
                            placeholder="Ingresa una URL"
                            onChange={handleImageChange}
                        />
                        {errors.image && <div className="error">{errors.image}</div>}

                        <label>Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={driverData.dob}
                            onChange={handleInputChange}
                        />
                        {errors.dob && <div className="error">{errors.dob}</div>}

                        <label>Descripción:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={driverData.description}
                            placeholder="Haz una pequeña reseña del driver."
                            onChange={handleInputChange}
                        ></textarea>
                        {errors.description && <div className="error">{errors.description}</div>}

                        <label>Escuderías:</label>
                        <select id="teams" multiple={true} value={driverData.teams} onChange={handleTeamsChange}>
                            {opcionesEscuderias && opcionesEscuderias?.map((escuderia) => (
                                <option key={escuderia.id} value={escuderia.name}>
                                    {escuderia.name}
                                </option>
                            ))}
                        </select>
                        {errors.teams && <div className="error">{errors.teams}</div>}

                        <button type="submit">Crear Driver</button>
                    </form>
                )}  
            </div>
        </div>
    );
};

export default Create;
