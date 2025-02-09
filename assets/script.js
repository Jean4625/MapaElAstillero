// Variable para mantener el control de la foto activa
let activePhotoContainer = null;

// Función para reproducir el sonido y mostrar la foto sobre el marcador
function playSound(number, photo, top, left) {
    // Detener cualquier sonido que esté sonando
    var audios = document.querySelectorAll('audio');
    audios.forEach(audio => audio.pause());

    // Reproducir el sonido correspondiente
    var audio = document.getElementById('audio' + number);
    audio.play();

    // Si hay una foto activa, eliminarla
    if (activePhotoContainer) {
        activePhotoContainer.style.display = 'none';
        document.getElementById('map-container').removeChild(activePhotoContainer);
    }

    // Crear o mostrar la nueva foto sobre el marcador
    var photoContainer = document.createElement('div');
    photoContainer.classList.add('photo-container');

    // Ajustamos la posición de la foto para que aparezca sobre el marcador
    photoContainer.style.position = 'absolute';  // Aseguramos que esté sobre el mapa
    photoContainer.style.top = (top - 62) + 'px';  // Ajustamos la posición para que se vea centrada sobre el marcador
    photoContainer.style.left = (left - 50) + 'px'; // Lo mismo con la posición horizontal

    var img = document.createElement('img');
    img.src = photo;
    img.style.width = '200';  // Ajusta el tamaño de la imagen
    img.style.height = '267';
    photoContainer.appendChild(img);
    
    // Añadir la foto al contenedor del mapa
    document.getElementById('map-container').appendChild(photoContainer);

    // Mostrar la foto con un pequeño retraso para que se vea
    setTimeout(() => {
        photoContainer.style.display = 'block';
    }, 10); // Hace que la foto aparezca después de un pequeño retraso

    // Actualizar la foto activa
    activePhotoContainer = photoContainer;

    // Cuando el sonido termina, puedes hacer algo con la foto si es necesario
    audio.onended = function() {
        // Si quieres ocultar la foto automáticamente cuando el audio termine, puedes descomentar esta línea
        // activePhotoContainer.style.display = 'none';
    };
}

// Función para cerrar la miniatura cuando el mapa base es clickeado
document.getElementById('map-container').addEventListener('click', function(event) {
    // Verifica si el clic no fue en un marcador
    if (activePhotoContainer && !event.target.closest('.marker')) {
        activePhotoContainer.style.display = 'none'; // Ocultar la foto
        document.getElementById('map-container').removeChild(activePhotoContainer);
        activePhotoContainer = null; // Resetear la foto activa
    }
});
