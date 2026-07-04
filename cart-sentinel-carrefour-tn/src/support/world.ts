import { setWorldConstructor, type IWorldOptions, World } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { SearchPage } from '../pages/search.page';
import { SitePage } from '../pages/site.page';

export class CartSentinelWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  homePage!: HomePage;
  searchPage!: SearchPage;
  productPage!: ProductPage;
  cartPage!: CartPage;
  sitePage!: SitePage;
  selectedProductName?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }

  initPages(): void {
    this.homePage = new HomePage(this.page);
    this.searchPage = new SearchPage(this.page);
    this.productPage = new ProductPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.sitePage = new SitePage(this.page);
  }
}

setWorldConstructor(CartSentinelWorld);
