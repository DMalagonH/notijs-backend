## Especificaciones del API

### Métodos HTTP permitidos

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
	
	Request [GET] /notice/list/:user_id/:num_items?
	Response:
	[
		{
			"id":		"1654sdfssk6",
			"title":	"Título",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-10-02T12:39:25.239Z",
			"img":		"/imgs/image.jpg",
			"url":		"http://www.google.com",
			"user_id":	"1467",
			"read":		false
		},
		{
			"id":		"sd545433dw45",
			"title":	"Título segunda notificación",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-10-02T12:39:25.239Z",
			"img":		null,
			"url":		"/url/a/aplicacion",
			"user_id":	"1467",
			"read":		true
		},
		{
			"id":		"5d5a6fa657e4",
			"title":	"Título tercera notificación",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-10-02T12:39:25.239Z",
			"img":		"http://url/de/la/imagen",
			"url":		null,
			"user_id":	"1467",
			"read":		true
		},
	]

### Consultar cantidad de notificaciones sin leer
	Request [GET] /notice/unread/:user_id
	Response:
	{
		"unread": 5
	}

### Crear notificación
	Request [POST] /notice
	{
		"notice":{
			"title":	"Nueva notificación",
			"body":		"Contenido de la nueva notificación",
			"img":		"/imgs/image.jpg",							//Opcional
			"url":		"http://url/de/la/notificación",			//Opcional
			"user_id":	"123"	
		}
	}
	Response:
	{
		"notice":{
			"id":		"16a54asddfs",
			"title":	"Nueva notificación",
			"body":		"Contenido de la nueva notificación",
			"datetime":	"2014-10-02T12:39:25.239Z",
			"img":		"/imgs/image.jpg",
			"url":		"http://url/de/la/notificación",
			"user_id":	"123",
			"read":		false
		}
	}

### Crear notificación para varios usuarios
	Request [POST] /notice/multi
	{
		"notice":{
			"title":	"Nueva notificación",
			"body":		"Contenido de la nueva notificación",
			"img":		"/imgs/image.jpg",							//Opcional
			"url":		"http://url/de/la/notificación"				//Opcional
		},
		"users":[
			"1",
			"2",
			"3",
			...
		]
	}
	Response code:	200

### Marcar notificación como leída
	Request [PATCH] /notice/read
	{
		"mark_as_read":{
			"id":		"16a54asddfs",
			"user_id":	"123"
		}
	}
	Response code:	200
	Reponse:
	{
		afected: 1
	}


### Marcar todas las notificaciones como leidas
	Request [PATCH] /notice/read
	{
		"mark_as_read":{
			"user_id":	"123",
		}
	}
	Response code:	200
	Reponse:
	{
		afected: 7
	}


### Eliminar una notificación
	Request [DELETE] /notice
	{
		"delete":{
			"id":		"16a54asddfs",
			"user_id":	"123",
		}
	}
	Response code:	200
	Reponse:
	{
		deleted: 1
	}

### Eliminar todas las notificaciones
	Request [DELETE] /notice
	{
		"delete":{
			"user_id":	"123",
		}
	}
	Response code:	200
	Reponse:
	{
		deleted: 20
	}

### Enviar notificación instantánea a todos los usuarios
	Request [POST] /notice/flash
	{
		"notice":{
			"title":	"Nueva notificación",
			"body":		"Contenido de la nueva notificación",
			"img":		"/imgs/image.jpg",							//Opcional
			"url":		"http://url/de/la/notificación"				//Opcional
		}
	}
	Response code:	200


### Enviar notificación instantanea a algunos usuarios
	Request [POST] /notice/flash
	{
		"notice":{
			"title":	"Nueva notificación",
			"body":		"Contenido de la nueva notificación",
			"img":		"/imgs/image.jpg",							//Opcional
			"url":		"http://url/de/la/notificación"				//Opcional
		},
		"users":[
			"1",
			"2",
			"3",
			...
		]
	}
	Response code:	200
