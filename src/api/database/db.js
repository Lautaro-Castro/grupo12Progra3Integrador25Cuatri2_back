//Se importa el modulo mysql
import mysql from "mysql2/promise";

//Se importa el archivo de enviroments
import enviroments from "../config/environments.js";

const { database } = enviroments;

//Se crea con pool la conexion a la BD y se mantiene abierta
const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;