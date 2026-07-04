export const searchInputSelector = [
  'input[type="search"]',
  'input[role="searchbox"]',
  'input[placeholder*="Rechercher" i]',
  'input[placeholder*="lait" i]',
  'input[placeholder*="Pain" i]',
  'input[aria-label*="Rechercher" i]',
].join(', ');

export const visibleProductResultSelector = [
  'main a:visible[href$=".html"]:has(img)',
  'main a:visible[href$=".html"]:has-text("Eau")',
  'main a:visible[href$=".html"]:has-text("Lait")',
  '[data-testid*="product" i]:visible',
  '[class*="productFullDetail" i]:visible',
].join(', ');

export const visibleProductLinkSelector = [
  'main a:visible[href$=".html"]:has(img)',
  'main a:visible[href$=".html"]:has-text("Eau")',
  'main a:visible[href$=".html"]:has-text("Lait")',
].join(', ');

export const noResultPattern = /aucun produit|aucun résultat|ne trouvons pas|0 produits|pas de résultat/i;
