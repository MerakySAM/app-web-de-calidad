# Portal de Formatos (MVP)

Interfaz inicial para centralizar formatos por área:

- Menú por áreas (pestañas dinámicas).
- Búsqueda por nombre, área, descripción o palabras clave.
- Botón para abrir cada formato (redirección por URL).
- Modo admin para crear/editar formatos y guardar datos en `localStorage`.

## Ejecutar

Como es una app estática, puedes abrir `index.html` directamente en el navegador o usar un servidor local simple.

Ejemplo con Python:

```bash
python3 -m http.server 8080
```

Luego visita `http://localhost:8080`.

## Descarga rápida (ZIP)

Si prefieres subir manualmente a GitHub sin terminal, usa el archivo `portal-formatos-mvp.zip` que viene en la raíz del proyecto.
Ese ZIP incluye: `index.html`, `styles.css`, `app.js`, `README.md` y `docs/propuesta-app-formularios.md`.

## ¿Los guardo todos como `.html` en Bloc de notas?

No. Cada archivo va con su extensión correcta:

- `index.html`  ✅
- `styles.css`  ✅
- `app.js`      ✅

Si usas Bloc de notas (Windows), al guardar:

1. En **Nombre**, escribe por ejemplo `index.html`.
2. En **Tipo**, cambia a **Todos los archivos (*.*)**.
3. En **Codificación**, deja **UTF-8**.
4. Repite para `styles.css` y `app.js` (cada uno en archivo separado).

> Si lo guardas como “Documento de texto (*.txt)”, te quedará `index.html.txt` y no funcionará.

## ¿Cómo lo paso a GitHub? (sin terminal, súper simple)

Si quieres evitar comandos, haz esto:

1. Entra a tu repo en GitHub.
2. Clic en **Add file** → **Upload files**.
3. Sube estos archivos:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md` (opcional)
   - `docs/propuesta-app-formularios.md` (opcional)
4. Abajo escribe un mensaje (ej: `Subo MVP portal formatos`).
5. Clic en **Commit changes**.

Listo: con eso ya quedan en GitHub.

### Si prefieres subir el ZIP

También puedes subir `portal-formatos-mvp.zip` con el mismo botón **Upload files**.
Luego (si quieres editar código desde GitHub), conviene subir también los archivos sueltos para verlos directo en el navegador.

## ¿Cómo se descargan los archivos?

### Descargar **un archivo** desde GitHub

1. Abre el archivo (por ejemplo `index.html`).
2. Clic en el botón **Download raw file** (o **Raw**).
3. Se descarga a tu computador.

### Descargar **todo el proyecto** desde GitHub

1. En la página principal del repo, clic en botón verde **Code**.
2. Clic en **Download ZIP**.
3. Descomprime el `.zip` en tu computador.

### Descargar el paquete listo (`portal-formatos-mvp.zip`)

1. En el listado de archivos del repo, clic en `portal-formatos-mvp.zip`.
2. Clic en **Download**.
3. Descomprime el archivo para ver `index.html`, `styles.css` y `app.js`.

### Si NO te aparecen esos botones (solución rápida)

Pasa mucho en celular, en la app móvil de GitHub o si estás en una vista distinta.

Haz esto exactamente:

1. Abre GitHub en navegador (Chrome/Edge), no en la app.
2. Entra a: `https://github.com/<tu-usuario>/<tu-repo>`
3. Presiona el botón verde **Code**.
4. Si no ves **Download ZIP**, usa estos enlaces directos:
   - Rama con cambios (`work`):  
     `https://github.com/<tu-usuario>/<tu-repo>/archive/refs/heads/work.zip`
   - Rama principal (`main`):  
     `https://github.com/<tu-usuario>/<tu-repo>/archive/refs/heads/main.zip`

Si te dice “carpeta vacía”, estás viendo una rama sin los cambios.
Cambia de rama arriba a la izquierda a **`work`** y vuelve a intentar.

### Si sale `404 Not Found`

Normalmente es por una de estas razones:

1. La URL tiene un error (usuario o nombre del repo diferente).
2. El repositorio es privado y no has iniciado sesión.
3. La rama no existe todavía en GitHub (por ejemplo `work` no se ha subido).

Chequeo rápido:

1. Abre primero `https://github.com/<tu-usuario>/<tu-repo>`.
2. Si esa página abre, entonces prueba el ZIP de `work`.
3. Si no abre, corrige el usuario/repo o inicia sesión en GitHub.

