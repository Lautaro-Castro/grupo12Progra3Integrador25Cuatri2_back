//Se importamos las librerias que usara la app
import express from "express";
import cors from "cors";
import { __dirname, join } from './src/api/utils/index.js';
//Creamos la app
const app = express();

// Importamos las rutas de pelicula y candy
import { candyRoutes, formatosRoutes, funcionesRoutes, idiomasRoutes, peliculasRoutes } from "./src/api/routes/index.js";

//Se importa environments del archivo js y se obtiene el PORT
import environments from "./src/api/config/environments.js";
const PORT = environments.port;


/*===================
    Middlewares
====================*/
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes
app.use(express.json()); // Middleware para parsear JSON en el body
// Middleware para parsear las solicitudes POST que enviamos desde el <form> HTML
app.use(express.urlencoded({ extended: true }));
// Middleware para servir archivos estaticos (img, css, js)
app.use(express.static(join(__dirname, "src/public"))); // Nuestros archivos estaticos se serviran desde la carpeta public


/*================
    Config
================*/
// Configuramos EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views")); // Nuestras vistas se serviran desde la carpeta public

/*===================
     PELICULAS
===================*/

app.use("/api/peliculas", peliculasRoutes);

/*===================
     CANDY
===================*/

//Consulta para obtener todos las productos disponibles
app.use("/api/candy", candyRoutes);

//Consulta para obtener los formatos
app.use("/api/formatos", formatosRoutes);

//Consulta para obtener idiomas
app.use("/api/idiomas", idiomasRoutes);

app.use("/api/funciones", funcionesRoutes)


/*===================
     VISTAS
===================*/
app.get("/dashboard", (req, res) => {
    res.render("index", {
        title: "Dashboard Peli2Ya"
    })
})

app.get("/editar-pelicula", (req, res) => {
    res.render("editar-pelicula", {
        title: "Editando pelicula"
    })
})

app.get("/crear-pelicula", (req, res) => {
    res.render("crear-pelicula", {
        title: "Creando pelicula"
    })
})

app.get("/funciones", (req, res) => {
    res.render("funciones", {
        title: "Dashboard Peli2Ya"
    })
})

app.get("/crear-funcion", (req, res) => {
    res.render("crear-funcion", {
        title: "Creando funcion"
    })
})

app.get("/editar-funcion", (req, res) => {
    res.render("editar-funcion", {
        title: "Editando funcion"
    })
})

app.get("/candy", (req, res) => {
    res.render("candy", {
        title: "Dashboard Peli2Ya"
    })
})

app.get("/crear-candy", (req, res) => {
    res.render("crear-candy", {
        title: "Creando Candy"
    })
})

app.get("/editar-candy", (req, res) => {
    res.render("editar-candy", {
        title: "Editando candy"
    })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
