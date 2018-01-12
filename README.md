# Lunar landing
## Práctica html y css del luna lander

**Autor: Marc Antoni Román Martínez**

[Link del rawgit del luna lander](https://rawgit.com/Marcroman181/Lunar_Landing-JavaScript/master/index.html)

**Este repositorio contiene una branch con todo el codigo minimificado**

### Documentación

**Cambios realizados respecto al proyecto inicial:**

 -He cambiado el indicador de fuel puesto que este era un GIF y no era posible implementarlo. Por lo tanto el indicador de fuel lo he     realizado con 2 divs.
 
 -He cambiado el menú, puesto que este estaba compuesto por imagenes. Entonces, el menú esta hecho mediante un div. 

**HTML:**

El HTML tiene la siguiente estructura:

La pantalla està compuesta por varios contenedores principales:
  
  -El contenedor de la izquierda (llamado "a") contiene los tres indicadores del juego: El de altura compuesto por dos divs uno dentro del otro, y       el de velocidad y altura compuesto por un div con un fondo y dentro una imagen que nos indica el valor del indicador.
  
  -Un contenedor llamado "c" que contiene las opciones disponibles para interactuar con el juego y hará de menu para la versión de móvil.
  
  -El contenedor de la derecha que contiene 2 subcontenedores. El primero contiene el botón de reiniciar y el segundo el botón para acelerar el cohete. 
    
  -Un contenedor en el centro para centrar la nave.
    
  -Un contenedor en la parte inferior de la pantalla que contiene la luna. 
  
  -Un contenedor que contiene el resultado de la partida.
  
  -Por último, tenemos un contenedor que contiene todos los menús que van a aparecer en la pantalla.  Hay dos menús, el de configuración del juego para cambiar la dificultad y el menú para móvil.  

**CSS horizontal:**

Siguiendo la estructura del html:




  -Contenedor "c": Está fijado a la parte de la derecha superior y es visible para la verisón de ordenador. Dentro contie los botones ocupan un valor               porcentual a la altura del div y están colocado con un display. inline-block i float right. El botón de play estará sin visibilidad     mientras el de pausa esté y viceversa.
  
  -Contenedor de la derecha: Este contenedor està fijado a la parte derecha con un tamaño porcentual a la pantalla, y dentro hay los       2 contenedores colocados con posición absoluta y un tamaño porcentual respecto al anterior.  Las imagenes de reiniciar y botón de motor simplemente están posicionadas con un float right     y dimensionadas porcentualmente. Además, para añadir efectos al pulsar, se cambia de tamaño al pasar por encima con hover y scale, y     con active le damos un color de fondo para destacar cuando pulsamos. 
  
   -El contenedor de la izquierda: Este contenedor es parecido al anteior. El contenedor de fuel contiene otro contenedor dentro que       simula una barra. El contenedor de altura y velocidad contienen un fondo que no se repiten y una imagen posicionada adecuadamente       dentro que seria el indicador. Por otra parte, he añadido unas dimensiones mínimas al contenedor para que la imagen de fondo no se       corte.
    
  -El contenedor para la nave simplemente está centrado respecto al body y está dimensionado porcentualmente.
    
  -El contenedor inferior: Éste simplemente está posicionado en la parte inferior y centra la imagen que hay en su interior, la luna.     Además, se dimensiona adecuadamente. 
    
  -El contenedor de menús es transparente y contiene el menú de ajustes centrado en la pantalla. 


**CSS vertical:**
    
Siguiendo la estructura del html:
  
  -Contenedor "c": Este contenedor contiene un botón para abrir el menú de móvil y el resto no es visible desde la versión móvil.
  
  -El contenedor de la derecha, es parecido que en la vesión de ordenador.
  
  -El contenedor de la izquierda: Este contenedor es igual que en el horizontal. Su única diferencia es a la hora de dimensionar las       imagenes que hay dentro, puesto que he considerado que era mejor dejar su tamaño fijo.

    
  -Los contenedores para la nave y para la luna son semejantes.
  
  -Por último, el menú móvil ocupa toda la pantalla y contiene tres botones para interactuar con el juego. Uno de ellos, abre el menú de ajustes el cuál esta dimensionado proporcionalmente. Ambos menús contienen botones de tamaño fijo. 
  
  **JavaScript:**
 
 Funcionalidades establecidas:
 
  **-Activar el motor al pulsar botón y mantener pulsado el botón mientras está el motor activo:** Para realizar esta funcionalidad simplemente se cambia la fuente de la imagen tanto de la nave como del botón al pulsar sobre él.
   
  **-Evitar pulsar el botón cuando hayamos aterrizado, acabado el combustible, pausado, o abierto el menú:** He creado una série de booleanos para saber cuando hemos aterrizado, acabado el combustible o pausado la partida para así evitar activar la función al presionar el botón.
  
  **-Reiniciar la partida:** Se ha elaborado una función llamada "reiniciar" para inicializar todo lo que hace falta para empezar la partida de nuevo sin problemas. Entonces, se llama a esta función siempre que se quiera reiniciar la partida (con el botón de reiniciar, cambiando de dificultad o al acabar la partida con la opción de volver a jugar).
  
  **-Pausar la partida:** Cuando se presione la opción de pausa, va a llamar a una función para cambiar la imagen de pausa a la de play, activar el booleano "paused" y parar tanto la nave como su consumo. Además va a detectar si el motor estava activado o no para poderlo activar luego. No se podrá utilizar esta opción cuando haya acabado la partida o el menú de ajustes esté abierto gracias a los booleanos comentados anteriormente.
  
  **-Reanudar la partida(play):** Al presionar play va a revertir todo lo que habia hecho al pausar la partida y el juego va a continuar como estava.
  
  **-Ajustes:** Esta opción va a abrir el menú de ajustes además de pausar la partida con la única diferencia que este se podrá abrir al acabar la partida. Al pasar a la versión móvil se abrirá directamente dicho menú.
  
  **-Abrir el menú móvil:** Simplemente tendremos una imagen desde la versión móvil que va a pausar la partida y abrir el menú móvil. Además, al pausar la partida desde la versión de ordenador se abrirá el menú móvil pero se mantendra oculto mientras se encuentre en la versión de ordenador. De la misma forma pasa que si pausamos la partida en la versión de ordenador y vamos a la de móvil, se abrirá el menú. Esto es debido a que cuando se pone el contenedor de menus visible, el contenedor "menúMovil" solamente es visible para el móvil. 
  
  **Cerrar el menú móvil:** Al pulsar reanudar se va a cerrar el contenedor de menús y a reanudar la partida. 
  
  **-Ir a las webs de información e instrucciones con previo aviso:** Para realizar esto simplemente avisamos al usuario con el comando confirm y leemos la respuesta. Dependiendo de la respuesta, abrimos la nueva web o no.
  
  **-Abrir ajustes del móvil** Esta opción se abrirá mediante el botón del menu móvil y al pasar a la versión del ordenador, también tendrá abierto el menú de ajustes.
  
  **-Cerrar ajustes del móvil** Esta opción se cerrará el menu de ajustes del móvil y dejara abierto el menú móvil y al pasar a la versión del ordenador, el juego estará como en pausa.
  
  **-Cambio de dificultad** En el menú de ajustes será posible cambiar la dificultad. Al presionar sobre una dificultad, ese botón quedará marcado cambiando el color de fondo y va a cambiar los valores de velocidad para ganar (velocidadVictoria) y combustible inicial (cdificultad).
  
  **-Límite de la nave:** Cuando la nave llegue al techo de la pantalla, la nave va a parar el motor y empezar a caer. Para hacer esto hay que mirar cuando la nave llega a una altura negativa y le cambiamos el valor de la altura y la velocidad a 0.
  
  **-Final de la partida:** Cuando la nave supera los 70 metros, quiere decir que ya ha llegado al suelo. Por lo tanto la haremos explotar, activaremos el booleano aterrizado y abriremos el div de final de partida para indicar el resultado de la partida. Para saber si ha ganado o no, simplemente comprobamos la velocidad de llegada con la velocidad que indique la variable "velocidadVictoria".
  
  
  
  
  
