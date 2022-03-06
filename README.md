# Cloris

Sistema de monitorización y automatización para huertos caseros.

## Introducción

Cloris es un sistema de monitorización y automatización del riego para pequeños huertos caseros. Monitoriza la temperatura y humedad del aire y también la humedad del terreno. En su versión final, Cloris será capaz de regar el huerto de forma autónoma librándolo de toda atención humana.

## Índice
1. Descripción técnica
2. Despliegue y uso del proyecto
3. Demostración

## 1. Descripción técnica
### Fases del proyecto

El proyecto se ha dividido en tres fases que se realizarán de modo iterativo:
1. **Monitorización:** El sistema recoge los datos del ambiente y permite visualizarlos en una aplicación web o móvil. Solamente se recoge y presenta la información.
2. **Análisis de datos e interacción:** El sistema monitoriza los datos y envía alertas al usuario cuando se dan determinados parámetros (por ejemplo, la humedad del terreno es inferior a cierto valor). El usuario puede activar y desactivar el riego a través de la aplicación.
3. **Autonomía:** El sistema se comporta de forma autónoma regando automáticamente cuando es necesario de acuerdo a un conjunto de condiciones especificadas por el usuario. El huerto debería mantenerse sin ninguna ayuda humana.

### Fase 1: monitorización.

#### Arquitectura
Para esta fase, se define la siguiente arquitectura que será la base de todo el proyecto. Se opta por un esquema microlítico, ya que no se prevee una dimensión del proyecto que justifique un enfoque basado en microservicios que lo único que haría sería añadir una complejidad y problemas innecesarios.

Los dispositivos se comunican con un servidor que almacenará la información en una base de datos NoSQL, ya que dada la naturaleza de los datos un modelo de persistencia orientado a documentos parece muy adecuado. Consta además de un pequeño módulo de validación de datos para verificar que la medida enviada por los sensores no contiene valores disparatados debido a un posible mal funcionamiento de estos. Se ofrecerá también un pequeño front-end que servirá para presentar la información.

Los dispositivos serán los clientes y por tanto los que establecerán conexión con el servidor y enviarán los datos. No será el servidor quien pregunte a los dispositivos por los datos y estos respondan con la información. La razón es que en futuras iteraciones, es posible que se optimice el funcionamiento de los dispositivos para que funcionen con baterías o paneles solares. Para conseguir esto, los dispositivos entrarán en un modo de sueño profundo que les impedirá conectarse a la red y por tanto no podrían escuchar ninguna petición. Serán estos dispositivos los que despertarán del sueño para enviar los datos al servidor y volver a su modo de *deep sleep*.

