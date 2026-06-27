#!/usr/bin/env node
// Copia una imagen a src/assets/blog/ y la conecta como heroImage del post,
// sin tener que editar el frontmatter a mano.
//
// Uso: npm run hero-image -- <slug-del-post> <ruta-de-la-imagen>
// Ej:  npm run hero-image -- los-pasos-del-peon ~/Desktop/foto.jpg

import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';

const [slug, imagePathArg] = process.argv.slice(2);

if (!slug || !imagePathArg) {
	console.error('Uso: npm run hero-image -- <slug-del-post> <ruta-de-la-imagen>');
	process.exit(1);
}

const imagePath = resolve(imagePathArg.replace(/^~/, process.env.HOME ?? '~'));
const postPath = resolve(`src/content/blog/${slug}.md`);

if (!existsSync(imagePath)) {
	console.error(`No encuentro la imagen en: ${imagePath}`);
	process.exit(1);
}
if (!existsSync(postPath)) {
	console.error(`No encuentro el post en: ${postPath}`);
	process.exit(1);
}

const ext = extname(imagePath) || '.jpg';
const destRelative = `src/assets/blog/${slug}${ext}`;
const destAbsolute = resolve(destRelative);

copyFileSync(imagePath, destAbsolute);

const frontmatterRef = `../../assets/blog/${slug}${ext}`;
const content = readFileSync(postPath, 'utf8');
const heroImageLine = `heroImage: '${frontmatterRef}'`;

let updated;
if (/^heroImage:.*$/m.test(content)) {
	updated = content.replace(/^heroImage:.*$/m, heroImageLine);
} else {
	updated = content.replace(/^---\n([\s\S]*?)\n---/, (_match, frontmatter) => {
		return `---\n${frontmatter}\n${heroImageLine}\n---`;
	});
}

writeFileSync(postPath, updated);

console.log(`✓ Imagen copiada a ${destRelative}`);
console.log(`✓ heroImage actualizado en ${postPath}`);
