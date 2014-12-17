/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
       
    }

};
var pictureSource; 
var destinationType;

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
function capturePhoto() {
    // Tomar foto usando la cámara del dispositivo y devolviendo una imagen en formato 
    // string de base64 encodificado
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
     destinationType: Camera.DestinationType.DATA_URL });
}
 
//En caso de que exista un fallo durante la llamada de la interfaz con la cámara del dispositivo 
//Se dispara el llamado a esta función 
function onFail(message) {
   alert('Error debido a: ' + message);
}

app.initialize();

