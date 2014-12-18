var pictureSource;   // Permitirá obtener la Fuente de la Foto
var destinationType;// Permitirá Definir el formato de retorno


// Esta función es llamada cuando la foto es obtenida satisfactoriamente
function onPhotoDataSuccess(imageData) {
    // Get image handle
    var smallImage = document.getElementById('smallImage');
 
    // Mostrar elemento de imagen
    smallImage.style.display = 'block';
 
    // Mostrar la foto capturada
    smallImage.src = "data:image/jpeg;base64," + imageData;
}
 
//Esta función es llamada por el botón que agregamos en el fichero /index.html
function capturarFoto() {
    // Tomar foto usando la cámara del dispositivo y devolviendo una imagen en formato 
    // string de base64 encodificado
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { 
        quality: 50,
        correctOrientation: true,
        destinationType: navigator.camera.DestinationType.DATA_URL 
    });
}
 
//En caso de que exista un fallo durante la llamada de la interfaz con la cámara del dispositivo 
//Se dispara el llamado a esta función 
function onFail(message) {
   navigator.notification.alert(
            message,  
            'Error',         
            'error en camara'                 
        );
}

