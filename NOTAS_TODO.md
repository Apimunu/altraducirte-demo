## Scroll lento personalizado entre secciones

La función `scrollToIdSlow` permite hacer scroll suave y más lento entre secciones, respetando un offset personalizado (simulando el efecto de `scroll-mt`).

- **Ubicación:** `src/App.tsx`, justo después de la constante `globalSmoothScroll`.
- **Uso:** Se llama desde los enlaces de navegación para "servicios" y "proyectos".
- **Ajuste de offset:** El tercer parámetro de la función es el offset en píxeles (por defecto 222). Ejemplo: `scrollToIdSlow('servicios', 1200, 222)`.
- **Descripción:** El offset se resta manualmente al hacer scroll para que la sección quede alineada bajo la barra de navegación, igual que hacía `scroll-mt`.

Si necesitas cambiar la velocidad, ajusta el parámetro `duration` (en milisegundos).
## Control de la posición vertical de la frase gancho (#servicios)

La posición vertical de la frase gancho (HookPhrase) se controla con la siguiente línea en `src/App.tsx`:

```tsx
<div ref={ref} className="w-full flex justify-center mt-[-32px] md:mt-[-100px]">
```

Los valores `mt-[-32px]` (móvil) y `md:mt-[-100px]` (escritorio) ajustan el margen superior negativo, subiendo o bajando el bloque según se necesite. Modifica estos valores para cambiar la posición vertical de la frase gancho respecto al inicio de la sección #servicios.

Ubicación: función `HookPhrase`, archivo `src/App.tsx`, línea correspondiente al `<div ref={ref} ...`.
## Ajuste de alineación sección Servicios con barra de navegación


Para que la frase gancho de la sección #servicios quede perfectamente alineada justo debajo de la barra de navegación fija, se ha usado:

- **Clase:** `scroll-mt-[222px]`
- **Dónde:** En el archivo `src/App.tsx`, línea ~420, en la sección:
	```jsx
	<section
		ref={serviciosRef as any}
		id="servicios"
		className="scroll-mt-[222px] pt-0 md:pt-0 pb-0 bg-white flex flex-col items-center"
	>
	```

**IMPORTANTE:**
- Si cambias la altura de la barra de navegación, ajusta este valor para que el anclaje siga alineado.
- El valor actual (222px) es el que mejor cuadra visualmente con el diseño actual.

Referencia: conversación 8/10/2025.

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
