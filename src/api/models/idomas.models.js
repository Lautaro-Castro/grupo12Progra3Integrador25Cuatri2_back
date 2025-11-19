import connection from "../database/db.js";

//Obtenemos todos los idiomas
const getIdiomas = () => {
    const sql = `SELECT * FROM idiomas`;
    return connection.query(sql);
}

//Obtenemos formato por id
const getIdiomaPorId = (id) => {
    const sql = `SELECT * FROM idiomas WHERE id = ?`;
    return connection.query(sql, [id]);
}

export default {
    getIdiomas,
    getIdiomaPorId
}