![](https://github.com/alexrcas/cloris/blob/master/data/cloris-arq.drawio.png)

En cuanto al esquema y flujo de datos, los sensores enviarán su respectiva información y el servidor la completará añadiendo un timestamp antes de insertarlas en base de datos. Nótese que las medidas de cada sensor son independientes y se insertan cada una en su propia colección.

![](https://github.com/alexrcas/cloris/blob/master/data/cloris-data.drawio.png)

Analizando el esquema un poco más de cerca, la comunicación se hará a través del protocolo HTTP mediante una API REST, con la excepción de que el sensor de riego se comunicará también vía websocket para transmitir en vivo la cantidad de agua utilizada. Una vez termina el riego, envía un mensaje HTTP con el total de agua utilizado y esta información es la que se almacena.

![](https://github.com/alexrcas/cloris/blob/master/data/cloris-details.drawio.png)

#### Modelo de datos
El modelo de datos es muy simple y sigue una estructuura no relacional, orientada a documentos. Existen dos documentos:

##### Measure
Representa una medida obtenida por el sensor de ambiente. Sus campos son muy descriptivos y no requieren explicación.
```
{
  _id: number,
  temperature: number,
  airHumidity: number,
  terrainHumidity: number,
  timestamp: datetime
}
```

##### Watering
Representa un riego. Un riego es la acción de verter una cierta cantidad de agua sobre el huerto.
```
{
  _id: number,
  litersUsed: number,
  timestamp: datetime
}
```

#### API
La API REST es muy sencilla y ni siquiera consta de todas las operaciones CRUD, ya que en principio modificar el valor de una medida no es necesario.

##### Endpoints

###### Obtener medidas

```
GET /measures
```

Queryparams: 
* from: fecha mínima de las medidas (YYYY-MM-DD)
* to: fecha máxima de las medidas (YYYY-MM-DD)

Ejemplo:
```
GET /measures?from=2022-01-01&to2022-01-15
```

###### Obtener una medida
```
GET /measures/id
```

###### Almacenar una medida
```
POST /measures
body:
{
  temperature: number,
  airHumidity: number,
  terrainHumidity: number
}
```

###### Eliminar una o todas las medidas
```
DELETE /measures
DELETE /measures/id
```

###### Obtener los riegos
```
GET /waterings
```

Queryparams: 
* from: fecha mínima de las medidas (YYYY-MM-DD)
* to: fecha máxima de las medidas (YYYY-MM-DD)

###### Obtener un riego
```
GET /waterings/id
```

###### Almacenar un riego
```
POST /waterings
body:
{
  litersUsed: number
}
```

###### Eliminar uno o todos los riegos
```
DELETE /waterings
DELETE /waterings/id
```

###### Riego en curso (websocket)
```
onWatering 
data: {
  currentLitersUsed: number
}
```

### Hardware

Se dispondrá de tres pequeños dispositivos:
1. Sensor *Dirce*: encargado de monitorizar la cantidad de agua empleada en los riegos.
2. Sensor *Temis*: responsable de monitorizar la temperatura y humedad del aire junto con la humedad del terreno.
3. Hebe: responsable de abrir o cerrar el paso del agua para regar.

Todos los dispositivos utilizan un módulo **ESP8266** para las comunicaciones vía WIFI y como microcontrolador. Los dispositivos estarán programados en **C**. Para la primera fase del proyecto (solo monitorización), serán necesarios los dos primeros sensores, mientras que a partir de la segunda fase (control del riego) será necesario el tercer dispositivo. En una primera versión los dispositivos serán alimentados por cable. Posteriormente podrían ser optimizados para utilizar baterías y funcionar de forma inalámbrica durante meses, a excepción del dispositivo *Hebe*, que necesariamente debe estar conectado siempre a una fuente de energía con suficiente potencia.

#### Sensor *Dirce*
Está compuesto por:
* ESP8266
* Caudalímetro Y-22

Se trata de un monitor de caudal de agua. Monitoriza el líquido que atraviesa la tubería y envía información relativa al riego. Es muy importante aclarar el concepto de **riego**. Un *riego* se entiende como una cantidad de agua ininterrumpida con un inicio y un fin en el tiempo. Por ejemplo:
```
12:00:00 - No circula agua por la tubería
12:00:01 - Comienza a circular agua (inicio del riego y riego en curso)
12:00:25 - El flujo del agua se detiene (fin del riego)
```
Lo descrito anteriormente se considera **un riego**. Una vez que se detiene el flujo de agua el riego finaliza. Si un segundo después de haberse detenido este flujo volviese a circular agua por la tubería, se consideraría un segundo riego. Dicho esto, el sensor envía dos tipos de información:

* Cantidad de agua empleada en tiempo real a través de *websocket* durante el transcurso del riego.
* Cantidad total de agua empleada al finalizar el riego.

#### Sensor *Temis*
Está compuesto por:
* ESP8266
* Sensor de temperatura y humedad del aire DHT-22
* Sensor de humedad del terreno **[NOMBRE]**

Envía cada cierto tiempo información relativa a la temperatura del aire, humedad del mismo y humedad del terreno.

#### Dispositivo *Hebe*
Está compuesto por:
* ESP8266
* Dispositivo para controlar el riego (bomba o electroválvula)

Este dispositivo será el *interruptor* que abrirá o cerrará el paso del agua para efectuar un riego. En función del coste y las dificultades técnicas se decidirá llegado el momento por utilizar una electroválvula o simplemente una pequeña bomba que traslade el agua de un depósito al terreno. Esta cuestión es trivial por ahora, ya que el concepto de enviar una señal eléctrica para ejecutar una acción es independiente de que esta señal llegue a una electroválvula o a un relé que active la bomba.


### Tecnologías empleadas

Este trabajo tiene también como objetivo el aprendizaje, la prueba y la exploración de nuevas herramientas y tecnologías, por lo que el listado aquí propuesto no necesariamente posee una fuerte justificación desde el punto de vista técnico. Es posible también que se incorporen más elementos o se repitan módulos en varias tecnologías (por ejemplo una app móvil en Ionic y otra en Flutter). Como base para una primera iteración del proyecto se plantean las siguientes:

#### Back-end
* NodeJS
* Nest
* Typescript

#### Base de datos
* MongoDB

#### Front-end
* React
* Typescript

#### Aplicación móvil
* Ionic o Flutter

#### Hardware (dispositivos)
* C / C++ (puede que se explore MicroPython)

#### Virtualización
* Docker

### 2. Despliegue y uso del proyecto

El proyecto se ofrece virtualizado con *docker* y *docker compose*. Además de para facilitar su despliegue, evitar instalaciones y otras ventajas, se opta por esta técnica debido a la gran volatilidad e inestabilidad del mundo de Javascript, que podría hacer que en un futuro a relativo corto plazo el proyecto dejase de arrancar por problemas de dependencias, versiones y compatibilidades. De esta forma, se garantiza un ecosistema virtualizado que siempre funcionará independientemente del tiempo o la plataforma.

Para desplegar el proyecto únicamente debe ejecutarse el dichero de *docker compose*, mapeando el puerto del contenedor del servidor al de la máquina anfitrión. Los componentes del proyecto se han desglosado (en grandes bloques, no se trata de microservicios) para facilitar la modularidad y el desarrollo de otras aplicaciones que se apoyen en el trabajo ya realizado. Se proveen por tanto tres contenedores:

* Base de datos: contenedor de MongoDB.
* Servidor: contenedor que contiene el servidor NodeJS y es el eje central del proyecto mediante la API REST que usan dispositivos y otras aplicaciones.
* Front-end: contenedor que contiene una sencilla aplicacion web.

Con este diseño es posible engancharse solo a determinadas partes del proyecto, utilizando todo el trabajo o bien sustituyendo o acoplando otras partes del mismo. Por ejemplo, puede configurarse el contenedor del servidor para que utilice otra base de datos o puede no desplegarse el front-end y construirse otro. También sería sencillo llevar el proyecto a la nube parcial o totalmente para poder acceder a los datos desde cualquier lugar.

![](https://github.com/alexrcas/cloris/blob/master/data/cloris-compose.png)

### 3. Demostración
