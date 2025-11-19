import connection from "../database/db.js";

//Obtenemos todos los formatos
const getFormatos = () => {
    const sql = `SELECT * FROM formatos`;
    return connection.query(sql);
}

//Obtenemos formato por id
const getFormatoPorId = (id) => {
    const sql = `SELECT * FROM formatos WHERE id = ?`;
    return connection.query(sql, [id]);
}

export default {
    getFormatos,
    getFormatoPorId
}