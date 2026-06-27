# blog.juandavid.xyz

Blog personal de Juan David, construido con [Astro](https://astro.build). Contenido en Markdown, hosteado en Vercel, deploy automático en cada `git push`.

## Llegar a la carpeta del proyecto

Desde el home:

```sh
cd /Users/juandavid/Claude/Projects/blog.juandavid.xyz
```

Abrir en VS Code:

```sh
code /Users/juandavid/Claude/Projects/blog.juandavid.xyz
```

## Ver los cambios en local antes de publicar

```sh
npm run dev
```

Abre `http://localhost:4321` en el navegador. Cualquier cambio en los `.md` o en el código se recarga solo (no hace falta reiniciar), salvo cambios en `astro.config.mjs` o en `src/content.config.ts` — en esos casos detén el servidor (`Ctrl+C`) y vuelve a correr `npm run dev`.

## Editar o crear un artículo

Los posts viven en `src/content/blog/`. Cada uno es un archivo `.md`:

```md
---
title: 'Título del post'
description: 'Resumen corto, para SEO y redes.'
pubDate: '2026-06-24'
category: 'Ensayos'
heroImage: '../../assets/blog/nombre-imagen.jpg'
---

Cuerpo del artículo en Markdown normal: ## subtítulos, **negritas**, [links](url), etc.
```

- El **nombre del archivo** define la URL del post: `mi-post.md` → `/blog/mi-post`.
- `pubDate` en formato `'YYYY-MM-DD'`.
- `category` debe ser una de las categorías válidas (ver más abajo).
- `heroImage` es opcional.

### Agregar imágenes

**Imagen de cabecera (hero):**
1. Coloca el archivo en `src/assets/blog/` (ej. `mi-post.jpg`).
2. En el frontmatter: `heroImage: '../../assets/blog/mi-post.jpg'`.
3. Astro la optimiza automáticamente (WebP, tamaños responsivos).

**Imágenes dentro del cuerpo del post:**
```md
![texto alternativo](../../assets/blog/otra-imagen.jpg)
```

## Publicar (subir a producción)

```sh
git add .
git commit -m "Agrega post: mi-post"
git push
```

Vercel detecta el push, rebuilda, y en 1-2 minutos el cambio está en `blog.juandavid.xyz`.

## Cómo agregar una nueva categoría

Edita **un solo archivo**: `src/lib/blog.ts`

```ts
export const CATEGORIES = ['Ensayos', 'Reflexión', 'Comunidad', 'Ethereum', 'NuevaCategoría'] as const;
```

Agrega la categoría al array. El slug de la URL (`/blog/categoria/...`) se genera automático a partir del nombre. Si la categoría tiene tildes/ñ y quieres una URL más limpia, agrega una línea en `CATEGORY_SLUG_OVERRIDES`, un poco más abajo en el mismo archivo (ejemplo ya hecho con `Reflexión` → `reflexion`).

Después, en cualquier post puedes usar `category: 'NuevaCategoría'` en el frontmatter. Si pones una categoría que no está en esa lista, el build falla — esto evita typos o categorías duplicadas con nombres distintos.

## Cómo aparece un nuevo año en el filtro

No requiere ninguna acción. Los años del dropdown de `/blog` se calculan automáticamente a partir del campo `pubDate` de cada post. En cuanto publiques un artículo con una fecha de un año nuevo (ej. `pubDate: '2027-01-15'`), la opción "2027" y la ruta `/blog/2027` aparecen solas en el siguiente build.

## Dark / light mode

Hay un botón (sol/luna) en el header que alterna el tema. Se guarda en `localStorage` del navegador del visitante, así que persiste entre visitas. La paleta de cada modo está en `src/styles/global.css`, dentro de `:root` (modo claro) y `:root[data-theme='dark']` (modo oscuro).

## Estructura del proyecto

```text
├── src/
│   ├── assets/blog/        ← imágenes de los posts
│   ├── components/
│   │   ├── Header.astro    ← nav + botón dark mode
│   │   ├── Footer.astro
│   │   └── PostList.astro  ← grid de posts + filtros (categoría/año)
│   ├── content/blog/       ← los artículos en .md
│   ├── content.config.ts   ← schema de frontmatter (incluye categorías válidas)
│   ├── lib/blog.ts         ← lista de categorías, slugs, cálculo de años
│   ├── layouts/BlogPost.astro
│   ├── pages/
│   │   ├── index.astro             → /
│   │   ├── about.astro              → /about
│   │   └── blog/
│   │       ├── index.astro          → /blog (listado completo)
│   │       ├── [...slug].astro      → /blog/:post (cada artículo)
│   │       ├── [year].astro         → /blog/:year (filtro por año)
│   │       └── categoria/[category].astro → /blog/categoria/:categoria
│   └── styles/global.css   ← colores, tipografía, modo claro/oscuro
├── astro.config.mjs        ← dominio del sitio, fuente (Google Fonts)
```

## Comandos

| Comando             | Acción                                              |
| :------------------- | :--------------------------------------------------- |
| `npm install`         | Instala dependencias                                  |
| `npm run dev`         | Servidor local en `localhost:4321`                    |
| `npm run build`       | Build de producción en `./dist/`                      |
| `npm run astro check` | Valida tipos y frontmatter (corre antes de hacer push) |

## Deploy

Conectado a Vercel (`juandaveths-projects/blog.juandavid.xyz`), proyecto importado desde el repo de GitHub `juandaveth/blog.juandavid.xyz`. Cada push a `main` dispara un deploy automático. Dominio `blog.juandavid.xyz` apunta a Vercel vía un registro DNS `A` en Hostinger (`blog → 76.76.21.21`).