## ¿Quedan subidos directamente a GitHub?

No automáticamente.

Los archivos quedan guardados en este repositorio local/entorno de trabajo. Para que aparezcan en GitHub necesitas:

1. Tener un remoto configurado (`origin`).
2. Hacer `git push` de la rama.
3. Abrir/mergear el Pull Request en GitHub.

Ejemplo:

```bash
git remote -v
git push -u origin <tu-rama>
```

## Publicar cambios de este entorno a GitHub (paso a paso)

### 1) Verifica que exista un remoto

```bash
git remote -v
```

Si no aparece `origin`, agrégalo:

```bash
git remote add origin https://github.com/<usuario>/<repo>.git
```

### 2) Confirma en qué rama estás

```bash
git branch --show-current
```

### 3) Sube la rama actual

```bash
git push -u origin <tu-rama>
```

> Si usas HTTPS, GitHub puede pedir token (PAT) en lugar de contraseña.

### 4) Crea o actualiza el Pull Request

- Si ya hay PR para esa rama: se actualiza solo al hacer `push`.
- Si no hay PR: créalo en GitHub desde la sugerencia “Compare & pull request”.

### 5) Merge a `main`

Cuando apruebes el PR en GitHub, haz **Merge** y los cambios quedarán en la rama principal.

## ¿Dónde veo eso en GitHub (sin terminal)?

`git remote` es un comando de terminal, no un botón dentro de GitHub.

Para obtener la URL del remoto desde la web de GitHub:

1. Entra a tu repositorio.
2. Haz clic en el botón verde **Code**.
3. Copia la URL de **HTTPS** o **SSH**.
4. Esa URL es la que se usa en `git remote add origin <url>`.

Ejemplo:

```bash
git remote add origin https://github.com/tu-usuario/tu-repo.git
```

Si quieres validar desde GitHub que tu rama ya subió:

- Ve a la pestaña **Pull requests**.
- O en el selector de ramas (arriba a la izquierda), busca tu rama.

## ¿Cuál HTTPS debo pegar exactamente?

Debes pegar la URL **HTTPS de TU repositorio** (la que sale en botón **Code**), por ejemplo:

```text
https://github.com/<tu-usuario>/<tu-repo>.git
```

Ejemplos reales de formato:

- `https://github.com/maria/portal-formatos.git`
- `https://github.com/empresa-calidad/app-web-de-calidad.git`

Comando final:

```bash
git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
```

Para confirmar que quedó bien:

```bash
git remote -v
```

Debe mostrar algo como `origin  https://github.com/<tu-usuario>/<tu-repo>.git`.

## Guía cero (sin programar): qué debes crear primero

Si no eres programador, hazlo así de simple:

1. **Primero crea el repositorio en GitHub**
   - Entra a GitHub.
   - Clic en **New repository**.
   - Ponle nombre (ej: `portal-formatos`).
   - Clic en **Create repository**.

2. **Copia la URL HTTPS del botón verde `Code`**
   - Ejemplo: `https://github.com/tu-usuario/portal-formatos.git`

3. **Conecta este proyecto con ese repositorio** (solo una vez)
   - En terminal:

   ```bash
   git remote add origin https://github.com/tu-usuario/portal-formatos.git
   ```

4. **Sube los cambios**

   ```bash
   git push -u origin work
   ```

5. **Ve a GitHub y abre el Pull Request**
   - GitHub te mostrará botón **Compare & pull request**.
   - Clic allí y luego **Create pull request**.

6. **Cuando esté bien, haz Merge**
   - Eso deja tus cambios en la rama principal (`main`).

### Resumen rápido

- Sí, **primero crea el repo en GitHub**.
- Luego copias HTTPS y haces `git remote add origin ...`.
- Después `git push`.
- Finalmente PR y Merge.

## Si ya tienes el enlace, ¿me lo mandas?

Sí, puedes compartirlo y te digo el comando exacto.

Mientras tanto, la forma general es:

```bash
git remote add origin <PEGA_AQUI_TU_ENLACE_HTTPS>
git push -u origin work
```

Ejemplo real:

```bash
git remote add origin https://github.com/tu-usuario/portal-formatos.git
git push -u origin work
```

Si te sale error de `remote origin already exists`, usa:

