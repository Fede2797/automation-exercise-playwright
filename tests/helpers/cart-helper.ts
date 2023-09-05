import { expect } from "@playwright/test";

export const removeFromCart = async( page, productNumber ) => {
  await page.locator('.cart_delete').locator('a').nth(productNumber).click();
}

export const cartVisible = async( page ) => {
  await expect(page).toHaveURL(/view_cart/);
}

export const productsVisibleInCart = async({ page, products, totalSearch }) => {
  for (let i = 0; i < totalSearch; i++) {
    await expect( await page.locator(`tbody > tr:nth-child(${ i + 1 }) > td:nth-child(2) > h4`).textContent() ).toBe( products[i].productName );
  }
}