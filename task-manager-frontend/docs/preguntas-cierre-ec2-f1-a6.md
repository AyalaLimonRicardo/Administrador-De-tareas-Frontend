# Preguntas de cierre - EC2 F1 A6

## 1. ¿Qué función cumple la interfaz Task?

Task describe la estructura que debe tener cada objeto de tarea: id, title, status, createdAt y updatedAt. Funciona como un contrato común, de modo que TypeScript avisa durante el desarrollo si a un objeto le falta una propiedad o tiene un tipo incorrectoo.

## 2. ¿Qué diferencia existe entre Task y TaskStatus?

Task es una interfaz que modela un objeto completo con varias propiedades. TaskStatus es un tipo unión ('pending' | 'completed') que limita los valores posibles de una sola propiedad, status. Task usa a TaskStatus para tipar su campo status.

## 3. ¿Qué significa declarar un arreglo como Task[]?

Significa que todos los elementos del arreglo deben cumplir con la interfaz Task. Si algún objeto no la cumple, TypeScript marca un error. Además, garantiza que se pueden usar métodos como map y filter con seguridad sobre propiedades conocidas.

## 4. ¿Qué hace el método map?

Recorre un arreglo y devuelve un arreglo nuevo con un resultado por cada elemento original, sin modificar el arreglo de origen. En React se usa para transformar datos en elementos visuales.

## 5. ¿Qué resultado produce map dentro de TaskList?

Produce un arreglo de elementos TaskItem, uno por cada tarea de la colección. React renderiza ese arreglo como la lista de tarjetas en pantalla.

## 6. ¿Para qué utiliza React la propiedad key?

React la usa para identificar de forma estable cada elemento de una lista y relacionarlo con su objeto de datos. Así puede saber qué elementos cambiaron, se agregaron o se eliminaron entre renderizados y actualizar solo lo necesario.

## 7. ¿Por qué se utiliza task.id y no el índice?

Porque task.id es único y pertenece a la tarea, aunque cambie su posición en la lista. El índice cambia si se reordena, filtra o elimina, lo que puede asociar un elemento visual con los datos equivocados. Tampoco debe usarse Math.random(), porque generaría una clave distinta en cada renderizado.

## 8. ¿Cómo se envía una tarea de TaskList a TaskItem?

Mediante una propiedad: dentro de map se escribe `<TaskItem key={task.id} task={task} />`. TaskItem la recibe como `task: Task` y la desestructura. La propiedad key no se recibe como prop porque la usa React internamente.

## 9. ¿Cómo se comunican App, TaskSummary y TaskList?

App importa la colección desde data/tasks.ts y la envía como prop `tasks` tanto a TaskSummary como a TaskList. Es un flujo unidireccional: los datos van del padre a los hijos, y TaskList a su vez los pasa a cada TaskItem.

## 10. ¿Qué es el renderizado condicional?

Es mostrar estructuras distintas según una condición. En TaskList, si `tasks.length === 0` se muestra el mensaje "No hay tareas registradas"; en caso contrario, se renderiza la lista.

## 11. ¿Por qué el resumen se calcula a partir de la colección?

Porque son datos derivados: el total, los pendientes y los completados pueden obtenerse de tasks con length y filter. Guardarlos manualmente duplicaría información y podría quedar desincronizada; calculándolos siempre reflejan la colección actual.

## 12. ¿Qué dificultad encontraste durante la refactorización y cómo la resolviste?

Escribe aquí tu respuesta con tus propias palabras.
