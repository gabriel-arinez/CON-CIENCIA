# Verificación del MVP

Revisión realizada el 23 de octubre de 2026.

## Comandos ejecutados

- `npm install`: dependencias instaladas; auditoría npm sin vulnerabilidades reportadas.
- `npm run lint`: aprobado.
- `npm run typecheck`: aprobado.
- `npm test`: 4 pruebas aprobadas. Cada banco de los 15 temas se evalúa con respuestas correctas e incorrectas.
- `npm run build`: aprobado. JavaScript de producción ~360 kB, ~115 kB comprimido; CSS ~26 kB, ~7 kB comprimido.
- `git diff --check`: aprobado antes de publicación.

## Navegador

Se recorrieron los quince temas y se respondieron sus tres preguntas básicas en la interfaz, obteniendo 3/3 en cada uno. Se verificaron también un intento 0/3, la retroalimentación, el mantenimiento de aprobaciones anteriores y el repaso generado a partir de errores. Se comprobó un desafío Pro con tres respuestas, resultado 300 puntos, flashcard que revela su explicación, estadísticas e historial, activación y desactivación Pro y bloqueo posterior de flashcards. Se editó y guardó el nombre, se recargó la página y se comprobó su persistencia. Una aprobación y sus notas se conservaron tras recargar y cambiar de plan.

Se revisaron vistas con anchos CSS efectivos de 360, 390, 768 y 1440 píxeles; los anchos del documento no superaron los del viewport en las vistas medidas (lección/desafío/flashcards e inicio en tableta y escritorio). Se corrigió el solapamiento decorativo de la cabecera en tableta. No se probó cada combinación de página y dispositivo físico.

Al reorganizar módulos y actualizar dependencias con el servidor de desarrollo abierto apareció un error temporal de HMR/hook. Se recargó el navegador y se verificó la versión de producción por separado: navegación a La célula, resolución 3/3, recarga y consola sin advertencias ni errores en esa pestaña de producción. No se considera la consola histórica del servidor de desarrollo una prueba de producción.

## Límites de la verificación

No se realizó una auditoría de accesibilidad externa ni se ejecutó en un teléfono físico. El cierre por tiempo del desafío está implementado con plazo de reloj y revisado en código; no se esperó su expiración completa durante la prueba manual. No se realizó un despliegue real en Cloudflare por falta de una sesión de cuenta configurada. Las fuentes científicas se enlazan en el contenido y se consultaron referencias OMS y NCBI durante la implementación.
