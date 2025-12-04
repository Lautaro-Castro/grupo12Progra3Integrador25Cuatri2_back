const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let updateFormContainer = document.getElementById("updateFormContainer");

// Para usar la pelicula en otras funciones
let funcionSeleccionada = null;

//Se crea la url para consumir la api
let url = "http://localhost:3000";

async function inicializarFormulario() {
    try {
        const [respFuncion, respFormatos, respIdiomas, respPeliculasCartelera, respPeliculasPreventa] = await Promise.all([
            fetch(`${url}/api/funciones/${id}`),
            fetch(`${url}/api/formatos`),
            fetch(`${url}/api/idiomas`),
            fetch(`${url}/api/peliculas/cartelera`),
            fetch(`${url}/api/peliculas/preventa`)
        ]);

        //Convertimos todo a JSON
        const dataFuncion = await respFuncion.json();
        const dataFormatos = await respFormatos.json();
        const dataIdiomas = await respIdiomas.json();
        const dataPeliculasCartelera = await respPeliculasCartelera.json();
        const dataPeliculasPreventa = await respPeliculasPreventa.json();

        //Extraemos los payloads
        const funcion = dataFuncion.payload;
        const listaFormatos = dataFormatos.payload;
        const listaIdiomas = dataIdiomas.payload;
        const listaPeliculas = [...dataPeliculasCartelera.payload, ...dataPeliculasPreventa.payload];

        if (funcion) {
            crearFormulario(funcion, listaFormatos, listaIdiomas, listaPeliculas);
        } else {
            alert("No se encontró la función solicitada.");
            window.location.href = "/funciones";
        }

    } catch (error) {
        console.error("Error cargando datos:", error);
        alert("Error al cargar los datos necesarios para editar.");
    }
}

async function crearFormulario(funcion, listaFormatos, listaIdiomas, listaPeliculas) {

    //Formateamos fecha y hora
    const fechaFuncion = funcion.fecha ? funcion.fecha.split('T')[0] : '';
    const horaFuncion = funcion.hora ? funcion.hora.slice(0, 5) : '';

    //Formateamos los formatos
    let opcionesFormatos = "";
    listaFormatos.forEach(fmt => {
        //Si el id coincide le ponemos 'selected' al formato
        const seleccionado = fmt.id === funcion.formato_id ? 'selected' : '';
        opcionesFormatos += `<option value="${fmt.id}" ${seleccionado}>${fmt.nombre}</option>`;
    });

    //Formateo los idioms
    let opcionesIdiomas = "";
    listaIdiomas.forEach(idioma => {
        const selected = idioma.id === funcion.idioma_id ? 'selected' : '';
        opcionesIdiomas += `<option value="${idioma.id}" ${selected}>${idioma.nombre}</option>`;
    });

    //Formateo las peliculas
    let opcionesPeliculas = "";
    listaPeliculas.forEach(peli => {
        const selected = peli.id === funcion.pelicula_id ? 'selected' : '';
        opcionesPeliculas += `<option value="${peli.id}" ${selected}>${peli.nombre}</option>`;
    });

    //Formateamos las salas
    let opcionesSalas = "";
    for (let i = 1; i <= 6; i++) {
        // Comparamos si la vuelta del bucle es igual a la sala guardada
        const selected = i === funcion.sala ? 'selected' : '';
        opcionesSalas += `<option value="${i}" ${selected}>Sala ${i}</option>`;
    }

    let updateFormHTML = `
    <!-- Formulario para editar funciones -->
    <form id="editar-funcion-container" class="form-alta">
            <label for="pelicula_id">Película</label>
            <select name="pelicula_id" id="pelicula_id" required>
                <option value="" disabled>Seleccione película</option>
                ${opcionesPeliculas}
            </select>

            <label for="formato-id">Formato</label>
            <select type="number" name="formato_id" id="formato-id" required>
                ${opcionesFormatos}
            </select>
    
            <label for="idioma-id">Idioma</label>
            <select name="idioma_id" id="idioma-id" required>
                <option value="" disabled>Seleccione idioma</option>
                ${opcionesIdiomas}
            </select>
    
            <label for="sala-func">Sala</label>
            <select name="sala" id="sala-func" required>
                <option value="" disabled>Seleccione sala</option>
                ${opcionesSalas}
            </select>
    
            <label for="fecha-func">Fecha </label>
            <input type="date" name="fecha" id="fecha-func" value="${fechaFuncion}" required>

            <label for="hora-func">Hora</label>
            <input type="time" name="hora" id="hora-func" value="${horaFuncion}" required>

            <label for="butacas-func">Butacas diponibles</label>
            <input type="number" name="butacas_disponibles" id="butacas-func" value="${funcion.butacas_disponibles}" required>

            <label for="activa-funcion">Activa</label>
            <select type="number" name="activa" id="activa-peli" required>
                <option value="1" selected>Si</option>
                <option value="0">No</option>
            </select>
            
            <input type="submit" value="Editar funcion">
        </form>
        <button id="btn-cancelar-edicion-funcion">Cancelar</button>
    `;

    updateFormContainer.innerHTML = updateFormHTML;
    let botonCancelarEdicion = document.getElementById("btn-cancelar-edicion-funcion");

    botonCancelarEdicion.addEventListener("click", () => {
    if(confirm("¿Estas seguro que queres cancelar la edicion?")) {
        window.location.href = "/funciones";
    }
    })

    updateFormContainer.addEventListener("submit", event => {
        actualizarFuncion(event);
    });
}


async function actualizarFuncion(event) {
    event.preventDefault();
    event.stopPropagation();

    let formData = new FormData(event.target); // Le pasamos el formulario dinamico de antes al objeto FormData para obtener los datos del nuevo formulario de actualizacion

    let data = Object.fromEntries(formData.entries());

    try {
        let response = await fetch(`${url}/api/funciones/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result = await response.json();

        if(response.ok) {
            console.log(result.message);
            alert(result.message);
        } else {
            console.log(result.message);
            alert(result.message);
        }

    } catch (error) {
        alert("Error actualizando funcion");
    }

    window.location.href = "/funciones";
}

inicializarFormulario();