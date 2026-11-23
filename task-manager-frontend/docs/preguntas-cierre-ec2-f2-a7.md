# Preguntas de cierre - EC2 F2 A7

## 1. ¿Qué diferencia existe entre una variable local y el estado de React?

Una variable local se reinicia en cada renderizado y, si cambia, React no se entera ni actualiza la pantalla. El estado lo conserva React entre renderizados y, al modificarlo con su función, vuelve a renderizar el componente con el valor nuevo.

## 2. ¿Qué valores devuelve useState?

Un arreglo de dos elementos: el valor actual del estado y una función para solicitar el siguiente valor. Por ejemplo `const [tasks, setTasks] = useState<Task[]>(...)`.

## 3. ¿Por qué useState se declara en el nivel superior del componente?

Porque React identifica cada estado por el orden en que se llaman los Hooks. Si se declarara dentro de condiciones, ciclos o funciones anidadas, el orden podría cambiar entre renderizados y React asociaría valores equivocados.

## 4. ¿Qué significa que un campo sea controlado?

Que su valor viene del estado (`value={title}`) y cada cambio se notifica con `onChange` para actualizar ese mismo estado. Así React, y no el navegador, es quien controla lo que muestra el campo.

## 5. ¿Por qué handleSubmit utiliza preventDefault?

Porque el comportamiento por defecto de un formulario es enviar y recargar la página, lo que borraría el estado en memoria. `preventDefault` lo evita para manejar el envío con React.

## 6. ¿Cómo comunica TaskForm una nueva tarea a App?

Mediante la función `onAddTask` que App le pasa por props. TaskForm la llama con el título validado, y App decide cómo crear la tarea y actualizar el estado.

## 7. ¿Por qué App funciona como fuente de verdad?

Porque la colección se guarda una sola vez, en App. TaskSummary y TaskList reciben el mismo arreglo, así que no hay copias que se desincronicen.

## 8. ¿Cómo se implementa Create sin utilizar push?

Se crea un arreglo nuevo con spread: `setTasks((currentTasks) => [newTask, ...currentTasks])`. No se modifica el arreglo original, así React detecta el cambio.

## 9. ¿Cómo permite map actualizar una sola tarea?

`map` recorre el arreglo y devuelve uno nuevo. Para la tarea cuyo id coincide devuelve una copia con los cambios (`{ ...task, status: ... }`); para las demás devuelve el mismo objeto.

## 10. ¿Cómo utiliza filter la operación Delete?

`filter` devuelve un arreglo nuevo con solo las tareas que cumplen la condición. Con `task.id !== id` conserva todas menos la seleccionada, sin usar splice ni pop.

## 11. ¿Por qué se emplea una función actualizadora en setTasks?

Porque el siguiente estado depende del anterior. La función recibe el estado pendiente más reciente (`currentTasks`), lo que evita trabajar con un valor desactualizado.

## 12. ¿Qué información conserva TaskItem como estado local?

Solo el estado temporal de la edición: `isEditing` y `draftTitle`. La colección sigue en App y se modifica con las funciones recibidas por props.

## 13. ¿Por qué los cambios desaparecen al recargar la página?

Porque el estado vive solo en la memoria de la página. Al recargar se vuelve a ejecutar el código y regresan las cinco tareas iniciales. Todavía no se usa localStorage ni una API.

## 14. ¿Qué dificultad encontraste y cómo la resolviste?

Segui estudiando y checando los useState y como funciona el local storage
