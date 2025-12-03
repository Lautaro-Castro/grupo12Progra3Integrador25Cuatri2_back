import connection from "../database/db.js";

//Obtenemos todas los combos activos
const getCandyPorTipo = (tipo) => {
    const sql = `SELECT * FROM candy WHERE activo = 1 AND tipo = ? `;
    return connection.query(sql, [tipo]);
}

const getCandyPorId = (id) => {

    //Usamos ? por seguridad y evitar inyecciones sql
    const sql = `SELECT * FROM candy WHERE id = ?`;
    return connection.query(sql, [id]); // El id reemplaza nuestro ?
}

const insertCandy = (candy) => {
    let sql = `INSERT INTO candy (nombre, descripcion, precio, imagen_url, activo, tipo) VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [candy.nombre, candy.descripcion, candy.precio, candy.imagen_url, candy.activo, candy.tipo]

    return connection.query(sql, values);
}

const updateCandy = (candy) => {
    let sql = `UPDATE candy SET nombre = ?, descripcion = ?, precio = ?,imagen_url = ?, activo = ?, tipo = ? WHERE id = ?`;

    const values = [candy.nombre, candy.descripcion, candy.precio, candy.imagen_url, candy.activo, candy.tipo , candy.id]

    return connection.query(sql, values);
}

const deleteCandy = (id) =>{
    // Baja logica
      let sql = "UPDATE candy SET activo = 0 WHERE id = ?";
      return connection.query(sql, [id]);
}

export default {
    getCandyPorTipo,
    getCandyPorId,
    insertCandy,
    updateCandy,
    deleteCandy
}