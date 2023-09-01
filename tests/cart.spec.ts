import { test, expect } from "@playwright/test";
import { URL, handleMultipleGoogleAds, homepageVisible } from "./helpers/helper";
import { enterProductsPage } from "./helpers/products-helper";
import { addProductToCart, continueShopping, validateProductOnReviewOrder, viewCart } from "./helpers/placeorder-helper";

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
    await addProductToCart( page, 0 );
    await continueShopping( page );
    await addProductToCart( page, 1 );
    await viewCart( page );
    await validateProductOnReviewOrder({ page, productNumber: "1", productName: nameFirstProduct,  productPrice: priceFirstProduct,  quantity: 1});
    await validateProductOnReviewOrder({ page, productNumber: "2", productName: nameSecondProduct, productPrice: priceSecondProduct, quantity: 1});
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
