import { expect } from "@playwright/test";

export const removeFromCart = async( page, productNumber ) => {
  await page.locator('.cart_delete').locator('a').nth(productNumber).click();
}

export const cartVisible = async( page ) => {
  await expect(page).toHaveURL(/view_cart/);
}
