# TpClinicaLabo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.1.

## App Hosting

Podes navegar por al app en [Link de la app](https://tp-clinica-labo-iv.web.app/)

## **Inicio**

Al ingresar a la web [url](https://tp-clinica-labo-iv.web.app/) se mostrará una
pantalla **Home**

![](/src/assets/readme/1.screen-home-clinica.gif)

El usuario podrá:
- **Iniciar Sesión** _(Login)_
- **Registrarse como Especialista**
- **Registrarse como Paciente**

### **Log In**

En esta ventana si el usuario verifico su email, y en caso de ser especialista
ha sido aceptado por el administrador, podrá ingresar a su apartado para navegar
por la aplicación. Además a la derecha de la pantalla se muestran los accesos
rápido a cada perfil.

![](/src/assets/readme/4.screen-login.gif)

### **Registrarse Como Especialista**

Se mostrará un formulario de alta con los datos importantes para dar de alta
a un especialista dentro de nuestra clinica.

![](/src/assets/readme/3.screen-register-especialista.gif)

### **Registrarse Como Paciente**

Se mostrará un formulario de alta con los datos importantes _(nombre, apellido, DNI, edad, email, contraseña, foto de perfil, credencial y seleccionar una obra social)_ para dar de alta
a un paciente dentro de la clinica.

![](/src/assets/readme/2.screen-register-paciente.gif)

## **Como Especialista**

### **Home**

Se mostrará el Home del apartado de especialistas, donde podrá redirigirse a las
distintas ventanas de la aplicación.

![](/src/assets/readme/11.-esp-home.gif)

### **Mi Perfil**

Será capaz de visualizar su información personal y su jornada laboral _(mis-horarios)_,
donde podrá agregar horarios disponibles a su jornada en los distintos consultorios
que ofrece la clinica.

![](/src/assets/readme/12.-esp-mi-perfil-horarios.gif)

### **Mis Turnos**

El especialista será capaz de ver su jornada de turnos y realizar la acción que 
crea correspondiente _(aceptar turno, rechazarlo, cancelarlo, finalizarlo, dejar un comentario)_.

![](/src/assets/readme/13.-esp-mis-turnos.gif)


## **Como Paciente**

### **Home**

Se mostrará el Home del apartado del paciente, donde podrá redirigirse a las
distintas ventanas de la aplicación.

![](/src/assets/readme/14.-pac-home.gif)

### **Solicitar Turno**

Para poder solicitar un turno, el paciente deberá de seleccionar la especialida
que requiera y luego al especialista que crea conveniente. Para luego mostrar el 
día _(dentro de los próximos 15 días)_ y los horarios disponibles del mismo, siempre
y cuando este horario no haya sido reservado por otro paciente de la clínica.

![](/src/assets/readme/16.-pac-solicitar-turno.gif)

### **Mis Turnos**

El paciente podrá ver el historial de sus turnos y sus estados, además
podrá calificar la atención del especialista, cancelar el turno y ver
la reseña proveída por su especialista.

![](/src/assets/readme/17.-pac-visualizar-mis-turnos.gif)

## **Como Administrador**

### **Mi Perfil**

Será capaz de visualizar la información de su perfil.

![](/src/assets/readme/5.admin-home.png)

### **Administrar Especialistas**

El administrador podrá visualizar a los especialistas de la clínica, 
podrá habilitarlos y deshabilitarlos, además será capaz de dar de alta
nuevos especialistas si lo requiere.

![](/src/assets/readme/6.-admin-especialistas.gif)

### **Administrar Pacientes**

El administrador podrá visualizar a los pacientes de la clínica con todos
sus datos, tambíen podrá dar de alta nuevos pacientes si lo requiere.

![](/src/assets/readme/7.-admin-pacientes.gif)

### **Administrar Administradores**

El administrador será capaz de dar de alta a otros administradores
dentro de la clínica.

![](/src/assets/readme/8.admin-admin.gif)

### **Dar Turnos**

De la misma forma que un paciente puede solicitar un turno por
sus propios medios, el administrador también. Siendo la unica 
diferencia que deberá de seleccionar al paciente al cual le quiere
adjudicar el turno.

![](/src/assets/readme/9.-admin-solicitar-turno.gif)

### **Visualizar Turnos**

Será capaz de visualizar los turnos de la clínica, filtrando por
especialista, especialidad o directamente visualizando todos los
turnos sin reestricción alguna.

![](/src/assets/readme/10.-admin-turnos.gif)