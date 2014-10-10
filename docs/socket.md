## Especificaciones del socket

### Conexión
    <script type="text/javascript" src="http://localhost:2100/socket.io/socket.io.js"></script>

    var socket = io.connect("/Notijs");

### Eventos de envío (emit)

#### Indentificación de conexión
    var user_id = "1"; // Debe ser un string

    socket.emit("connection", {
        "user_id":  user_id
    });

### Eventos de recepción (on)

#### Notificaciones
    socket.on("notice", function(notice){
        // code to add to GUI
    });

    Estructura de notice:
    {
        "id":       "16a54asddfs",
        "title":    "Nueva notificación",
        "body":     "Contenido de la nueva notificación",
        "datetime": "2014-10-02T12:39:25.239Z",
        "img":      "/imgs/image.jpg",
        "url":      "http://url/de/la/notificación",
        "user_id":  "123",
        "read":     false
    }

#### Notificaciones instantáneas
    socket.on("flashNotice", function(notice){
        // code to add to GUI
    });

    Estructura de notice:
    {
        "title":    "Nueva notificación",
        "body":     "Contenido de la nueva notificación",
        "img":      "/imgs/image.jpg",                          //Opcional
        "url":      "http://url/de/la/notificación"             //Opcional
    }
