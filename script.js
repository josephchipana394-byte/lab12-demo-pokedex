
// ==========================================
// 1. REFERENCIAS AL HTML
// ==========================================

const contenedor = document.getElementById("resultado");
const buscador = document.getElementById("buscador");
const botonBuscar = document.getElementById("btn-buscar");
const spinner = document.getElementById("spinner");
const mensaje = document.getElementById("mensaje");
const botonReintentar = document.getElementById("btn-reintentar");
const botonCargarMas = document.getElementById("cargar-mas");

// Seleccionar elementos del DOM para el modo oscuro
const botonDarkMode = document.getElementById("btn-dark-mode");
const iconoLuna = document.getElementById("icon-moon");
const iconoSol = document.getElementById("icon-sun");
// Recuperar el tema guardado
let temaOscuro = localStorage.getItem("tema") === "oscuro";

// Función para aplicar el tema
function aplicarTema() {

    document.documentElement.classList.toggle("dark", temaOscuro);

    // Cambiar visibilidad de los iconos
    iconoLuna.classList.toggle("hidden", temaOscuro);
    iconoSol.classList.toggle("hidden", !temaOscuro);

    // Actualizar accesibilidad del botón
    botonDarkMode.setAttribute(
        "aria-label",
        temaOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
    );
}

// Evento para cambiar el tema
botonDarkMode.addEventListener("click", function() {

    temaOscuro = !temaOscuro;

    localStorage.setItem(
        "tema",
        temaOscuro ? "oscuro" : "claro"
    );

    aplicarTema();
});
// Aplicar tema al cargar la página
aplicarTema();

// VARIABLES PARA ANIMACION DE POKEBOLA
const animacionCaptura = document.getElementById("animacion-captura");
const pokebola = document.getElementById("pokebola");
const mensajeCaptura = document.getElementById("mensaje-captura");
// ==========================================
// 2. VARIABLES
// ==========================================

let pokedex = [];
let offset = 0;
let ultimaBusqueda = "";

const nombres = [
    "bulbasaur",
    "charmander",
    "squirtle",
    "pikachu",
    "jigglypuff",
    "gengar",
    "eevee",
    "snorlax"
];

// ==========================================
// 3. CREAR TARJETAS
// ==========================================

function crearTarjeta(pokemon, esColeccion = false) {

    console.log("Pokémon recibido:", pokemon);
    console.log("Tipos recibidos:", pokemon.tipos);


    const tarjeta = document.createElement("article");

    tarjeta.className = `
        bg-white dark:bg-slate-800
        text-slate-900 dark:text-white
        rounded-2xl shadow-lg dark:shadow-black/30
        p-6 text-center
        transition-all duration-300
        hover:-translate-y-2 hover:shadow-xl
    `;

    tarjeta.innerHTML = `
        <img 
            src="${pokemon.imagen}"
            alt="${pokemon.nombre}"
            class="w-40 h-40 object-contain mx-auto
                   transition-transform duration-300
                   hover:scale-110"
        >

        <h3 class="text-lg font-bold capitalize mt-3">
            ${pokemon.nombre}
        </h3>

        <div class="flex justify-center gap-2 mt-2 bg-slate-100 dark:bg-slate-700
            text-slate-700 dark:text-slate-200
            px-3 py-1 rounded-full text-sm">
            ${pokemon.tipos.map(tipo => `
                <span class="bg-slate-100 dark:bg-slate-600
                            text-slate-700 dark:text-white
                            px-3 py-1 rounded-full text-sm">
                    ${tipo}
                </span>
            `).join("")}
        </div>
    `;

    // El botón solamente aparece en las tarjetas de la colección
    if (esColeccion) {

        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "🗑️ Eliminar";

        botonEliminar.className = `
            w-full mt-4
            bg-red-500 hover:bg-red-600
            dark:bg-red-600 dark:hover:bg-red-700
            text-white font-semibold py-2 rounded-lg
            transition-colors duration-300
        `;

        botonEliminar.addEventListener("click", function() {
            eliminarPokemon(pokemon.nombre);
        });

        tarjeta.appendChild(botonEliminar);
    }

    return tarjeta;
}

