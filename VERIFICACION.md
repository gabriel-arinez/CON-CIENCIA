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

## Versión 2 — auditoría y correcciones del 23 de octubre de 2026

En rama `fix/v2-calidad-educativa-mobile` se atendieron las siete observaciones de la auditoría:

1. **Respuestas básicas y avanzadas:** posiciones correctas distribuidas de forma estable entre las tres opciones y comprobadas en tests, eliminando el patrón único de la V1.
2. **Legibilidad móvil:** mayores tamaños de texto y mejora de la navegación inferior y tarjetas; comprobación automatizada de ausencia de desbordamiento.
3. **Identidad móvil:** la cabecera muestra el nombre CON-CIENCIA y un logo compacto incluso cuando el menú lateral está oculto.
4. **Apoyo visual:** diagramas educativos SVG locales de célula, membrana, expresión genética, divisiones celulares y respiración en lecciones de U1/U2.
5. **Automatización:** workflow CI de lint, TypeScript, tests, build y Chromium (Playwright) sobre Ubuntu 24.04, con pruebas de flujo.
6. **Retos Pro:** tres preguntas específicas por tema, sin mezclar arbitrariamente preguntas de unidades diferentes.
7. **Integridad de persistencia:** comprobación de puntuación frente a respuestas y estructura de cada intento; soporte de resultados guardados con el patrón histórico V1.

Resultados verificados por GitHub Actions en la rama:
- Lint, TypeScript, tests y build **aprobados**.
- Browser Chromium: cuestionario, recarga de progreso, activación/desactivación Pro, flashcards, vencimiento del temporizador y anchos 360/390/768/1440 **aprobados**.
- La publicación Cloudflare Pages **no ha sido ejecutada**: requiere crear el proyecto Pages en la cuenta Cloudflare y configurar credenciales, o usar Wrangler CLI local.
- Las pruebas Chromium automatizadas no sustituyen una revisión visual y táctil en un teléfono físico.

No se modificó el alcance curricular: se conservan 4 unidades y 15 temas.
