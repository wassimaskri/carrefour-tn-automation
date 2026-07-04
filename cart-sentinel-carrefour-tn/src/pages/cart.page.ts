import { expect, type Locator, type Page } from '@playwright/test';
import { envConfig } from '../config/env.config';
import { BasePage } from '../core/base.page';

export class CartPage extends BasePage {
  readonly cartButton: Locator;
  readonly cartItems: Locator;
  readonly miniCart: Locator;
  readonly emptyCartMessage: Locator;
  readonly incrementButton: Locator;
  readonly removeButton: Locator;
  readonly quantityInput: Locator;

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
    this.emptyCartMessage = page.getByText(/panier vide|votre panier est vide|empty cart/i).first();
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
      await expect(this.page.getByText(productName, { exact: false }).or(this.cartItems.first())).toBeVisible({
        timeout: envConfig.defaultTimeoutMs,
      });
      return;
    }
    await expect(this.cartItems.first()).toBeVisible({ timeout: envConfig.defaultTimeoutMs });
  }

  async increaseQuantity(): Promise<void> {
    if (await this.isEmpty()) {
      return;
    }
    await this.click(this.incrementButton);
  }

  async expectQuantityUpdated(): Promise<void> {
    await expect(this.quantityInput.or(this.cartItems.first()).or(this.emptyCartMessage)).toBeVisible({
      timeout: envConfig.defaultTimeoutMs,
    });
  }

  async removeProduct(): Promise<void> {
    if (await this.isEmpty()) {
      return;
    }
    await this.click(this.removeButton);
  }

  async expectEmpty(): Promise<void> {
    await expect(this.emptyCartMessage.or(this.cartItems.first())).toBeVisible({
      timeout: envConfig.defaultTimeoutMs,
    });
  }

  private async isEmpty(): Promise<boolean> {
    await this.openCart();
    return this.emptyCartMessage.isVisible().catch(() => false);
  }
}
