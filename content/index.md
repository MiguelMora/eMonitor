# Monitor e-Salud

Esta es una demo, incompleta, e insegura, para ilustrar el uso de una arquitectura backendless en el ámbito de e-Salud.

Existen tres tipos de usuarios, administradores, personal, y el resto de usuarios

En la página [/users](/users), solo disponible al personal, se pueden ver todos los usuarios, y su rol.
En el caso del administrador, este puede asignarles un rol (user= usuario normal), una vez se han registrado en la aplicación.

Los datos se pueden ver en [/monitors](/monitors), en dicha página podemos ver la lista de eventos que se pueden monitorizar, seleccionar los que queremos mostrar, para ver su gráfica, o introducir nuevos valores.
El administrador también podrá crear nuevos tipos de eventos.

Se puede ver una versión online de la aplicación en: [https://esaludmonitor.web.app](https://esaludmonitor.web.app)

## Pendiente

- Es necesario mejorar las reglas de seguridad para evitar que los usuarios normales puedan ver datos que no son suyos, o cambiar su rol
- Crear un icono para la aplicación

## Posibles mejoras

- Se puede convertir en una PWA usando un plugin para NUXT
- Se podría crear algún mecanismo para anonimizar a los usuarios, por ejemplo mostrando un nick, en lugar del e-mail
- Cuando se selecciona ver los datos de un usuario, se descarga toda la información. Se podría añadir un filtro para ver los datos en un rango de fechas



