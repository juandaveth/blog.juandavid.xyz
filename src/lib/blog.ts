export const CATEGORIES = ['Ensayos', 'Reflexión', 'Comunidad', 'Ethereum'] as const;

export type Category = (typeof CATEGORIES)[number];

// Slugs para categorías con tildes/ñ que no se quieren auto-generar tal cual.
// Si agregas una categoría nueva sin tildes especiales, no necesitas tocar esto.
const CATEGORY_SLUG_OVERRIDES: Partial<Record<Category, string>> = {
	Reflexión: 'reflexion',
};

function autoSlug(text: string): string {
	return text
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export function categoryToSlug(category: Category): string {
	return CATEGORY_SLUG_OVERRIDES[category] ?? autoSlug(category);
}

export function slugToCategory(slug: string): Category | undefined {
	return CATEGORIES.find((category) => categoryToSlug(category) === slug);
}

export function getYears(pubDates: Date[]): number[] {
	const years = new Set(pubDates.map((date) => date.getFullYear()));
	return [...years].sort((a, b) => b - a);
}
