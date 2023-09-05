import { test, expect } from '@playwright/test';
import { URL, accessCart, accessLoginSection, homepageVisible, loginUser } from './helpers/helper';
import { enterProductsPage } from './helpers/products-helper';
import { addProductToCart, continueShopping } from './helpers/placeorder-helper';
import { searchCartLoginData } from '../data/data';
import { productsVisibleInCart } from './helpers/cart-helper';

test.beforeEach(async({ page }) => {
  await page.goto(URL);
});

test.describe("Tests related with the search of products", () => {
  test("Test Case 20: Search Products and Verify Cart After Login", async({ page }) => {
    const search = "Green";
    const products: { productName: string }[] = [];
    const user = searchCartLoginData[1];

    await homepageVisible( page );
    await enterProductsPage( page );
    await page.getByPlaceholder('Search Product').fill(search);
    await page.locator("#submit_search").click();
    await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
    const totalSearch = await page.locator('.single-products').count();
    const productSearch = await page.locator('.single-products').getByText(search).count() / 2;
    await expect(totalSearch).toBe(productSearch);

    for ( let i = 0; i < totalSearch; i++ ) {
      const productName = await page.locator(".single-products").nth(i).locator(".productinfo > p").textContent();
      await addProductToCart( page, i );
      await continueShopping( page );
      (productName) && products.push({ productName });
    }

    await accessCart( page );
    await productsVisibleInCart({ page, products, totalSearch });
    
    await accessLoginSection( page );
    await loginUser( page, user );
    
    await accessCart( page );
    await productsVisibleInCart({ page, products, totalSearch });
  })
});