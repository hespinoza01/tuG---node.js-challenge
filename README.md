# TuG - Node.js Challenge

## Express API para la reserva de habitaciones de un hotel

El proyecto consta de 5 apartados. Usuarios administradores, capaces de gestionar los distintos tipos de habitaciones y las prestaciones con las que cuentan las mismas (precio por noche, cantidad de camas disponibles, si cuenta o no con airecondicionado, tv o jacuzzi). Las habitaciones existentes, estas parten de los tipos de habitaciones mencionadas anteriormente, en este apartado se define la cantidad de habitaciones con las que cuenta el hotel. La gestión de los clientes, cada persona que realice un reservación debe contar con un registro previo de su infromación personal, de identificación y de contacto del mismo. El apartado de reversas, en este se define el cliente que la efectúa, la cantidad de días y la habítación en sí que se está reservando y finalmente, el apartado de pagos que registra los pagos realizados por los clientes al hotel producto de las reservas efectuadas.


## Ejecución
```bash
$ docker-compose up -d
```

## Uso

Dentro de la colección de **Postman** hay una carpeta por cada apartado o módulo del proyecto. El primer paso es acceder a la carpeta de **Admin Users** y crear un nuevo usuario, para posteriormente iniciar sesión y así poder realizar todas las operaciones que requieran privilegios del tipo administrativo (habilitar habitaciones, modificar los datos de una habitación existente, entre otros).

Sin necesidad de iniciar sesión, desde un inicio se pueden listar todas las habitaciones y tipos de habitaciones, las reservas y pagos realizados, así también como visualizar los distintos métodos de pago con los que se cuentan.

Las reservas requiren que exista una habitación dentro de los registros, así también como una persona (cliente) y un usuario administrador por lo que hay que verificar la existencia de estos entes antes de proceder con la realización de la reserva.
