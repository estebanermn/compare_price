require("colors");

const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./src/utils/inquirer");

const main = async () => {
  let opt = "";

  do {
    // Imprimir el menú
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        // crear opcion
        const product = await leerInput("Registrar Producto:");
        const url = await leerInput("Registrar url:");
        console.log(`Se registro el registro: ${product} ${url} `);
        break;

      case "2":
        break;

      case "3": // listar completadas
        break;

      case "4": // listar pendientes
        break;

      //   case "5": // completado | pendiente
      //     const ids = await mostrarListadoChecklist(tareas.listadoArr);
      //     tareas.toggleCompletadas(ids);
      //     break;

      //   case "6": // Borrar
      //     const id = await listadoTareasBorrar(tareas.listadoArr);
      //     if (id !== "0") {
      //       const ok = await confirmar("¿Está seguro?");
      //       if (ok) {
      //         tareas.borrarTarea(id);
      //         console.log("Tarea borrada");
      //       }
      //     }
      //     break;
    }

    await pausa();
  } while (opt !== "0");
};

main();
