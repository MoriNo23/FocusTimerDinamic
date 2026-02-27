# Ajuste de diseño - Wrapper fluido para laptop y desktop

## TL;DR

> Hacer que `.app` cubra todo el viewport (100vw x 100vh) como wrapper fluido para evitar roturas en laptop y desktop, manteniendo los diseños actuales de mobile/tablet y desktop funcionando correctamente.

- **Problema actual**: El diseño desktop se rompe o no se adapta bien en laptops
- **Solución**: Wrapper fluido que cubra todo el viewport
- **Entregables**: CSS ajustado en `src/app.css`

---

## Contexto

### Request del usuario
- El área de dibujo (.app o body) debe cubrir todo el viewport como wrapper
- No需要有 cambios específicos para laptop vs escritorio
- El diseño debe ser fluido y no romperse

### Estado actual
- Mobile/Tablet (<1025px): flex-column, max-width 450px
- Desktop (≥1025px): grid con side-panel fijo de 450px

---

## Work Objectives

### Objetivo
Ajustar el CSS para que `.app` use dimensiones fluidas (100vw/100vh) que cubran todo el viewport sin scroll horizontal ni roturas.

- [x] `.app` debe tener dimensiones fluidas
- [x] Asegurar que no haya overflow horizontal
- [x] Mantener comportamiento responsive existente
- [ ] `.app` debe tener dimensiones fluidas
- [ ] Asegurar que no haya overflow horizontal
- [ ] Mantener comportamiento responsive existente

---

## Verificación Strategy

- **Test**: Abrir en laptop (1280x720) y verificar que no haya scroll horizontal
- **Test**: Verificar que el diseño desktop sigue funcionando en monitores grandes
- **Test**: Verificar que mobile/tablet sigue funcionando

---

## TODOs

- [x] 1. Ajustar `.app` para wrapper fluido

  **What to do**:
  - Modificar `.app` para usar `width: 100vw` y `height: 100vh` (o `min-height`)
  - Asegurar que `body` tenga `overflow-x: hidden`
  - Eliminar `max-width` fijo que causa roturas en laptops

  **Must NOT do**:
  - No romper el diseño mobile existente
  - No agregar breakpoints nuevos innecesarios

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Ajuste de CSS y diseño responsive
  - **Skills**: [`frontend-design`]
    - `frontend-design`: Diseño CSS fluido y responsive

  **Parallelization**:
  - **Can Run In Parallel**: NO (tarea única de CSS)
  - **Blocks**: Ninguno
  - **Blocked By**: Ninguno

  **References**:
  - `src/app.css` - Archivo a modificar

  - [x] `.app` tiene width: 100vw
- [x] No hay scroll horizontal en laptop (1280px)
- [x] Diseño desktop funciona en monitores grandes
  - [ ] `.app` tiene width: 100vw
  - [ ] No hay scroll horizontal en laptop (1280px)
  - [ ] Diseño desktop funciona en monitores grandes

  **QA Scenarios**:

  Scenario: Verificar wrapper fluido en laptop
    Tool: Bash
    Preconditions: Servidor corriendo en puerto 5173
    Steps:
      1. Abrir navegador a 1280x720
      2. Medir ancho de .app
      3. Verificar que no hay scroll horizontal
    Expected Result: .app cubre 100% del viewport sin scroll
    Evidence: Captura de pantalla a 1280px de ancho

  Scenario: Verificar diseño desktop en monitor grande
    Tool: Bash
    Preconditions: Servidor corriendo, monitor 1920x1080
    Steps:
      1. Abrir a ancho completo
      2. Verificar layout grid funciona
    Expected Result: Diseño desktop sin roturas
    Evidence: Captura de pantalla a 1920px de ancho
