import connection from "../database/db.js";

//Obtenemos todas los productos activos
const selectProductos = () => {
    const sql = `SELECT * FROM candy WHERE activo = 1 AND tipo = 'producto'`;;
    return connection.query(sql);
}

//Obtenemos todas los combos activos
const selectCombos = () => {
    const sql = `SELECT * FROM candy WHERE activo = 1 AND tipo = 'combo'`;;
    return connection.query(sql);
}
