// Importa el componente Landing
import Landing from './Landing';

// Define una función de prueba
function testLandingComponent() {
    // Crea un elemento div como contenedor
    const container = document.createElement('div');

    // Monta el componente Landing en el contenedor
    ReactDOM.render(<Landing />, container);

    // Accede al botón dentro del componente
    const button = container.querySelector('button');

    // Verifica que el botón esté presente en el DOM
    if (button) {
        console.log('El botón "Acelera!" está presente en la pantalla.');
    } else {
        console.error('El botón "Acelera!" no está presente en la pantalla.');
    }

    // Realiza una simulación de clic en el botón
    button.click();

    // Verifica que la URL de la página sea "/Home"
    if (window.location.pathname === '/Home') {
        console.log('La redirección a "/Home" ocurrió correctamente.');
    } else {
        console.error('La redirección a "/Home" no ocurrió correctamente.');
    }
}

// Ejecuta la función de prueba al cargar la página
testLandingComponent();
