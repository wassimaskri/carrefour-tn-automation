import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../core/base.page';
import { searchInputSelector, searchToggleSelector } from '../selectors/shared.selectors';

export class SitePage extends BasePage {
  private readonly logo: Locator;
  private readonly menuButton: Locator;
  private readonly searchInput: Locator;
  private readonly searchToggle: Locator;
  private readonly storeLink: Locator;
  private readonly helpLink: Locator;
  private readonly signInLink: Locator;
  private readonly wishlistLink: Locator;
  private readonly cartButton: Locator;
  private readonly categoryPanel: Locator;
  private readonly newsletterInput: Locator;
  private readonly newsletterSubmit: Locator;
  private readonly newsletterValidation: Locator;
  private readonly socialLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = page.locator('a[href="/"], a[href="https://www.carrefour.tn/"]').first();
    this.menuButton = page
      .getByRole('button', { name: /menu/i })
      .or(page.locator('button:visible:has-text("Menu"), [class*="menu" i]:visible:has-text("Menu")'))
      .first();
    this.searchInput = page.locator(searchInputSelector);
    this.searchToggle = page.locator(searchToggleSelector);
    this.storeLink = page.getByRole('link', { name: /nos magasins/i }).first();
    this.helpLink = page.getByRole('link', { name: /aide|faq/i }).first();
    this.signInLink = page
      .getByRole('link', { name: /se connecter|compte/i })
      .or(page.locator('a[href*="compte" i], a[href*="sign" i]'));
    this.wishlistLink = page
      .getByRole('link', { name: /mes produits|wishlist/i })
      .or(page.locator('a[href*="wishlist" i]'))
      .first();
    this.cartButton = page
      .getByRole('link', { name: /panier/i })
      .or(page.getByRole('button', { name: /panier|cart/i }))
      .first();
    this.categoryPanel = page.locator('nav:visible, [class*="menu" i]:visible').filter({
      hasText: /promotions|epicerie|boissons|frais|bébé|beauté/i,
    });
    this.newsletterInput = page.locator('input[placeholder*="email" i], input[type="email"]').last();
    this.newsletterSubmit = page.getByRole('button', { name: /^ok$/i }).last();
    this.newsletterValidation = page.getByText(/veuillez entrer|email|e-mail|obligatoire/i).last();
    this.socialLinks = page.locator(
      'a[href*="facebook"], a[href*="instagram"], a[href*="youtube"], a[href*="linkedin"], a[href*="tiktok"]',
    );
  }

  async expectHeaderReady(): Promise<void> {
    const brandOrMenu = await this.waitForFirstVisibleLocator(this.logo.or(this.menuButton));
    const searchEntryPoint = await this.waitForFirstVisibleLocator(this.searchInput.or(this.searchToggle));
    const signInEntryPoint = await this.waitForFirstVisibleLocator(this.signInLink);

    await this.expectVisible(brandOrMenu);
    await this.expectVisible(this.menuButton);
    await this.expectVisible(searchEntryPoint);
    await this.expectVisible(signInEntryPoint);
    await this.expectVisible(this.cartButton);
  }

  async openCategoryMenu(): Promise<void> {
    await this.click(this.menuButton);
  }

  async expectCategoriesVisible(): Promise<void> {
    await this.expectVisible(this.categoryPanel.first());
  }

  async openStoreLocator(): Promise<void> {
    await this.click(this.storeLink);
  }

  async expectStoreLocatorDisplayed(): Promise<void> {
    await this.expectUrl(/nos-magasins|stores|magasins/i);
  }

  async openHelpCenter(): Promise<void> {
    await this.click(this.helpLink);
  }

  async expectHelpCenterDisplayed(): Promise<void> {
    await this.expectUrl(/faq|aide/i);
  }

  async openSignIn(): Promise<void> {
    await this.click(this.signInLink);
  }

  async expectSignInDisplayed(): Promise<void> {
    await this.expectUrl(/compte|sign|login|connexion/i);
  }

  async openWishlist(): Promise<void> {
    await this.click(this.wishlistLink);
  }

  async expectWishlistDisplayed(): Promise<void> {
    await this.expectUrl(/wishlist|mes-produits|sign-compte|compte/i);
  }

  async submitEmptyNewsletter(): Promise<void> {
    await this.newsletterInput.scrollIntoViewIfNeeded();
    await this.click(this.newsletterSubmit);
  }

  async expectNewsletterValidation(): Promise<void> {
    await this.expectVisible(this.newsletterValidation);
  }

  async expectFooterLinks(): Promise<void> {
    await this.expectVisible(this.page.getByText(/conditions générales de vente/i).first());
    await this.expectVisible(this.page.getByText(/support|contactez-nous|service livraison/i).first());
  }

  async expectSocialLinks(): Promise<void> {
    await this.expectVisible(this.socialLinks.first());
    await this.expectMinCount(this.socialLinks, 3);
  }
}
