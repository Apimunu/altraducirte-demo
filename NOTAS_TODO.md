
# Tareas pendientes y puntos de retorno


## Palabras clave para volver a este punto:
- VOLVER A SCROLL NAV
- VOLVER A FLIP NAV

## Cómo volver a este punto para modificar la barra de navegación con animación flip
1. El efecto flip de los textos de la barra de navegación se implementa con el componente `FlipText` en `App.tsx`.
2. La animación flip está definida en `src/index.css` bajo `@layer utilities` como `.animate-flip` y `@keyframes flipY`.
3. Para modificar la animación (velocidad, tipo de giro, etc):
	- Edita la duración o los keyframes en `src/index.css`.
	- Si quieres quitar el efecto, elimina el uso de `<FlipText>` y usa el texto plano.
4. Para cambiar los textos o añadir más animaciones, edita el uso de `<FlipText>` en la barra de navegación dentro de `App.tsx`.
5. Si Tailwind no recarga los estilos, reinicia el servidor de desarrollo (`npm run dev`).

**Referencia de conversación:**
- Última versión: animación flip lenta (0.7s) en los textos de la barra de navegación al cambiar de idioma.
- Si necesitas restaurar el estado, revisa los commits recientes o este archivo para los pasos clave.

## Descripción
- Implementar navegación con scroll suave entre secciones desde la barra superior.
- Actualmente está funcionando para "Servicios" con scroll suave global.
- Pendiente: añadir anclas y navegación para el resto de secciones (Proyectos, Sobre mí, Inicio).

## Cómo usar
Cuando quieras retomar, dime: "VOLVER A SCROLL NAV" o "Retoma la tarea de scroll nav".

---

Puedes añadir aquí más notas, ideas o tareas relacionadas con la navegación o el diseño.
