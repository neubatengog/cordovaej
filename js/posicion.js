$('#mapa').height($(window).height() - (100 + $('[data-role=header]').height() - $('[data-role=footer]').height())); 

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
	navigator.notification.alert(
            'mensaje: ' + error.message + '\n',  // mensaje
            'codigo: '    + error.code    + '\n' ,            // titulo
            'error'                  // buttonName
        );
}

function actualizaMapa(position){
	//console.log("google maps")
	var longitud = position.coords.longitude;
	var latitud = position.coords.latitude;
	var latlong = new google.maps.LatLng(latitud, longitud);
	var mapOptions = {
		center: latlong,
		zoom : 18
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
     map.setCenter(marker.getPosition());
     //console.log(latlong);
}

navigator.geolocation.getCurrentPosition(actualizaMapa, onError);
var watchID = navigator.geolocation.watchPosition(cambiarPosicionMarcador, onError, { timeout: 60000 });



