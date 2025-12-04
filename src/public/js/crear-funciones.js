let url = "http://localhost:3000";
let contenedor = document.getElementById("alta-funciones-container");

async function inicializarFormulario() {
    try {
        const [respFormatos, respIdiomas, respPeliculasCartelera, respPeliculasPreventa] = await Promise.all([
            fetch(`${url}/api/formatos`),
            fetch(`${url}/api/idiomas`),
            fetch(`${url}/api/peliculas/cartelera`),
            fetch(`${url}/api/peliculas/preventa`)
        ]);

        //Convertimos todo a JSON
        const dataFormatos = await respFormatos.json();
        const dataIdiomas = await respIdiomas.json();
        const dataPeliculasCartelera = await respPeliculasCartelera.json();
        const dataPeliculasPreventa = await respPeliculasPreventa.json();

        //Extraemos los payloads
        const listaFormatos = dataFormatos.payload;
        const listaIdiomas = dataIdiomas.payload;
        const listaPeliculas = [...dataPeliculasCartelera.payload, ...dataPeliculasPreventa.payload];

        renderizarFormulario(listaFormatos, listaIdiomas, listaPeliculas);
        
    } catch (error) {
        console.error("Error cargando datos:", error);
        alert("Error al cargar los datos necesarios para editar.");
    }
}

function renderizarFormulario(listaFormatos, listaIdiomas, listaPeliculas) {

    //Cargamos las opciones de peliculas
    let opcionesPeliculas = `<option value="" disabled selected>Seleccione pelicula</option>`;
    listaPeliculas.forEach(peli => {
        opcionesPeliculas += `<option value="${peli.id}">${peli.nombre}</option>`;
    });

    //Cargamos las ppciones de formatos
    let opcionesFormatos = `<option value="" disabled selected>Seleccione formato</option>`;
    listaFormatos.forEach(fmt => {
        opcionesFormatos += `<option value="${fmt.id}">${fmt.nombre}</option>`;
    });

    //Cargamos las opciones de idiomas
    let opcionesIdiomas = `<option value="" disabled selected>Seleccione idioma</option>`;
    listaIdiomas.forEach(idioma => {
        opcionesIdiomas += `<option value="${idioma.id}">${idioma.nombre}</option>`;
    });

    //Cargamos las opciones de salas
    let opcionesSalas = `<option value="" disabled selected>Seleccione sala</option>`;
    for (let i = 1; i <= 6; i++) {
        opcionesSalas += `<option value="${i}">Sala ${i}</option>`;
    }

    let formularioHTML = `
            
            <label for="pelicula_id">Pelicula</label>
            <select name="pelicula_id" id="pelicula_id" required>
                ${opcionesPeliculas}
            </select>

            <label for="formato-id">Formato</label>
            <select name="formato_id" id="formato-id" required>
                ${opcionesFormatos}
            </select>
    
            <label for="idioma-id">Idioma</label>
            <select name="idioma_id" id="idioma-id" required>
                ${opcionesIdiomas}
            </select>
    
            <label for="sala-func">Sala</label>
            <select name="sala" id="sala-func" required>
                ${opcionesSalas}
            </select>
    
            <label for="fecha-func">Fecha</label>
            <input type="date" name="fecha" id="fecha-func" required>

            <label for="hora-func">Hora</label>
            <input type="time" name="hora" id="hora-func" required>

            <label for="butacas-func">Butacas disponibles</label>
            <input type="number" name="butacas_disponibles" id="butacas-func" required>

            <label for="activa-funcion">Activa</label>
            <select name="activa" id="activa-peli" required>
                <option value="1" selected>Si</option>
                <option value="0">No</option>
            </select>
            
            <input type="submit" value="Crear función">

    `;

    contenedor.innerHTML = formularioHTML;
    
    // Asignamos los eventos
    asignarEventos();
}

function asignarEventos() {
    
    //Cancelar la creacion
    document.getElementById("btn-cancelar-creacion-funcion").addEventListener("click", () => {
        if(confirm("¿Estas seguro que queres cancelar la creacion?")) {
            window.location.href = "/funciones";
        }
    });

    //Creamos la funcion
    contenedor.addEventListener("submit", async (event) => {
        event.preventDefault();

        let formData = new FormData(event.target);
        let data = Object.fromEntries(formData.entries());

        data.pelicula_id = parseInt(data.pelicula_id);
        data.formato_id = parseInt(data.formato_id);
        data.idioma_id = parseInt(data.idioma_id);
        data.sala = parseInt(data.sala);
        data.butacas_disponibles = parseInt(data.butacas_disponibles);
        data.activa = parseInt(data.activa);

        try {
            let response = await fetch(`${url}/api/funciones`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            let result = await response.json();

            if (response.ok) {
                alert("Funcion creada exitosamente");
                window.location.href = "/funciones";      
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("Error al enviar los datos: ", error);
            alert("Error de conexion al procesar la solicitud");
        }
    });
}

inicializarFormulario();


