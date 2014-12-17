
//Coordenadas gps
function onRecibidas(position) {
    var element = document.getElementById('gps');
    element.innerHTML = '<li>Latitud: '  + position.coords.latitude      + '</li>' +
                        '<li>Longitud: ' + position.coords.longitude     + '</li>';
    //console.log('Latitud:'+ position.coords.latitude + ' Longitud:' + position.coords.longitude);
}

//Error recibido de posicion 
function onError(error) {
    alert('codigo: '    + error.code    + '\n' +
          'mensaje: ' + error.message + '\n');
}

// Opciones: error es gatillado si no es recibido en  20 segundos una posicion.
//
var watchID = navigator.geolocation.watchPosition(onRecibidas, onError, { timeout: 30000 });