```bash
git remote set-url origin <PEGA_AQUI_TU_ENLACE_HTTPS>
```

## Comandos con tu repositorio (MerakySAM)

Con el enlace que compartiste, los comandos exactos son:

```bash
git remote add origin https://github.com/MerakySAM/app-web-de-calidad.git
git push -u origin work
```

Si `origin` ya existe:

```bash
git remote set-url origin https://github.com/MerakySAM/app-web-de-calidad.git
git push -u origin work
```

## ¿Y ahora qué hago con esos comandos?

Haz esto en orden:

1. Abre la terminal en la carpeta del proyecto.
2. Pega y ejecuta:

   ```bash
   git remote add origin https://github.com/MerakySAM/app-web-de-calidad.git
   git push -u origin work
   ```

3. Ve a tu repo en GitHub: `https://github.com/MerakySAM/app-web-de-calidad`.
4. Busca el botón **Compare & pull request** y haz clic.
5. Clic en **Create pull request**.
6. Luego clic en **Merge pull request** para pasar cambios a `main`.

Si sale error de autenticación:

- Inicia sesión en GitHub en tu navegador.
- Reintenta `git push`.
- Si te pide credenciales, usa un **Personal Access Token (PAT)** en lugar de contraseña.

## Si en GitHub (Code) solo ves `README` y `.gitkeep`

Eso normalmente significa que estás viendo la rama `main`, pero tus cambios quedaron en otra rama (por ejemplo `work`).

Haz esto:

1. Entra a tu repo en GitHub:  
   `https://github.com/MerakySAM/app-web-de-calidad`
2. Arriba a la izquierda, abre el selector de rama (donde suele decir `main`).
3. Cambia a la rama `work`.
4. Si en `work` sí ves `index.html`, `app.js`, `styles.css`, entonces solo falta hacer **Pull Request** y **Merge** hacia `main`.

### Flujo rápido para dejar todo visible en `main`

1. Asegúrate de haber subido `work`:

   ```bash
   git push -u origin work
   ```

2. En GitHub, crea PR: `work` → `main`.
3. Haz clic en **Merge pull request**.
4. Vuelve a la rama `main` en el selector de ramas.
5. Ahora en **Code** ya deben aparecer todos los archivos.

### Verificación en terminal (opcional)

```bash
git branch --show-current
git status
```

Si estás en `work` y dice `nothing to commit`, tus cambios locales ya están guardados; lo pendiente es `push` + `merge` en GitHub.

## No veo “Terminal”: cómo abrirla (paso a paso, sin programar)

Si estás solo en la página de GitHub, es normal que no veas una terminal ahí.
La terminal se abre en tu computador (Windows/Mac), no dentro del botón **Code**.

### Opción A (recomendada): GitHub Desktop (sin comandos)

1. Instala **GitHub Desktop**: https://desktop.github.com/
2. Inicia sesión con tu cuenta GitHub.
3. En tu repo, pulsa **Code** > **Open with GitHub Desktop**.
4. En GitHub Desktop, usa:
   - **Fetch origin / Push origin** para subir cambios.
   - **Branch** para cambiar de rama (`work` o `main`).
   - **Create Pull Request** para abrir el PR.

> Si quieres evitar terminal por completo, esta opción es la más fácil.

### Opción B: Terminal en Windows

1. Abre **Inicio** (tecla Windows).
2. Escribe `PowerShell` (o `Git Bash` si instalaste Git).
3. Abre la app.
4. Ve a la carpeta del proyecto con:

   ```bash
   cd RUTA/DE/TU/CARPETA/app-web-de-calidad
   ```

5. Pega el comando con clic derecho o `Ctrl + V`:

   ```bash
   git push -u origin work
   ```

### Opción C: Terminal en Mac

1. Abre **Spotlight** (`Cmd + Espacio`).
2. Escribe `Terminal` y presiona Enter.
3. Ve a la carpeta del proyecto:

   ```bash
   cd /ruta/de/tu/carpeta/app-web-de-calidad
   ```

4. Pega y ejecuta:

   ```bash
   git push -u origin work
   ```

### Si no tienes el proyecto en tu computador todavía

Primero debes descargarlo (clonarlo):

```bash
git clone https://github.com/MerakySAM/app-web-de-calidad.git
cd app-web-de-calidad
git checkout work
```

Luego ya puedes ejecutar `git push -u origin work` cuando hagas cambios.
