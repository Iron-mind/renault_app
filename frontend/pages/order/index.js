var JOB_TITLE = "JT";
import React from 'react';

export default function LoginView() {
  return (
    <div>
      <head>
        <title>Crear Orden de Arreglo de Carro</title>
      </head>
      <body>
        <h1>Crear Orden de Arreglo de Carro</h1>

        <form id="ordenForm">
          <label htmlFor="marca">Marca:</label>
          <input type="text" id="marca" name="marca" required /><br /><br />

          <label htmlFor="modelo">Modelo:</label>
          <input type="text" id="modelo" name="modelo" required /><br /><br />

          <label htmlFor="problema">Descripción del Problema:</label>
          <textarea id="problema" name="problema" rows="4" required></textarea><br /><br />

          <button type="button" onClick={crearOrdenArregloCarro}>Crear Orden</button>
        </form>

        <script src="tu_archivo_javascript.js"></script>
      </body>
    </div>
  );
}
function createOrder() {

  if (JOB_TITLE = "JT") {
    // Obtener los datos del formulario
    var marca = document.getElementById("marca").value;
    var modelo = document.getElementById("modelo").value;
    var problema = document.getElementById("problema").value;
    

    var orden = {
      marca: marca,
      modelo: modelo,
      problema: problema
    };
    

    alert("La orden ha sido creada exitosamente.");
    
    // Limpiar el formulario
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("problema").value = "";
  } else {
    // Mostrar un mensaje de error al usuario si no tiene el rol de "jefe de taller"
    alert("No tienes los permisos necesarios para crear una orden.");
  }
}


