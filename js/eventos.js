$('#mapa').height($(window).height() - (50 + $('[data-role=header]').height() - $('[data-role=footer]').height())); 

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listener
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //Se mapea el evento online con la función miembro onOnline
		    document.addEventListener('online', this.onOnline, false);
		    //Se mapea el evento offline con la función miembro onOffline
		    document.addEventListener('offline', this.onOffline, false);
    },
   
    onDeviceReady: function() {
        app.receivedEvent('dispositivo ok'); 
        window.addEventListener('batterystatus',onBatteryStatus, false); 
    },
    
    onOnline: function() {
   		//Se captura y gestiona el evento online
   		var pConectionType = document.getElementById('evento');
   		pConectionType.innerHTML = '<li><h2>Estado:</h2>Usted esta Online</li>';
      $('#evento:visible').listview('refresh');
      checkConnection();
	 },

  	onOffline: function() {
  		//Se captura y gestiona el evento offline
  		var pConectionType = document.getElementById('evento');
  		pConectionType.innerHTML = '<li data-icon="plus"><h2>Estado:</h2>Usted esta Offline</li>'; 
  		navigator.notification.alert("offline", null, "titulo", "salir");
      $('#evento:visible').listview('refresh');  
      checkConnection();	
	 },

    // para efectos de log
    receivedEvent: function(id) {
      //console.log('===========================>Evento recibido: ' + id);  
      return; 
    }
};


app.initialize();

function checkConnection() {
    //Capturamos los tipos de conexión detectables 
    var states = {};
        states[Connection.UNKNOWN]  = 'Conexión desconocida';
        states[Connection.ETHERNET] = 'Conexión Ethernet';
        states[Connection.WIFI]     = 'Conexión WiFi';
        states[Connection.CELL_2G]  = 'Conexión Cell 2G';
        states[Connection.CELL_3G]  = 'Conexión Cell 3G';
        states[Connection.CELL_4G]  = 'Conexión Cell 4G';
        states[Connection.CELL]     = 'Conexión Generica de Cell';
        states[Connection.NONE]     = 'No hay Conexión de red';
    
    //Obtenemos el Estado de la conexión
    var networkState = navigator.connection.type;
    
    //Lanzamos un mensaje de alerta al usuario indicando el tipo de Conexión
    //detectado
    //alert('Tipo de Connexion: ' + states[networkState]);
    
    //Actualizamos el DOM para actualizar el texto del parrafo 
    //dentro de la sección con el id = "conexion"
    var pConectionType = document.getElementById('conexion');
    pConectionType.innerHTML = '<li>' + states[networkState] + '</li>';
    $('#conexion:visible').listview('refresh');
}


function onBatteryStatus(info) {
   	var pBateria = document.getElementById('bateria');
	pBateria.innerHTML = '<li><h2>Bateria</h2> carga: ' + info.level + '% cargando: ' + info.isPlugged +'</li>';
  $('#bateria:visible').listview('refresh');
	//console.log("===========================>" + info.level);
 };

 function vibrar() {
        navigator.notification.vibrate(2000);
  }

 function sonarBeep() {
        navigator.notification.beep(3);
  } 

  function mostrarAlerta() {
        navigator.notification.alert(
            'el mensaje!',  // message
            'el titulo',            // title
            'nombre ventana'                  // buttonName
        );
  }
