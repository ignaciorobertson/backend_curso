var pool = require('./bd');

var id = 1; 

pool.query("delete from alumnos where id = ?", [id]).then(function(resultados) 
    {
        console.log(resultados); 
        console.log("Alumno eliminado correctamente");
    }
);