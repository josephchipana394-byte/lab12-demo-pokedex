# ⚡ Pokédex - Módulo 3

Aplicación web interactiva que permite consultar, visualizar y capturar Pokémon mediante el consumo de la API pública **PokéAPI**.

Este proyecto fue desarrollado utilizando HTML5, JavaScript moderno y Tailwind CSS, aplicando conceptos de asincronía, consumo de APIs, manipulación del DOM, manejo de eventos y animaciones CSS.

## 📸 Capturas de pantalla

### Vista principal

![Pokédex - Vista principal](assets/capturas/pokedex-inicio.png)

### Búsqueda de Pokémon

![Pokédex - Resultado de búsqueda](assets/capturas/pokedex-busqueda.png)

### Manejo de errores y reintentos

![Pokédex - Mensaje de error y botón reintentar](assets/capturas/pokedex-error.png)

### Animación al capturar un Pokémon

![Pokédex - Animación de Pokébola](assets/capturas/pokedex-captura.png)

## 🚀 Tecnologías utilizadas

- **HTML5:** estructura y organización de los elementos de la aplicación.
- **JavaScript (ES6+):** lógica de programación, eventos y consumo de API.
- **Tailwind CSS:** diseño visual, estilos y animaciones.
- **CSS3:** creación de animaciones personalizadas mediante `@keyframes`.
- **Fetch API:** solicitudes HTTP para obtener información de los Pokémon.
- **PokéAPI:** API REST utilizada como fuente de datos.

## ✨ Funcionalidades

- **Carga inicial:** muestra una colección inicial de Pokémon.
- **Búsqueda:** permite buscar Pokémon por su nombre.
- **Estadísticas:** muestra información de las estadísticas base de cada Pokémon.
- **Tipos:** identifica los tipos de cada Pokémon.
- **Capturar Pokémon:** permite agregar Pokémon a una nueva colección.
- **Control de duplicados:** evita registrar Pokémon que ya existen en la colección.
- **Cargar más:** permite incorporar nuevos Pokémon mediante paginación.
- **Spinner animado:** muestra un indicador visual durante las peticiones a la API.
- **Manejo de errores:** muestra mensajes cuando una búsqueda o petición falla.
- **Botón Reintentar:** permite repetir la última búsqueda cuando ocurre un error.
- **Animación de captura:** muestra una Pokébola animada cuando un Pokémon es capturado exitosamente.
- **Confirmación de captura:** muestra un mensaje indicando que el Pokémon fue agregado correctamente.
- **Diseño responsive:** adapta la presentación a diferentes tamaños de pantalla mediante Tailwind CSS.

## 📋 Historias de usuario

### HU1: Animación al capturar un Pokémon

**Como:** usuario de la Pokédex.

**Quiero:** que al capturar un Pokémon aparezca una animación de una Pokébola.

**Para:** visualizar que el Pokémon fue capturado exitosamente y recibir una confirmación visual.

**Criterios de aceptación:**

- Al presionar el botón Capturar, debe aparecer una Pokébola animada.
- La Pokébola debe realizar movimientos que simulen el proceso de captura.
- Al finalizar la animación, debe mostrarse un mensaje de captura exitosa.
- El Pokémon debe agregarse a la colección.
- Si el Pokémon ya existe, no debe agregarse nuevamente.
- La animación debe desaparecer automáticamente después de unos segundos.

## 📁 Estructura del proyecto

```text
pokedex-modulo-3/
│
├── index.html
├── script.js
├── README.md
│
└── assets/
    └── capturas/
        ├── pokedex-inicio.png
        ├── pokedex-busqueda.png
        ├── pokedex-error.png
        └── pokedex-captura.png
```

## ⚙️ Instalación y ejecución

1. Clonar el repositorio:

   ```bash
   git clone URL_DE_TU_REPOSITORIO
   ```

2. Ingresar a la carpeta del proyecto:

   ```bash
   cd pokedex-modulo-3
   ```

3. Abrir el proyecto en Visual Studio Code.

4. Ejecutar el archivo `index.html` utilizando la extensión Live Server o abrirlo directamente en el navegador.

**Nota:** se necesita conexión a Internet para cargar Tailwind CSS desde su CDN y consultar los datos de PokéAPI.

## 🔌 API utilizada

Este proyecto utiliza la API pública:

[PokéAPI](https://pokeapi.co/)

Endpoint para consultar un Pokémon:

```text
https://pokeapi.co/api/v2/pokemon/{nombre}
```

Endpoint para obtener una lista de Pokémon:

```text
https://pokeapi.co/api/v2/pokemon?limit=12&offset=0
```

## 🧠 Conceptos de JavaScript y CSS aplicados

| Concepto | Aplicación en el proyecto |
|---|---|
| Variables (`let`, `const`) | Almacenamiento de información y referencias al DOM. |
| Funciones | Organización y reutilización del código. |
| Arrow Functions | Uso de funciones flecha en callbacks. |
| Arrays | Almacenamiento de Pokémon. |
| `map()` | Transformación de datos de la API. |
| `forEach()` | Recorrido de colecciones. |
| `some()` | Validación de Pokémon duplicados. |
| Destructuring | Extracción de propiedades de objetos. |
| Optional Chaining | Acceso seguro a propiedades opcionales. |
| Nullish Coalescing | Asignación de valores predeterminados. |
| Template Literals | Construcción dinámica de HTML. |
| Async/Await | Manejo de operaciones asíncronas. |
| Fetch API | Consumo de servicios externos. |
| Promise.all() | Ejecución concurrente de varias solicitudes. |
| Try/Catch/Finally | Manejo de errores y finalización de peticiones. |
| DOM | Creación y modificación de elementos HTML. |
| Event Listeners | Gestión de eventos de usuario. |
| setTimeout() | Control del tiempo de visualización de la animación. |
| CSS Keyframes | Creación de la animación personalizada de la Pokébola. |
| Tailwind Animate | Animación del indicador de carga mediante `animate-spin`. |

## 🎨 Animaciones implementadas

### Spinner de carga

Se utiliza la clase `animate-spin` de Tailwind CSS para mostrar un indicador circular mientras se realizan las consultas a la API.

### Animación de captura

Se utiliza CSS3 mediante `@keyframes` para crear una animación personalizada de una Pokébola.

La animación incluye:

- Movimiento de entrada.
- Rotación y vibración.
- Efecto de captura.
- Confirmación visual del Pokémon capturado.

## 📌 Mejoras implementadas

- Optimización de la presentación de los resultados.
- Incorporación de un spinner animado.
- Implementación del botón Reintentar para repetir la última búsqueda.
- Validación de respuestas HTTP.
- Manejo de errores durante la carga de nuevos Pokémon.
- Control de duplicados al capturar Pokémon.
- Implementación de una animación de Pokébola al capturar exitosamente.
- Mensaje de confirmación después de cada captura exitosa.

## 🎯 Objetivo de aprendizaje

Consolidar los conocimientos de JavaScript moderno mediante la construcción de una aplicación web que consuma una API REST, manipule datos dinámicamente, permita interactuar con el usuario e incorpore animaciones para mejorar la experiencia de uso.

---

**Desarrollado como proyecto práctico - Módulo 3.**