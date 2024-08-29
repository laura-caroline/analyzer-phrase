import { readFileSync } from 'fs';
import { join } from 'path';

export type ItemList = string[];

export interface Category {
    items?: ItemList;
    subcategories?: Record<string, Category>;
}

export interface Hierarchy {
    [key: string]: Category;
}

const hierarchy: Hierarchy = JSON.parse(readFileSync(join(__dirname, 'hierarchy.json'), 'utf8'));

function analyzePhrase(phrase: string, targetDepth: number): Record<string, number> {
    const words = phrase.toLowerCase().replace(/[.,]/g, '').split(/\s+/);
    let results: Record<string, number> = {};

    function searchItemsInCategory(
        items: ItemList | undefined,
        words: string[],
        targetCategory: string,
        results: Record<string, number>
    ) {
        if (items) {
            items.forEach(item => {
                if (words.includes(item.toLowerCase())) {
                    results[targetCategory] = (results[targetCategory] || 0) + 1;
                }
            });
        }
    }

    function searchHierarchy(
        level: any,
        currentDepth: number,
        targetDepth: number,
        targetCategory: string
    ) {
        if (!level) return;
        const depthDesired = currentDepth >= targetDepth
        if (depthDesired) {
            Object.keys(level).forEach(category => {
                const subcategory = level[category];

                if (Array.isArray(subcategory)) {
                    searchItemsInCategory(subcategory, words, targetCategory, results);
                } else if (subcategory.items) {
                    searchItemsInCategory(subcategory.items, words, targetCategory, results);
                }

                if (subcategory.subcategories) {
                    searchHierarchy(subcategory.subcategories, currentDepth, targetDepth, targetCategory);
                }
            });
        } else if (currentDepth < targetDepth) {
            const descendDeeply = Object.keys(level).forEach(category => {
                const subcategory = level[category as keyof typeof level] ;
                searchHierarchy(subcategory.subcategories || subcategory, currentDepth + 1, targetDepth, category);
            });
        }
    }

    const initilizeAnalyze = Object.keys(hierarchy).forEach(rootCategory => {
        searchHierarchy(hierarchy[rootCategory].subcategories, 1, targetDepth, rootCategory);
    });

    return results;
}

export { analyzePhrase };
