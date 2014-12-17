document.addEventListener("deviceready", init, false);
document.addEventListener("touchstart", function() {}, false);

var per = {};
per.db = null;
      
per.openDb = function() {
   if (window.navigator.simulator === true) {
        // For debugin in simulator fallback to native SQL Lite
        console.log("Use built in SQL Lite");
        per.db = window.openDatabase("Todo", "1.0", "Cordova Demo", 200000);
    }
    else {
        per.db = window.sqlitePlugin.openDatabase("Todo");
    }
}
      
per.createTable = function() {
    var db = per.db;
    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS todo(ID INTEGER PRIMARY KEY ASC, todo TEXT, added_on DATETIME)", []);
    });
}
      
per.addTodo = function(todoText) {
    var db = per.db;
    db.transaction(function(tx) {
        var addedOn = new Date();
        tx.executeSql("INSERT INTO todo(todo, added_on) VALUES (?,?)",
                      [todoText, addedOn],
                      per.onSuccess,
                      per.onError);
    });
}
      
per.onError = function(tx, e) {
    console.log("Error: " + e.message);
} 
      
per.onSuccess = function(tx, r) {
    per.refresh();
}
      
per.deleteTodo = function(id) {
    var db = per.db;
    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM todo WHERE ID=?", [id],
                      per.onSuccess,
                      per.onError);
    });
}

per.refresh = function() {
    var renderTodo = function (row) {
        //console.log("<li><a href='#' onclick='per.deleteTodo(" + row.ID + ");'>" + row.todo + "</a></li>");
        return  "<li><a href='javascript:void(0);' class='ui-btn' onclick='per.deleteTodo(" + row.ID + ");'> "+ row.todo + "</a></li>";
    }
    
    var render = function (tx, rs) {
        var rowOutput = "";
        var todoItems = document.getElementById("todoItems");
        for (var i = 0; i < rs.rows.length; i++) {
            rowOutput += renderTodo(rs.rows.item(i));
        }
        
        todoItems.innerHTML =  rowOutput ;
        console.log(todoItems.innerHTML);

    }
    
    var db = per.db;
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM todo", [], 
                      render, 
                      per.onError);
    });
}
      
function init() {
    per.openDb();
    per.createTable();
    per.refresh();
}
      
function addTodo() {
    var todo = document.getElementById("todo");
    per.addTodo(todo.value);
    todo.value = "";
}
