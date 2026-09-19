# NewsHub

Plataforma web de noticias para consultar, guardar, crear y eliminar artículos desde el navegador. Es un proyecto académico del módulo de **Desarrollo de Front-end** del Politécnico Grancolombiano.

La aplicación funciona por completo en el cliente: el JSON semilla se carga una vez y a partir de ahí el estado vive en `localStorage`.

## Demo en vivo

[https://frontend-poli.santiagosaavedra.com.co](https://frontend-poli.santiagosaavedra.com.co)

## Tecnologías

- HTML, CSS y JavaScript vanilla
- ES Modules nativos (`type="module"`), sin bundler, sin transpilación y sin frameworks en esta entrega
- `fetch` para cargar el JSON de noticias y los fragmentos de layout (header y footer)
- `localStorage` como capa de persistencia (noticias, favoritos y mensajes de contacto)

No hay build step. El navegador resuelve los imports y sirve los archivos tal como están en el repositorio.

## Estructura del proyecto

```text
.
├── globals.css
├── index.html
└── src/
    ├── assets/
    │   ├── data/
    │   │   └── posts.json
    │   ├── fonts/
    │   └── images/
    ├── domain/
    │   ├── detail.js
    │   ├── favorites.js
    │   └── posts.js
    ├── services/
    │   ├── favorites.service.js
    │   ├── http-client.service.js
    │   ├── local-storage.service.js
    │   └── posts.service.js
    └── ui/
        ├── components/
        │   ├── footer.html
        │   └── header.html
        ├── pages/
        │   ├── contact.html
        │   ├── create.html
        │   ├── detail.html
        │   ├── favorites.html
        │   └── list.html
        ├── scripts/
        │   ├── card.component.js
        │   ├── contact.page.js
        │   ├── create.page.js
        │   ├── detail.page.js
        │   ├── dialog.component.js
        │   ├── favorites.page.js
        │   ├── hero.component.js
        │   ├── home.page.js
        │   ├── layout.js
        │   └── list.page.js
        └── styles/
            ├── button.component.css
            ├── card.component.css
            ├── contact.page.css
            ├── create.page.css
            ├── detail.page.css
            ├── dialog.component.css
            ├── favorites.page.css
            ├── footer.component.css
            ├── header.component.css
            ├── hero.component.css
            ├── home.page.css
            └── list.page.css
```

- `src/domain/` contiene reglas de negocio puras: filtrar, ordenar, recortar listados, generar slugs y decidir si un artículo está en favoritos.
- `src/services/` habla con el mundo exterior: HTTP para el JSON semilla y el HTML del layout, y `localStorage` para persistir posts, favoritos y el formulario de contacto.
- `src/ui/pages/` son las vistas HTML. `src/ui/scripts/` orquesta cada página. `src/ui/styles/` y `src/ui/components/` cubren presentación y piezas reutilizables de layout.

## Decisiones de arquitectura

### Domain separado de services

El dominio no conoce `localStorage`, `fetch` ni el DOM. Funciones como `filterNotDeleted`, `sortByDate`, `slugify` o `isFavorited` reciben datos y devuelven datos. No leen el almacenamiento, no lanzan peticiones y no mutan la interfaz.

Eso permite probar y razonar la lógica de negocio sin montar un navegador. Si mañana las noticias dejaran de vivir en `localStorage` y pasaran a una API, `domain/` no tendría que cambiar: cambiaría el adaptador en `services/`.

### Services como adaptadores de infraestructura

`PostsService` y `FavoritesService` sí tienen efectos secundarios: leen y escriben claves de `localStorage`, y en el primer arranque hidratan el almacén con `posts.json` a través de `HttpClient`. `LocalStorageService` encapsula `getItem` / `setItem` y el parseo JSON. `HttpClient` encapsula `fetch` y la validación del `Content-Type`.

Las páginas (`home.page.js`, `list.page.js`, `detail.page.js`, etc.) no hablan con `window.localStorage` ni con `fetch` de forma directa para el negocio. Piden datos al servicio, aplican reglas de dominio y recién entonces pintan el DOM.

### El mismo principio de puertos y adaptadores

En backend, la arquitectura hexagonal (puertos y adaptadores) deja el núcleo de la aplicación independiente de bases de datos, HTTP o colas. Aquí se aplica la misma idea a una SPA estática:

- El **puerto** es el contrato que la UI necesita (obtener posts, crear, marcar favorito, borrar).
- El **adaptador** es `services/`, pegado a `localStorage` y a archivos estáticos.
- El **núcleo** es `domain/`.

La UI depende de reglas y de servicios, no de cómo se persiste un array. El detalle de infraestructura queda en un solo lugar.

### BEM en CSS, porque no hay scoping

Sin un framework no existe CSS Modules, Shadow DOM ni convenciones automáticas de nombres. Un `.title` o un `.button` genérico choca entre páginas. BEM (`bloque__elemento--modificador`) hace explícito el dueño de cada regla: `.card__title` no pisa `.create__title`, y `.button--accent` no depende del contexto HTML para verse igual en Home, Contacto o Crear.

Esa predecibilidad importa más en este proyecto, donde cada página carga su propio CSS a mano y el CSS es global para el documento.

### Sistema de diseño en `globals.css`

Colores, tipografías y tamaños de fuente viven como Custom Properties en `:root` (`--color-primary`, `--font-family-heading`, `--font-size-lg`, etc.). Las hojas de `src/ui/styles/` consumen esas variables en lugar de hex o `rem` sueltos para tokens que ya existen.

El reset, las fuentes autohospedadas (Newsreader e Inter) y el fondo de `main` también salen de `globals.css`. Así un cambio de paleta o de escala tipográfica se hace una vez y se propaga a header, cards, formularios y botones.

## Cómo correr el proyecto localmente

El proyecto usa `fetch` para el JSON y para inyectar header/footer. Abrir el HTML con doble clic (`file://`) falla por CORS y por cómo se resuelven los módulos. Hay que servirlo por HTTP.

```bash
git clone <url-del-repositorio>
cd newsHub
npx serve .
```

También funciona la extensión **Live Server** de VS Code o Cursor sobre la raíz del repo.

Luego abre la URL que imprima el servidor (por ejemplo `http://localhost:3000`) y navega desde `index.html`.

La primera visita copia `src/assets/data/posts.json` a `localStorage`. Desde ahí, crear, eliminar o marcar favoritos persiste en ese navegador.

## Capturas de pantalla

Vistas tomadas del [demo en vivo](https://frontend-poli.santiagosaavedra.com.co), en escritorio. Las versiones mobile están en `screenshots/`.

### Inicio

![Inicio de NewsHub en escritorio](screenshots/home-desktop.png)

### Listado

![Listado de noticias en escritorio](screenshots/list-desktop.png)

### Detalle

![Detalle de una noticia en escritorio](screenshots/detail-desktop.png)

### Favoritos

![Favoritos en escritorio](screenshots/favorites-desktop.png)

### Contacto

![Formulario de contacto en escritorio](screenshots/contact-desktop.png)

### Crear noticia

![Formulario para crear noticia en escritorio](screenshots/create-desktop.png)
