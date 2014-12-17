
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
        checkConnection();
}

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
}



