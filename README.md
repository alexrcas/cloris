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

Los dispositivos se comunican con un servidor que almacenará la información en una base de datos NoSQL, ya que dada la naturaleza de los datos un modelo de persistencia orientado a documentos parece muy adecuado. El servidor será responsable también de servir la aplicación web. Consta además de un pequeño módulo de validación de datos para verificar que la medida enviada por los sensores no contiene valores disparatados debido a un posible mal funcionamiento de estos.

Los dispositivos serán los clientes y por tanto los que establecerán conexión con el servidor y enviarán los datos. No será el servidor quien pregunte a los dispositivos por los datos y estos respondan con la información. La razón es que en futuras iteraciones, es posible que se optimice el funcionamiento de los dispositivos para que funcionen con baterías o paneles solares. Para conseguir esto, los dispositivos entrarán en un modo de sueño profundo que les impedirá conectarse a la red y por tanto no podrían escuchar ninguna petición. Serán estos dispositivos los que despertarán del sueño para enviar los datos al servidor y volver a su modo de *deep sleep*.

![](https://github.com/alexrcas/cloris/blob/master/data/cloris-arq.drawio.png)

En cuanto al esquema y flujo de datos, los sensores enviarán su respectiva información y el servidor la completará añadiendo un timestamp antes de insertarlas en base de datos. Nótese que las medidas de cada sensor son independientes y se insertan cada una en su propia colección.

![](https://github.com/alexrcas/cloris/blob/master/data/cloris-data.drawio.png)

Analizando el esquema un poco más de cerca, la comunicación se hará a través del protocolo HTTP mediante una API REST, con la excepción de que el sensor de riego se comunicará también vía websocket para transmitir en vivo la cantidad de agua utilizada. Una vez termina el riego, envía un mensaje HTTP con el total de agua utilizado y esta información es la que se almacena.

![](https://github.com/alexrcas/cloris/blob/master/data/cloris-details.drawio.png)

### Modelo de datos
El modelo de datos es muy simple y sigue una estructuura no relacional, orientada a documentos. Existen dos documentos:

#### Measure
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

#### Watering
Representa un riego. Un riego es la acción de verter una cierta cantidad de agua sobre el huerto.
```
{
  _id: number,
  litersUsed: number,
  timestamp: datetime
}
```

### API
La API REST es muy sencilla y ni siquiera consta de todas las operaciones CRUD, ya que en principio modificar el valor de una medida no es necesario.

#### Endpoints

##### Obtener medidas

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

##### Obtener una medida
```
GET /measures/id
```

##### Almacenar una medida
```
POST /measures
body:
{
  temperature: number,
  airHumidity: number,
  terrainHumidity: number
}
```

##### Eliminar una o todas las medidas
```
DELETE /measures
DELETE /measures/id
```

##### Obtener los riegos
```
GET /waterings
```

Queryparams: 
* from: fecha mínima de las medidas (YYYY-MM-DD)
* to: fecha máxima de las medidas (YYYY-MM-DD)

##### Obtener un riego
```
GET /waterings/id
```

##### Almacenar un riego
```
POST /waterings
body:
{
  litersUsed: number
}
```

##### Eliminar uno o todos los riegos
```
DELETE /waterings
DELETE /waterings/id
```

#### Riego en curso (websocket)
```
onWatering
data: {
  currentLitersUsed: number
}
```

## Hardware



Con los puntos descritos anteriormente debería ser suficiente para lograr concluir la primera fase del proyecto: obtener un sistema de monitorización sin ofrecer ninguna interacción.