/*function crearTarjeta(pokemon, esColeccion = false) {

    const { nombre, imagen, tipos } = pokemon;

    const img = imagen ?? "https://via.placeholder.com/96?text=?";

    const badges = tipos.map(function(tipo) {
        return `<span class="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full">${tipo}</span>`;
    }).join("");

    const articulo = document.createElement("article");

    articulo.className = "bg-white rounded-xl shadow p-4 text-center transform hover:scale-105 transition duration-200";

    articulo.innerHTML = `
        <img src="${img}" alt="${nombre}" class="w-48 h-48 object-contain mx-auto transition-transform duration-300 hover:scale-110">
        <h2 class="capitalize font-bold text-slate-800 mt-2">${nombre}</h2>
        <div class="flex gap-1 justify-center mt-2 flex-wrap">
            ${badges}
        </div>
    `;

    return articulo;
}*/

// ==========================================
// 4. RENDERIZAR POKÉMON
// ==========================================

function render(lista) {

    contenedor.innerHTML = "";

    lista.forEach(pokemon => {

        const tarjeta = crearTarjeta(pokemon,true);

        contenedor.appendChild(tarjeta);

    });
}

// ==========================================
// 5. ADAPTAR DATOS DE LA API
// ==========================================

function adaptarPokemon(data) {

    return {

        nombre: data.name,

        //imagen: data.sprites?.front_default ?? "https://via.placeholder.com/96?text=?",
        imagen:
            data.sprites.other?.["official-artwork"]?.front_default ||
            data.sprites.other?.home?.front_default ||
            data.sprites.front_default,

        tipos: data.types.map(t => t.type.name),

        stats: data.stats.map(s => ({
            nombre: s.stat.name,
            valor: s.base_stat
        }))

    };
}

// ==========================================
// 6. CONSULTAR API
// ==========================================

