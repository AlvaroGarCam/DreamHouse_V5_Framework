## 🐶 DREAMHOUSE - Where dreams come true! 🐱

## Descripción general

DreamHouse es mi primer proyecto académico, consiste en una web donde el usuario puede buscar y comprar/alquilar viviendas.
El valor añadido en el cual se centra este proyecto es en viviendas adaptadas para albergar animales domésticos. Cada vez con 
más frecuencia queremos darle a nuestros "amiguitos" una mejor vida y mejores condiciones en nuestro hogar.

## 🛠️ Tecnologías empleadas:

| PHP  | JWT  | MySQL| JQuery |
| ---- | ---- | ---- | ---- |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" width="50" height="50"> | <img src="https://jwt.io/img/pic_logo.svg" width="50" height="50"> | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" width="50" height="50"> | <img src="https://play-lh.googleusercontent.com/qqAm-pu8n8RXPww5P8F-mr7K_1YMDRc1Osvk91uEg-TgMcfUvZlxjyZJzrkfWeIN4GM=w480-h960" width="50" height="50"> |

## 🏠 HOME

![Home1](https://github.com/AlvaroGarCam/DreamHouse_V5_Framework/assets/157162001/8ecf1076-bb01-4297-9ca3-4c6fb11152ef)

Es la cara de nuestra web, da la bienvenida al usuario donde a primera vista se puede apreciar la principal característica que diferencia
nuestro marketplace del resto, las mascotas.

En esta primera visualización podremos navegar a través de las diferentes categorías gracias a las cuales clasificamos las viviendas de las que disponemos,
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
  - Apartado "Search" para hacer un filtrado preliminar de las viviendas en las que estamos más interesados: este filtrado es dinámico, una vez elegimos el tipo de vivienda que deseamos, solo mostrará las combinaciones de
    vivienda "Tipo-Mascota" disponibles, y después tenemos un campo "City" de autocompletado, es decir, si la combinación "Perro-piso" solo está disponible en Castellón, al escribir "c" en este campo, nos sugerirá
    automáticamente la opción "Castellón", se actualiza con cada letra que introduzcamos o borremos. Y, finalmente, cuando le demos al botón de buscar de la lupa, nos redirigirá al "Shop" con los filtros aplicados correctamente.
  - Botones de navegación (Home, Shop y Login): nos redirigirán a cada uno de los apartados correspondientes.

## 🏪 SHOP

El módulo Shop es el corazón de nuestra aplicación y el más extenso de todos en cuanto a contenido, por lo tanto desglosaremos su descripción en varios apartados a continuación:

## 🔍 Filtros dinámicos

![Shop1](https://github.com/AlvaroGarCam/DreamHouse_V5_Framework/assets/157162001/c103d6a8-6f22-49dc-bb15-c75dddf6fc90)
![Shop2](https://github.com/AlvaroGarCam/DreamHouse_V5_Framework/assets/157162001/130f475c-eb8d-445f-b835-d129486dab0e)

El sistema de filtrado de nuestra aplicación consta de muchos aspectos interesantes:

  - Mostramos los filtros pintados dinámicamente desde nuestra base de datos mediante una consulta múltiple anidada.
  - Todos ellos son de tipo "select" salvo el de las mascotas que es de tipo "radio" con un modal incorporado.
  - Los filtros son persistentes gracias a la funcionalidad "highlight", es decir, aunque cambiemos de vista se mantienen los filtros aplicados.
  - Botón de aplicar y borrar filtros para un control total por parte del usuario.

## 📝 LIST

![Shop3](https://github.com/AlvaroGarCam/DreamHouse_V5_Framework/assets/157162001/965e1534-8436-4bd5-b275-5a6ee5efdc85)

Nuestra forma de mostrar las viviendas se basa en dar la información más importante de cada una de ellas en una tarjeta informativa donde detallaremos las características correspondientes. Ya que tenemos un método de paginación de viviendas, solo mostramos 3 viviendas por página, por lo tanto en el mapa solo aparecen los 3 indicadores de dichas viviendas.

  - Tarjetas personalizadas para cada vivienda obteniendo todos los datos.
  - Botón "Details" que nos mostrará un apartado donde veremos la vivienda más detalladamente.
  - Botón de "Like" para que nuestro usuario pueda valorar las viviendas.
  - Botón "Cart" para poder añadir a un carrito de compra nuestra vivienda y productos relacionados que explicaremos más adelante.
  - Mapa donde indicaremos la ubicación exacta de cada una de las viviendas mostradas.
