import { test, expect } from "@playwright/test";
import { URL, handleMultipleGoogleAds, homepageVisible } from "./helpers/helper";
import { enterProductsPage } from "./helpers/products-helper";

test.beforeEach(async({ page }) => {
  await page.goto(URL);
});

test.describe("Testing Cart functionallity", () => {
  test("Test Case 12: Add Products in Cart", async({ page }) => {
    await homepageVisible( page );
    await enterProductsPage( page );
    const nameFirstProduct = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[1]/p").textContent();
    const priceFirstProduct = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[1]/h2").textContent();
    const nameSecondProduct = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[3]/div/div[1]/div[1]/p").textContent();
    const priceSecondProduct = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[3]/div/div[1]/div[1]/h2").textContent();
    await page.locator(".single-products").first().hover();
    await page.locator('.productinfo > .btn').first().click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.locator(".single-products").nth(1).hover();
    await page.locator('div:nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').first().click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    
    await expect(nameFirstProduct).toBeTruthy;
    await expect(priceFirstProduct).toBeTruthy;
    await expect(nameSecondProduct).toBeTruthy;
    await expect(priceSecondProduct).toBeTruthy;
    if (nameFirstProduct && priceFirstProduct && nameSecondProduct && priceSecondProduct) {
      const quantity = 1;
      await expect(page.locator("#product-1").getByText(nameFirstProduct)).toBeVisible();
      await expect(page.locator("#product-1").getByText(priceFirstProduct).first()).toBeVisible();
      const firstProductQuantity = await page.locator("#product-1").getByRole("button").textContent();
      const firstProductTotalPrice = await page.locator("#product-1").locator(".cart_total_price").last().textContent();
      await expect(firstProductQuantity).toBe((quantity).toString());
      await expect(firstProductTotalPrice).toBe(priceFirstProduct);
      
      await expect(page.locator("#product-2").getByText(nameSecondProduct)).toBeVisible();
      await expect(page.locator("#product-2").getByText(priceSecondProduct).first()).toBeVisible();
      const secondProductQuantity = await page.locator("#product-2").getByRole("button").textContent();
      const secondProductTotalPrice = await page.locator("#product-2").locator(".cart_total_price").last().textContent();
      await expect(secondProductQuantity).toBe((quantity).toString());
      await expect(secondProductTotalPrice).toBe(priceSecondProduct);
    }
  })

  test("Test Case 13: Verify Product quantity in Cart", async({ page }) => {
    const quantity = 4;

    await homepageVisible( page );
    await page.locator('div:nth-child(7)').getByText("View Product").click();
    await handleMultipleGoogleAds( page );
    await expect(page).toHaveURL(/product_details/);
    await page.locator('#quantity').fill((quantity).toString());

    const productName = await page.locator(".product-information > h2").textContent();
    const productPrice = await page.locator(".product-information > span > span").textContent();

    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect( await page.locator("tbody > tr:nth-child(1) > td:nth-child(2) > h4").textContent() ).toBe(productName);
    await expect( await page.locator("tbody > tr:nth-child(1) > td:nth-child(3) > p").textContent() ).toBe(productPrice);
    await expect( await page.locator("tbody > tr:nth-child(1) > td:nth-child(4) > button").textContent() ).toBe((quantity).toString());
  })
})
