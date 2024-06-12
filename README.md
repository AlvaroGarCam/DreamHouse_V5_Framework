## 🐶 DREAMHOUSE - Where dreams come true! 🐱

## Descripción general

DreamHouse es mi primer proyecto académico, consiste en una web donde el usuario puede buscar y comprar/alquilar viviendas.
Es valor añadido en el cual se centra este proyecto es en viviendas adaptadas a albergar animales domésticos. Cada vez con 
más frecuencia queremos darle a nuestros "amiguitos" una mejor vida y mejores condiciones en nuestro hogar.

## 🛠️ Herramientas utilizadas:

- PHP   <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" width="50" height="50">
- JWT   <img src="https://jwt.io/img/pic_logo.svg" width="50" height="50">
- MySQL   <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" width="50" height="50">
- JQuery   <img src="https://play-lh.googleusercontent.com/qqAm-pu8n8RXPww5P8F-mr7K_1YMDRc1Osvk91uEg-TgMcfUvZlxjyZJzrkfWeIN4GM=w480-h960" width="50" height="50">
  
## 📖 Ahora procederemos a explicar módulo a módulo su funcionalidad:

## 🏠 HOME

![Home1](https://github.com/AlvaroGarCam/DreamHouse_V5_Framework/assets/157162001/8ecf1076-bb01-4297-9ca3-4c6fb11152ef)

Es la cara a nuestra web, da la bienvenida al usuario donde a primera vista se puede apreciar la principal característica que diferencia
nuestro marketplace del resto, las mascotas.

En esta primera vista podremos navegar a través de las diferentes categorías gracias a las cuales clasificamos las viviendas de las que disponemos,
cada una de las mencionadas categorías dispone de un carousel para que sea más fácil e intuitivo navegar entre ellas:

 - Mascotas (perros, gatos, etc.)
 - Tipo (pisos, chalets, etc.)
 - Operación (alquiler, venta, etc.)
 - Categoría (piscina, jardín, etc.)
 - Ciudad (Valencia, Castellón, etc.)
 - Servicios (recogida de basuras, portero, etc.)

   Cabe mencionar que si hacemos click en cualquiera de los elementos de los diferentes carousels, seremos redireccionados al módulo "Shop" aplicando
   el correspondiente filtrado de viviendas que hayamos seleccionado, y aparecerá reflejado en los filtros dinámicos que explicaremos en profundidad
   más adelante.

## ☰ MENÚ

![Home2](https://github.com/AlvaroGarCam/DreamHouse_V5_Framework/assets/157162001/7977695a-d69b-45ac-8b55-2dc6bc5ceeac)

El menú de navegación del que dispondremos en nuestra web será este, tiene varios apartados interesantes a mencionar:

  - Iconos identificativos de nuestra web: hacer click en cualquiera de ellos nos redirigirá al "Home".
  - Apartado "Search" para hacer un filtrado preliminar de las viviendas en las que estamos más interesados: este filtrado es dinámico, una vez elegimos el tipo de vivienda que deseamos, solo mostrará las combinaciones de      vivienda "Tipo-Mascota" disponibles, y después tenemos un campo "City" de autocompletado, es decir, si la combinación "Perro-piso" solo está disponible en Castellón, al escribir "c" en este campo, nos sugerirá
    automáticamente la opción "Castellón", se actualiza con cada "key-up" que realicemos. Y, finalmente, cuando le demos al botón de buscar de la lupa, nos redirigirá al "Shop" con los filtros aplicados correctamente.
  - 
