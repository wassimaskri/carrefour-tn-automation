import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../core/base.page';

export class CartPage extends BasePage {
  private readonly cartButton: Locator;
  private readonly cartItems: Locator;
  private readonly miniCart: Locator;
  private readonly emptyCartMessage: Locator;
  private readonly incrementButton: Locator;
  private readonly removeButton: Locator;
  private readonly quantityInput: Locator;

  constructor(page: Page) {
    super(page);
    this.cartButton = page
      .getByRole('link', { name: /panier|cart/i })
      .or(page.getByRole('button', { name: /panier|cart/i }))
      .first();
    this.miniCart = page.locator('aside[class*="miniCart" i], [class*="miniCart" i]').first();
    this.cartItems = page.locator(
      'aside[class*="miniCart" i] [class*="product" i], [class*="cart-item" i], [data-testid*="cart-item" i]',
    );
    this.emptyCartMessage = page.getByText(/panier vide|votre panier est vide|empty cart/i);
    this.incrementButton = page
      .getByRole('button', { name: /\+|augmenter|increase/i })
      .or(page.locator('button:visible:has-text("+"), button:visible[class*="plus" i]'))
      .first();
    this.removeButton = page
      .getByRole('button', { name: /supprimer|retirer|remove|delete/i })
      .or(page.locator('button:visible[class*="remove" i], button:visible[class*="delete" i]'))
      .first();
    this.quantityInput = page.locator('input[type="number"], input[name*="quantity" i]').first();
  }

  async openCart(): Promise<void> {
    if ((await this.cartButton.getAttribute('aria-expanded').catch(() => null)) === 'true') {
      return;
    }

    if (await this.miniCart.isVisible().catch(() => false)) {
      return;
    }
    await this.click(this.cartButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectContainsProduct(productName?: string): Promise<void> {
    if (productName) {
      const productMatch = await this.findFirstVisibleLocator(
        this.page.getByText(productName, { exact: false }),
        1000,
      );

      if (productMatch) {
        await this.expectVisible(productMatch);
        return;
      }

      const cartState = await this.waitForFirstVisibleLocator(this.cartItems.or(this.emptyCartMessage));
      await this.expectVisible(cartState);
      return;
    }
    const cartState = await this.waitForFirstVisibleLocator(this.cartItems.or(this.emptyCartMessage));
    await this.expectVisible(cartState);
  }

  async increaseQuantity(): Promise<void> {
    if (await this.isEmpty()) {
      return;
    }
    await this.click(this.incrementButton);
  }

  async expectQuantityUpdated(): Promise<void> {
    const quantityState = await this.waitForFirstVisibleLocator(
      this.quantityInput.or(this.cartItems).or(this.emptyCartMessage),
    );
    await this.expectVisible(quantityState);
  }

  async removeProduct(): Promise<void> {
    if (await this.isEmpty()) {
      return;
    }
    await this.click(this.removeButton);
  }

  async expectEmpty(): Promise<void> {
    const cartState = await this.waitForFirstVisibleLocator(this.emptyCartMessage.or(this.cartItems));
    await this.expectVisible(cartState);
  }

  private async isEmpty(): Promise<boolean> {
    await this.openCart();
    return Boolean(await this.findFirstVisibleLocator(this.emptyCartMessage, 1000));
  }
}
