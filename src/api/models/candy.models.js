import connection from "../database/db.js";

//Obtenemos todos los productos activos
const getProductos = () => {
    const sql = `SELECT * FROM candy WHERE activo = 1 AND tipo = 'producto'`;
    return connection.query(sql);
}

//Obtenemos todas los combos activos
const getCombos = () => {
    const sql = `SELECT * FROM candy WHERE activo = 1 AND tipo = 'combo'`;
    return connection.query(sql);
}

export default {
    getProductos,
    getCombos
}