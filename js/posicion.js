var map;
var marker;

//Coordenadas gps
function onRecibidas(position) {
    var element = document.getElementById('gps');
    element.innerHTML = '<li><p><h1>Latitud:</h1>'+ position.coords.latitude + ' ' +
                        '<h1>Longitud:</h1>' + position.coords.longitude     + '</p></li>';
     actualizaMapa(position);
    //console.log('Latitud:'+ position.coords.latitude + ' Longitud:' + position.coords.longitude);
}

//Error recibido de posicion 
function onError(error) {
    alert('codigo: '    + error.code    + '\n' +
          'mensaje: ' + error.message + '\n');
}

function actualizaMapa(position){
	console.log("google maps")
	var longitud = position.coords.longitude;
	var latitud = position.coords.latitude;
	var latlong = new google.maps.LatLng(latitud, longitud);
	var mapOptions = {
		center: latlong,
		zoom : 16
	};

	map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
	marker = new google.maps.Marker({
              position: latlong,
              map: map,
              title: 'yo estoy aqui'
          });
	
}

function cambiarPosicionMarcador(position) {
     var latlong=new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     marker.setPosition(latlong);
     console.log(latlong);
}


navigator.geolocation.getCurrentPosition(actualizaMapa, onError);
var watchID = navigator.geolocation.watchPosition(cambiarPosicionMarcador, onError, { timeout: 60000 });


