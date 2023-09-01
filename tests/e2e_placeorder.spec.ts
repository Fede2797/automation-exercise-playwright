import { test, expect } from "@playwright/test";
import { URL, clickSignupButton, fillExtraSignupFields, fillSignupFields, getRandomInt, homepageVisible, loggedInAs } from "./helpers/helper";
import { creaditCardData, signUpData } from "../data/data";

test.beforeEach( async({ page }) => {
  await page.goto(URL);
});

test.describe("Placing an order end to end tests", () => {
  test.only("Test Case 14: Place Order: Register while Checkout", async({ page }) => {

    const user = signUpData[0];
    let auxMail = user.firstname + user.lastname + getRandomInt(100) + "@totallytruemail.com";
    user.email = auxMail;
    const creditCard = creaditCardData[0];

    await homepageVisible( page );
    const nameFirstProduct    = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[1]/p").textContent();
    const priceFirstProduct   = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[1]/h2").textContent();
    const nameSecondProduct   = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[4]/div/div[1]/div[1]/p").textContent();
    const priceSecondProduct  = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[4]/div/div[1]/div[1]/h2").textContent();
    await page.locator(".single-products").first().hover();
    await page.locator('.productinfo > .btn').first().click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.locator(".single-products").nth(2).hover();
    await page.locator('.productinfo > .btn').nth(2).click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page).toHaveURL(/view_cart/);
    await page.getByText('Proceed To Checkout').click();
    await page.getByRole('link', { name: 'Register / Login' }).click();
    await fillSignupFields( page, user );
    await clickSignupButton( page );
    await fillExtraSignupFields( page, user );
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.getByText('Account Created!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
    await loggedInAs( page, user.fullname );
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByText('Proceed To Checkout').click();

    let firstName = "";
    if ( user.sex === "male" ) {
      firstName = "Mr. " + user.fullname;
    } else if ( user.sex === "female" ) {
      firstName = "Mrs. " + user.fullname;
    };
    const company = user.company;
    const first_address = user.first_address;
    const second_address = user.second_address;
    const location = user.city + " " + user.state + " " + user.zipcode;
    const country = user.country;
    const phone = user.mobile;

    await expect(await page.locator('#address_delivery').locator(".address_firstname").textContent())       .toBe( firstName );
    await expect(await page.locator('#address_delivery').locator(".address_address1").nth(0).textContent()) .toBe( company );
    await expect(await page.locator('#address_delivery').locator(".address_address1").nth(1).textContent()) .toBe( first_address );
    await expect(await page.locator('#address_delivery').locator(".address_address1").nth(2).textContent()) .toBe( second_address );
    
    const aux = await page.locator('#address_delivery') .locator(".address_city").textContent();
    let cleanLocation = "";
    if ( aux ) {
      cleanLocation = aux.replace(/\n/g, ' ').replace(/\t/g, '');
    }
    await expect(cleanLocation).toBe( location );
    await expect(await page.locator('#address_delivery').locator(".address_country_name").textContent()).toBe( country );
    await expect(await page.locator('#address_delivery').locator(".address_phone").textContent()).toBe( phone );

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
      
      await expect(page.locator("#product-3").getByText(nameSecondProduct)).toBeVisible();
      await expect(page.locator("#product-3").getByText(priceSecondProduct).first()).toBeVisible();
      const secondProductQuantity = await page.locator("#product-3").getByRole("button").textContent();
      const secondProductTotalPrice = await page.locator("#product-3").locator(".cart_total_price").last().textContent();
      await expect(secondProductQuantity).toBe((quantity).toString());
      await expect(secondProductTotalPrice).toBe(priceSecondProduct);
    }

    await page.locator('textarea[name="message"]').fill("This is a sample description of an order");
    await page.getByRole('link', { name: 'Place Order' }).click();

    await page.locator('input[data-qa="name-on-card"]') .fill(user.fullname);
    await page.locator('input[data-qa="card-number"]')  .fill(creditCard.number);
    await page.locator('input[data-qa="cvc"]')          .fill(creditCard.cvc);
    await page.locator('input[data-qa="expiry-month"]') .fill(creditCard.month);
    await page.locator('input[data-qa="expiry-year"]')  .fill(creditCard.year);

    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    await expect(await page.getByText("Congratulations! Your order has been confirmed!")).toBeVisible();
    
    await page.getByRole('link', { name: 'Delete Account' }).click();
    await expect( page.getByText('Account Deleted!') ).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  })
})