# NOTIJS
Notijs es una aplicación que permite crear notificaciones para usuarios al estilo facebook. Esta construida en NodeJS con persistencia de datos en MongoDB.

## Instalación

```shell
	$ git clone https://github.com/DMalagonH/notijs.git
	$ cd notijs
	$ npm install
	$ cp config/params_default.js config/params.js
```

## Especificaciones del API

### Metodos HTTP permitidos

|  Método  |              Descripción               	|
| -------- | -------------------------------------------|
| `GET`    | Obtener un recurso o lista de recursos 	|
| `POST`   | Crear un recurso                       	|
| `PUT`    | Actualizar un recurso completo         	|
| `PATCH`  | Actualizar uno o varios campos del recurso |
| `DELETE` | Eliminar un recurso                    	|


### Códigos de Respuesta

| Código |                         Descripción                          |
| ------ | ------------------------------------------------------------ |
| `200`  | Success                                                      |
| `201`  | Success - nuevo recurso creado.                              |
| `204`  | Success - no hay contenido para responder                    |
| `400`  | Bad Request - i.e. su solicitud no se pudo evaluar           |
| `401`  | Unauthorized - usuario no esta autenticado para este recurso |
| `404`  | Not Found - recurso no existe                                |
| `422`  | Unprocessable Entity - i.e. errores de validación            |
| `429`  | Limite de uso excedido, intente mas tarde                    |
| `500`  | Error de servidor                                            |
| `503`  | Servicio no disponible                                       |

### Consultar notificaciones del usuario
	
	Solicitud [POST] /notice/:user_id
	[
		{
			"_id":		"1654sdfssk6",
			"title":	"Título",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-09-03 12:51:00",
			"img":		"/imgs/image.jpg",
			"url":		"http://www.google.com",
			"user_id":	1467,
			"read":		false
		},
		{
			"_id":		"sd545433dw45",
			"title":	"Título segunda notificación",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-09-03 13:01:00",
			"img":		null,
			"url":		"/url/a/aplicacion",
			"user_id":	1467,
			"read":		true
		},
		{
			"_id":		"5d5a6fa657e4",
			"title":	"Título tercera notificación",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-09-03 13:10:00",
			"img":		"http://url/de/la/imagen",
			"url":		null,
			"user_id":	1467,
			"read":		true
		},
	]