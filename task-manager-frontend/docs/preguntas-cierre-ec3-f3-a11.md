# Preguntas de cierre EC3 F3 A11

> Borrador: reescribe cada respuesta con tus propias palabras antes de entregar.

## 1. ¿Qué diferencia existe entre autenticación y autorización?

Autenticación verifica quién eres (login con credenciales válidas, 401 si falla); autorización decide qué puedes hacer con esa identidad (rol admin para eliminar, 403 si no).

## 2. ¿Qué información guarda sessionStorage y qué información no debe guardar?

Solo el accessToken, bajo la clave task-manager.access-token. No contraseñas, ni el objeto usuario, ni datos que puedan reconstruirse desde la API.

## 3. ¿Por qué se consulta /api/auth/me al recargar?

Porque el token guardado puede haber expirado o ser inválido; /auth/me lo valida con el Backend y recupera usuario y rol sin guardarlos en el navegador.

## 4. ¿Por qué el Frontend no debe confiar en decodificar un JWT sin verificarlo?

Decodificar solo lee el payload; no comprueba firma ni expiración. Solo el Backend, que tiene el secreto, puede verificarlo; la interfaz solo usa lo que la API responde.

## 5. ¿Qué responsabilidad tiene AuthProvider?

Guarda el estado de sesión (checking, anonymous, authenticated), el usuario y el token, restaura la sesión al cargar y expone login, register y logout.

## 6. ¿Qué beneficio ofrece useAuth?

Da acceso a la sesión desde cualquier componente sin pasar props, y lanza un error claro si se usa fuera del proveedor.

## 7. ¿Qué representa el estado checking?

Que existe un token guardado pero aún no se validó con /auth/me. Evita mostrar contenido protegido o redirigir a login por error durante la carga.

## 8. ¿Qué diferencia existe entre 401 y 403?

401: no hay identidad válida (falta, expiró o es inválida), se limpia la sesión. 403: la identidad es válida pero no tiene permiso, la sesión se conserva.

## 9. ¿Por qué ProtectedRoute no sustituye la seguridad del Backend?

Porque corre en el navegador y el usuario puede manipularla; solo mejora la experiencia. La API vuelve a autenticar y autorizar cada solicitud.

## 10. ¿Por qué ocultar Eliminar a user no constituye autorización?

Porque quien conozca el endpoint puede enviar DELETE manualmente. La API responde 403 a user; ocultar el botón es solo una ayuda visual.

## 11. ¿Por qué un cambio de rol exige iniciar sesión de nuevo?

Porque el rol va dentro del JWT ya emitido, y authorize usa ese rol. Un nuevo login genera un token con el rol actualizado.

## 12. ¿Qué ocurre realmente al seleccionar Cerrar sesión?

Se borra el token de sessionStorage y el estado en memoria, y se vuelve a anónimo. No invalida el JWT en el servidor: sigue válido hasta que expire.

## 13. ¿Qué riesgo conserva sessionStorage ante XSS?

Cualquier script inyectado (XSS) en la página puede leer sessionStorage y robar el token. Por eso se debe evitar inyección de HTML y se prefieren tokens de corta vida.

## 14. ¿Por qué las tareas todavía no pertenecen a un usuario específico?

Porque el modelo de tareas aún no tiene un campo de propietario; todos los usuarios autenticados ven las mismas tareas. Eso queda para una actividad posterior.

## 15. ¿Qué dificultad encontraste al integrar la sesión y cómo la resolviste?

(Escribe aquí tu experiencia real; por ejemplo: restaurar la sesión sin parpadeos, resuelto con el estado checking y /auth/me.)

