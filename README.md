# CON-CIENCIA

Tu plataforma de biología. MVP escolar mobile-first: cuatro unidades, quince temas, lecciones, evaluaciones con retroalimentación, perfil editable y seguimiento local. Incluye el logotipo original del repositorio y diagramas SVG propios sin dependencias de imágenes remotas.

## Stack y requisitos

Node.js 22 o 24 y npm. React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Lucide React y componente Button con el patrón shadcn/ui (Radix Slot, CVA y tailwind-merge). Sin backend, cuentas, servicios comerciales ni pagos.

```bash
npm ci
npm run dev
```

Abre la URL que imprime Vite. Para un celular, conecta ambos equipos a la misma Wi-Fi y abre la dirección `Network` de Vite, por ejemplo `http://192.168.0.9:5174`. El puerto puede variar si ya está ocupado. La computadora debe permanecer encendida y permitir acceso al puerto del servidor. Este enlace solo sirve dentro de esa red.

## Comprobaciones y build

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

La salida publicable está en `dist/`. Las pruebas verifican los quince bancos de preguntas, puntuación, progreso, persistencia corrupta, restricciones Pro y conservación del avance. No se atribuyen pruebas a una ejecución que no se haya realizado. Los detalles de la revisión de este MVP están en `VERIFICACION.md`.

## Publicar en Cloudflare Pages

1. Sube la rama a GitHub e intégrala en la rama que quieras publicar.
2. En Cloudflare, abre **Workers & Pages → Create application → Pages → Import an existing Git repository** y selecciona `gabriel-arinez/CON-CIENCIA`.
3. Selecciona tu rama de producción (por ejemplo `main`, tras integrar los cambios). Framework: **React (Vite)**. Directorio raíz: `/`. Comando: `npm run build`. Salida: `dist`.
4. Configura `NODE_VERSION` como `22` si tu entorno de construcción no usa una versión compatible.
5. Guarda y despliega. Cloudflare proporcionará una URL HTTPS `https://<nombre-del-proyecto>.pages.dev` que puede abrirse desde cualquier navegador móvil.
6. Prueba abrir y recargar directamente `/leccion/celula`, `/progreso` y `/plan`.

Alternativa sin vincular Git: genera el build y carga la carpeta `dist` desde la opción **Direct Upload / Upload assets** de Pages. Los nombres exactos del panel pueden variar. El archivo `public/_redirects`, copiado al build, resuelve las rutas del SPA a `index.html`. No agregues un `404.html` que intercepte este comportamiento.

No se ha configurado una cuenta de Cloudflare ni se han solicitado credenciales. No se afirma que exista un despliegue público hasta obtener una URL real.

## Persistencia y reglas de progreso

`localStorage`, clave `con-ciencia-v1`, guarda nombre, plan de demostración, último tema e intentos con fecha, respuestas y puntuación. Los datos faltantes o corruptos se descartan con valores iniciales; si el almacenamiento no está disponible, la interfaz avisa y funciona en memoria durante esa sesión.

Un tema se completa con **2 de 3 aciertos** en cualquier intento básico. Repetirlo no duplica el progreso; un intento posterior peor no elimina una aprobación. Cada tema pesa lo mismo, tanto en el total como en su unidad. Los desafíos no completan temas básicos. Los resultados se conservan al cambiar de plan. No se precargan notas ficticias. Los cuestionarios ya corregidos se conservan; las respuestas de una evaluación todavía no enviada no se recuperan al recargar.

En **Perfil → Reiniciar recorrido**, confirma el borrado para comenzar una nueva demostración. Esta acción elimina los datos locales de la app; no modifica otros sitios.

## Demostración gratuita y Pro

1. Inicio → Cursos → Unidad 1 → La célula.
2. Lee y responde las tres preguntas; consulta la nota y el progreso.
3. Recarga: la aprobación y el resultado se conservan.
4. Mi plan compara Gratuito (Bs 0) y Pro (Bs 15/mes referenciales).
5. Pulsa **Activar demostración Pro**. No se cobra ni se crea una suscripción.
6. Usa Desafíos (3 preguntas de aplicación, 90 segundos, 100 puntos por acierto), Flashcards (15 tarjetas), Repaso personalizado y Estadísticas.
7. En Mi plan pulsa **Desactivar demostración Pro**. Las herramientas se restringen de nuevo y el progreso permanece.

El desafío mezcla el tema elegido con los dos siguientes, en orden circular. Se atribuye al tema de partida en el historial. Al terminar el tiempo se corrigen las respuestas marcadas; las no contestadas cuentan como errores. El repaso utiliza los errores del último intento básico por tema. Las estadísticas incluyen todos los intentos y distinguen desafíos de evaluaciones básicas.

## Contenido y fuentes

Explicaciones escolares originales y esquemas simplificados. No sustituyen atención médica. Referencias de consulta enlazadas en las lecciones:

- [Biología celular, NCBI Bookshelf](https://www.ncbi.nlm.nih.gov/books/NBK21054/).
- [Anticoncepción, OMS](https://www.who.int/news-room/fact-sheets/detail/family-planning-contraception).
- [VPH y cáncer, OMS](https://www.who.int/news-room/fact-sheets/detail/human-papilloma-virus-and-cancer).

## Estructura

- `src/content.ts`: currículo, secciones, preguntas y fuentes.
- `src/model.ts`: persistencia, corrección, cálculo de avance y recomendaciones.
- `src/App.tsx`: estructura y navegación.
- `src/pages.tsx`: pantallas y recorridos educativos.
- `src/components/Quiz.tsx`: corrección interactiva y desafíos cronometrados.
- `src/components/Science.tsx`: ilustraciones SVG locales.
- `src/components/ui/button.tsx`: botón reutilizable de patrón shadcn/ui.
- `src/style.css`: identidad, componentes y adaptaciones responsive.
- `public/`: logotipo y configuración SPA para Pages.

## Límites del MVP

Datos por navegador y origen, sin sincronización entre equipos, autenticación ni control comercial. Pro es una demostración local y puede manipularse desde el navegador. Los bancos son finitos y repetibles; no hay IA, pagos, notificaciones ni funcionamiento offline garantizado. Los esquemas son educativos y simplificados. Borrar los datos del navegador elimina el avance. La accesibilidad incorpora etiquetas, foco visible, teclado y movimiento reducido; no se realizó una auditoría externa completa.
