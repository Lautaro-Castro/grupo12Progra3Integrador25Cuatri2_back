import connection from "../database/db.js";

//Seleccionamos las peliculas en cartelera
const getPeliculasEnCartelera = () => {
    const sql = `SELECT * FROM peliculas WHERE activa = 1 AND fecha_fin_cartelera >= CURDATE() AND fecha_estreno <= CURDATE()`;
    return connection.query(sql);
}

//Seleccionamos las peliculas en preventa
const getPeliculasEnPreVenta = () => {
     const sql = `SELECT * FROM peliculas WHERE activa = 1 AND fecha_estreno > CURDATE()`;
     return connection.query(sql);
}

//Seleccionamos pelicula por Id
const getPeliculaPorId = (id) => {
    //Usamos ? por seguridad y evitar inyecciones sql
    const sql = `SELECT * FROM peliculas WHERE id = ?`;
    return connection.query(sql, [id]); // El id reemplaza nuestro ?
}

const insertPelicula = (pelicula) => {
    let sql = `INSERT INTO peliculas (nombre, sinopsis, duracion, clasificacion, fecha_estreno, fecha_fin_cartelera, poster_url, distribuidor, director, actores, activa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [pelicula.nombre, pelicula.sinopsis, pelicula.duracion, pelicula.clasificacion, pelicula.fecha_estreno, pelicula.fecha_fin_cartelera, pelicula.poster_url, pelicula.distribuidor, pelicula.director, pelicula.actores, pelicula.activa]

    return connection.query(sql, values);
}

const updatePelicula = (pelicula) => {
    let sql = `UPDATE peliculas SET nombre = ?, sinopsis = ?, duracion = ?, clasificacion = ?, fecha_estreno = ?, fecha_fin_cartelera = ?, poster_url = ?, distribuidor = ?, director = ?, actores = ?, activa = ? WHERE id = ?`;

    const values = [pelicula.nombre, pelicula.sinopsis, pelicula.duracion, pelicula.clasificacion, pelicula.fecha_estreno, pelicula.fecha_fin_cartelera, pelicula.poster_url, pelicula.distribuidor, pelicula.director, pelicula.actores, pelicula.activa, pelicula.id]

    return connection.query(sql, values);
}

const deletePelicula = (id) => {
      // Baja logica
      let sql = "UPDATE peliculas SET activa = 0 WHERE id = ?";

      return connection.query(sql, [id]);
}

export default {
    getPeliculasEnCartelera,
    getPeliculasEnPreVenta,
    getPeliculaPorId,
    insertPelicula,
    updatePelicula,
    deletePelicula
}
