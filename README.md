# Cloris

Sistema de monitorización y automatización para huertos caseros.

## Introducción

Cloris es un sistema de monitorización y automatización del riego para pequeños huertos caseros. Monitoriza la temperatura y humedad del aire y también la humedad del terreno. En su versión final, Cloris será capaz de regar el huerto de forma autónoma librándolo de toda atención humana.

## Fases del proyecto

El proyecto se ha dividido en tres fases que se realizarán de modo iterativo:
1. **Monitorización:** El sistema recoge los datos del ambiente y permite visualizarlos en una aplicación web o móvil. Solamente se recoge y presenta la información.
2. **Análisis de datos e interacción:** El sistema monitoriza los datos y envía alertas al usuario cuando se dan determinados parámetros (por ejemplo, la humedad del terreno es inferior a cierto valor). El usuario puede activar y desactivar el riego a través de la aplicación.
3. **Autonomía:** El sistema se comporta de forma autónoma regando automáticamente cuando es necesario de acuerdo a un conjunto de condiciones especificadas por el usuario. El huerto debería mantenerse sin ninguna ayuda humana.

## Fase 1: monitorización.

### Arquitectura
Para esta fase, se define la siguiente arquitectura que será la base de todo el proyecto. Se opta por un esquema microlítico, ya que no se prevee una dimensión del proyecto que justifique un enfoque basado en microservicios que lo único que haría sería añadir una complejidad y problemas innecesarios.
[IMAGEN]
Los dispositivos se comunican con un servidor que almacenará la información en una base de datos NoSQL, ya que dada la naturaleza de los datos un modelo de persistencia orientado a documentos parece muy adecuado. El servidor será responsable también de servir la aplicación web. Consta además de un pequeño módulo de validación de datos para verificar que la medida enviada por los sensores no contiene valores disparatados debido a un posible mal funcionamiento de estos.

En cuanto al esquema y flujo de datos, los sensores enviarán su respectiva información y el servidor la completará añadiendo un timestamp antes de insertarlas en base de datos. Nótese que las medidas de cada sensor son independientes y se insertan cada una en su propia colección.
[IMAGEN]

Analizando el esquema un poco más de cerca, la comunicación se hará a través del protocolo HTTP mediante una API REST, con la excepción de que el sensor de riego se comunicará también vía websocket para transmitir en vivo la cantidad de agua utilizada. Una vez termina el riego, envía un mensaje HTTP con el total de agua utilizado y esta información es la que se almacena.
[IMAGEN]

### API
La API REST es muy sencilla y ni siquiera consta de todas las operaciones CRUD, ya que en principio modificar el valor de una medida no es necesario.