async function obtenerPokemon(idONombre) {

    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${idONombre}`
    );

    if (!response.ok) {

        throw new Error(`No se encontró "${idONombre}" en la Pokédex.`);

    }

    return response.json();
}

// ==========================================
// 7. CARGAR POKÉDEX INICIAL
// ==========================================

async function cargarPokedex() {

    spinner.classList.remove("hidden");
    mensaje.classList.add("hidden");

    try {

        const datosCrudos = await Promise.all(
            nombres.map(obtenerPokemon)
        );

        pokedex = datosCrudos.map(adaptarPokemon);

        render(pokedex);

    } catch (error) {
        console.error("Error al cargar la pokedex:",error);
        mensaje.textContent = "No se pudo cargar la Pokédex inicial.";
        mensaje.classList.remove("hidden");

    } finally {

        spinner.classList.add("hidden");

    }
}

cargarPokedex();

// ==========================================
// 8. BUSCAR POKÉMON
// ==========================================

async function buscarPokemon(nombre) {

    const data = await obtenerPokemon(nombre.toLowerCase());

    return adaptarPokemon(data);
}

// ANIMACION PARA CAPTURAR POKEMON
function mostrarAnimacionCaptura(nombre) {

    // Mostrar la ventana de captura
    animacionCaptura.classList.remove("hidden");

    // Reiniciar la animación
    pokebola.classList.remove("animar-captura");

    // Reiniciar el elemento para reproducir nuevamente
    void pokebola.offsetWidth;

    // Ejecutar la animación
    pokebola.classList.add("animar-captura");

    // Actualizar el mensaje
    mensajeCaptura.textContent = `¡${nombre} capturado con éxito!`;

    // Ocultar la animación después de 3 segundos
    setTimeout(function() {

        animacionCaptura.classList.add("hidden");

        pokebola.classList.remove("animar-captura");

    }, 3000);

}


// ==========================================   
// 9. CAPTURAR POKÉMON
// ==========================================

/*function capturar(pokemon) {

    if (!pokedex.some(p => p.nombre === pokemon.nombre)) {

        pokedex.push(pokemon);

    }

    render(pokedex);

    buscador.value = "";

}*/


function capturar(pokemon) {

    // Verificar si el Pokémon ya existe
    if (!pokedex.some(p => p.nombre === pokemon.nombre)) {

        // Agregar Pokémon a la colección
        pokedex.push(pokemon);

        // Actualizar la colección
        render(pokedex);

        // Limpiar el buscador
        buscador.value = "";

        // Ejecutar animación de captura
        mostrarAnimacionCaptura(pokemon.nombre);

    } else {

        // Mostrar mensaje si ya existe
        mensaje.textContent = `${pokemon.nombre} ya está en tu colección.`;

        mensaje.classList.remove("hidden");

    }

}

function eliminarPokemon(nombre) {

    pokedex = pokedex.filter(
        pokemon => pokemon.nombre !== nombre
    );

    render(pokedex);

}


// ==========================================
// 10. MOSTRAR RESULTADO Y ESTADÍSTICAS
// ==========================================

function mostrarResultado(pokemon) {

    const tarjeta = crearTarjeta(pokemon);

    const statsDiv = document.createElement("div");

    statsDiv.className = ` mt-2 text-left text-xs space-y-1
                            bg-slate-50 dark:bg-slate-700
                            text-slate-800 dark:text-white
                            p-2 rounded`;

    statsDiv.innerHTML = pokemon.stats.map(s => `
        <div class="flex justify-between">
            <span class="capitalize text-slate-600 dark:text-slate-200">${s.nombre}</span>
            <span class="font-semibold text-slate-800 dark:text-white">${s.valor}</span>
        </div>
    `).join("");

    tarjeta.appendChild(statsDiv);

    const boton = document.createElement("button");

    boton.textContent = "⚡ Capturar";

    boton.className = "mt-2 w-full bg-yellow-400 font-semibold rounded-lg py-1 hover:bg-yellow-500 transition";

    boton.addEventListener("click", () => capturar(pokemon));
    tarjeta.appendChild(boton);

    contenedor.innerHTML = "";

    contenedor.appendChild(tarjeta);

}

// ==========================================
// 11. MOSTRAR BÚSQUEDA
// ==========================================

async function mostrarBusqueda(nombre) {

    // Guardamos la última búsqueda
    ultimaBusqueda = nombre;

    // Mostramos el spinner
    spinner.classList.remove("hidden");

    // Ocultamos mensajes y botón reintentar
    mensaje.classList.add("hidden");
    botonReintentar.classList.add("hidden");

    try {

        const pokemon = await buscarPokemon(nombre);

        mostrarResultado(pokemon);

    } catch (error) {

        mensaje.textContent = error.message;

        mensaje.classList.remove("hidden");

        // Mostramos el botón para repetir la búsqueda
        botonReintentar.classList.remove("hidden");

    } finally {

        spinner.classList.add("hidden");

    }

}

// ==========================================
// 12. EVENTO DEL BOTÓN BUSCAR
// ==========================================

botonBuscar.addEventListener("click", function() {

    const nombre = buscador.value.trim();

    if (nombre !== "") {

        mostrarBusqueda(nombre);

    }

});

// ==========================================
// 13. BUSCAR CON ENTER
// ==========================================

buscador.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        botonBuscar.click();

    }

});

// ==========================================
// 14. BOTÓN REINTENTAR
// ==========================================

botonReintentar.addEventListener("click", function() {

    if (ultimaBusqueda !== "") {

        mostrarBusqueda(ultimaBusqueda);

    }

});

// ==========================================
// 15. CARGAR MÁS POKÉMON
// ==========================================

async function cargarMas() {

    spinner.classList.remove("hidden");
    mensaje.classList.add("hidden");

    botonCargarMas.disabled = true;
    botonCargarMas.classList.add("opacity-50", "cursor-not-allowed");

    try {

        const respuesta = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`
        );

        if (!respuesta.ok) {

            throw new Error("No se pudieron cargar más Pokémon.");

        }

        const lista = await respuesta.json();

        const datosCrudos = await Promise.all(

            lista.results.map(async function(item) {

                const response = await fetch(item.url);

                if (!response.ok) {

                    throw new Error("Error al obtener un Pokémon.");

                }

                return response.json();

            })

        );

        datosCrudos.map(adaptarPokemon).forEach(function(pokemon) {

            if (!pokedex.some(p => p.nombre === pokemon.nombre)) {

                pokedex.push(pokemon);

            }

        });

        offset += 12;

        render(pokedex);

    } catch (error) {

        mensaje.textContent = error.message;

        mensaje.classList.remove("hidden");

    } finally {

        spinner.classList.add("hidden");

        botonCargarMas.disabled = false;

        botonCargarMas.classList.remove("opacity-50", "cursor-not-allowed");

    }

}

// ==========================================
// 16. EVENTO CARGAR MÁS
// ==========================================

botonCargarMas.addEventListener("click", cargarMas);
