

var per = {
    db: null,

    initialize: function() {
        console.log("<<Funcion init>>");
        this.openDb();
        // this.bindEvents();
        this.createTable();
        this.recargar();
    },

    //bindEvents: function() {
     //   document.addEventListener('deviceready', this.openDb, false);
       
    //},
    
    openDb: function() {
        //if (window.navigator.simulator === true) {
        //console.log(" << websql plugin >>");
            this.db = window.openDatabase("Todo", "1.0", "Cordova Demo", 200000);
        //}
        //else {
         //   console.log(" << sqlite plugin >>");
         //   this.db = window.sqlitePlugin.openDatabase({name: "Todo.db"});
        //}
    },
      
    createTable: function() {
        var db = this.db;
        db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS todo(ID INTEGER PRIMARY KEY ASC, todo TEXT, added_on DATETIME)", []);
        });
    },
      
    addTodo: function(todoText) {
        var db = this.db;
        db.transaction(function(tx) {
            var addedOn = new Date();
            tx.executeSql("INSERT INTO todo(todo, added_on) VALUES (?,?)",
                      [todoText, addedOn],
                      null,
                      this.onError);
        });
        this.recargar();
        console.log("<<<addTodo>>");
    },
      
    onError: function(tx, e) {
        console.log("<<<< Error: " + e.message + ">>>>>");
    }, 
      
   
      
    deleteTodo: function(id) {
        var db = this.db;
        db.transaction(function(tx) {
        tx.executeSql("DELETE FROM todo WHERE ID=?", [id],
                        this.recargar,
                        this.onError);
        });
         this.recargar();
        console.log("<<deleTodo>>");
    },

    recargar: function(){
        var renderTodo = function (row) {
            return  "<li data-icon='delete'><a href='javascript:void(0);' onclick='per.deleteTodo(" + row.ID + ");'> "+ row.todo + "</a></li>";
        }
    
        var render = function (tx, rs) {
            var rowOutput = "";
            for (var i = 0; i < rs.rows.length; i++) {
                rowOutput += renderTodo(rs.rows.item(i));
            }
            $('#todoItems').html( rowOutput );
            $('ul#todoItems').listview('refresh');
        }
        var db = this.db;
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM todo", [], render, onError);
        });
        console.log("<<recargar>>");
   
    } 

};


per.initialize();


function addTodo() {
        per.addTodo($( "#todo" ).val());
        $("#todo").val('');
};
