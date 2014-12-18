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
	},
	onOffline: function() {
  		//Se captura y gestiona el evento offline
  		var pConectionType = document.getElementById('evento');
  		pConectionType.innerHTML = '<li data-icon="plus"><h2>Estado:</h2>Usted esta Offline</li>'; 
  		navigator.notification.alert("offline", null, "titulo", "salir");  	
	},

    // se actualiza el dom en un evento recibido
    receivedEvent: function(id) {
       /* var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Evento recibido: ' + id);
       
    }

};


app.initialize();

function onBatteryStatus(info) {
   	var pBateria = document.getElementById('bateria');
	pBateria.innerHTML = '<li><h2>Bateria</h2> carga: ' + info.level + '% cargando: ' + info.isPlugged +'</li>';
	console.log(info.level);
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
            'nombre boton'                  // buttonName
        );
    }
