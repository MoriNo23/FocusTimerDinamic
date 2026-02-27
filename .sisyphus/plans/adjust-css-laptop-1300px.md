# Ajuste CSS para laptop 1300px

## TL;DR

> Reducir padding, gap y tamaños de elementos para que todo quepa en pantalla de laptop con width 1300px.

- **Problema**: El layout actual no cabe en pantalla de 1300px
- **Solución**: Reducir valores fijos de padding, gap y tamaños de componentes

---

## Contexto

### Request del usuario
- Laptop con 1300px de ancho
- El contenido no cabe completo en pantalla
- Necesita que TODO el contenido sea fluido y quepa sin scroll

### Análisis actual
Para 1300px de viewport:
- `padding: 60px 80px` = 160px
- `gap: 60px`
- `clock: min(45vw, 600px)` = ~585px
- `side-panel: min(35vw, 450px)` = ~455px
- **Total calculado**: ~1260px + overhead = overflow

---

## Work Objectives

### Objetivo
Ajustar los valores CSS para que el layout completo quepa en 1300px sin overflow.

- [x] Reducir padding de `.app` de 60px/80px a 20px/30px
- [x] Reducir gap de 60px a 20px
- [x] Reducir tamaño del reloj de min(45vw, 600px) a min(30vw, 350px)
- [ ] Reducir padding de `.app` de 60px/80px a 30px/40px
- [ ] Reducir gap de 60px a 30px
- [ ] Reducir tamaño del reloj de min(45vw, 600px) a min(40vw, 500px)

---

## Verificación Strategy

- **Test**: Abrir en laptop (1300px) y verificar que todo cabe sin scroll horizontal

---

## TODOs

- [ ] 1. Reducir valores CSS para laptop 1300px

  **What to do**:
  - En `.app` (línea ~361): `padding: 60px 80px` → `padding: 30px 40px`
  - En `.app` grid (línea ~370): `gap: 60px` → `gap: 30px`
  - En `.ring-wrapper` (líneas ~397-399): 
    - `width: min(45vw, 600px)` → `width: min(40vw, 500px)`
    - `height: min(45vw, 600px)` → `height: min(40vw, 500px)`

  **Must NOT do**:
  - No romper diseño mobile (<1025px)
  - No romper diseño desktop grande (>1600px)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: Ninguno
  - **Blocked By**: Ninguno

  **References**:
  - `src/app.css` - Archivo a modificar

  - [x] Padding reducido a 20px 30px
- [x] Gap reducido a 20px
- [x] Reloj reducido a min(30vw, 350px)
- [x] Todo cabe en 1300px sin scroll
  - [ ] Padding reducido a 30px 40px
  - [ ] Gap reducido a 30px
  - [ ] Reloj reducido a min(40vw, 500px)
  - [ ] Todo cabe en 1300px sin scroll horizontal

  **QA Scenarios**:

  Scenario: Verificar que todo cabe en laptop 1300px
    Tool: Bash
    Preconditions: Servidor corriendo en puerto 5173
    Steps:
      1. Abrir navegador a 1300x800
      2. Medir ancho del body
      3. Verificar que no hay scroll horizontal
    Expected Result: Todo el contenido visible sin scroll
    Evidence: Captura de pantalla a 1300px

  Scenario: Verificar diseño mobile sigue funcionando
    Tool: Bash
    Preconditions: Servidor corriendo
    Steps:
      1. Abrir a 375px de ancho
      2. Verificar layout vertical funciona
    Expected Result: Diseño mobile sin roturas
    Evidence: Captura de pantalla a 375px
