var app = {
    // Applicacion Constructor
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
        window.addEventListener('batterystatus',app.onBatteryStatus, false); 
        window.addEventListener('batterycritical', app.onBatteryCritical, false);
        app.checkConnection();
    },
    
    onOnline: function() {
   		//Se captura y gestiona el evento online
   		$('#evento').html( '<li><h2>Estado:</h2>Usted esta Online</li>');
      $('ul#evento').listview('refresh');
       app.checkConnection();
	 },

  	onOffline: function() {
  		//Se captura y gestiona el evento offline
      navigator.notification.alert("offline", null, "titulo", "salir");
      $('#evento').html('<li data-icon="plus"><h2>Estado:</h2>Usted esta Offline</li>');   		
      $('ul#evento').listview('refresh');  
      app.checkConnection();
	 },

   vibrar: function() {
        navigator.notification.vibrate(2000);
    },


    sonarBeep: function() {
        navigator.notification.beep(3);
    },

    mostrarAlerta: function(){
        navigator.notification.alert(
            'el mensaje!',  // message
            'el titulo',    // title
            'nombre ventana' // buttonName
        );
    },

    onBatteryStatus: function(info) {
        $('#bateria').html('<li><h2>Bateria</h2> carga: ' + info.level + '% cargando: ' + info.isPlugged +'</li>');
        $('ul#bateria').listview('refresh');
    },

    onBatteryCritical: function(info) {
       $('#critica').html( '<li><h2>Bateria nivel critico/h2>' + + info.level + '</li>' );
       $('ul#critica').listview('refresh');
    },


    checkConnection: function() {
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
      //Actualizamos el DOM para actualizar el texto del parrafo 
      //dentro de la sección con el id = "conexion"
      $('#conexion').html( '<li><h2>Tipo conexion</h2>' + states[networkState] + '</li>' );
      $('ul#conexion').listview('refresh');
    },

    // para efectos de log
    receivedEvent: function(id) {
      //console.log('===========================>Evento recibido: ' + id);  
      return; 
    }
};


app.initialize();






 

 

 
