# Preguntas de cierre - EC2 F1 A5

## 1. ¿Qué problema resuelve React al construir una interfaz?

React permite construir la interfaz a partir de piezas pequeñas y reutilizables (componentes) en lugar de manipular el documento completo a mano. Así la interfaz se organiza mejor, se reutiliza código y es más fácil de mantener a medida que crece.

## 2. ¿Qué es un componente?

Es una función que devuelve la representación (TSX) de una parte de la interfaz, por ejemplo AppHeader o TaskItem. Puede usar otros componentes y recibir datos mediante props.

## 3. ¿Por qué los componentes comienzan con mayúscula?

Porque React distingue así los componentes de las etiquetas HTML normales. `<TaskForm />` se interpreta como un componente; `<form>` en minúscula, como una etiqueta del navegador.

## 4. ¿Qué diferencia existe entre HTML y TSX?

TSX se parece a HTML pero se escribe dentro de TypeScript. Usa className en lugar de class, htmlFor en lugar de for, exige cerrar todas las etiquetas (como `<input />`) y permite insertar expresiones entre llaves.

## 5. ¿Para qué se utiliza className?

Para asignar clases CSS a un elemento en TSX, ya que `class` es una palabra reservada de JavaScript. Permite aplicar estilos, incluso dinámicos, como `task-item--${status}`.

## 6. ¿Qué son las propiedades o props?

Son los datos que un componente padre envía a un componente hijo, parecido a los atributos de una etiqueta. Por ejemplo, `<TaskItem title="..." status="pending" />`.

## 7. ¿Cómo ayuda TypeScript a validar las propiedades?

Con interfaces como TaskItemProps se define qué props existen y de qué tipo son. Si falta una, o se envía una cadena donde se espera un número, TypeScript marca el error antes de ejecutar la aplicación.

## 8. ¿Cuál es la responsabilidad de App.tsx?

Es el componente principal y coordina la estructura general: importa los demás componentes, los compone en el orden de la página y les pasa los datos que necesiten.

## 9. ¿Por qué la interfaz se dividió en varios componentes?

Para que cada uno tenga una responsabilidad específica (encabezado, formulario, filtros, resumen, lista, tarea). Eso facilita entender, probar, reutilizar y modificar cada parte sin afectar las demás.

## 10. ¿Por qué los botones todavía están deshabilitados?

Porque en esta actividad aún no se usan estado ni eventos. El comportamiento (agregar, editar, cambiar estado y eliminar) se implementará en actividades posteriores.

## 11. ¿Qué componente consideras más reutilizable y por qué?

TaskItem, porque con la misma estructura muestra tareas distintas solo cambiando las props title y status. Se usa tres veces en TaskList.

## 12. ¿Qué dificultad encontraste y cómo la resolviste?

Ni una pa
