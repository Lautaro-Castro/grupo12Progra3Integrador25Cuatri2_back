import connection from "../database/db.js";

//Obtenemos todas los combos activos
const getCandyPorTipo = (tipo) => {
    const sql = `SELECT * FROM candy WHERE activo = 1 AND tipo = ? `;
    return connection.query(sql, [tipo]);
}

const insertCandy = (candy) => {
    let sql = `INSERT INTO candy (nombe, descripcion, precio, imagen_url, activo, tipo) VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [candy.nombre, candy.descipcion, candy.precio, candy.imagen_url, candy.activo, candy.tipo]

    return connection.query(sql, values);
}



export default {
    getCandyPorTipo,
    insertCandy
}