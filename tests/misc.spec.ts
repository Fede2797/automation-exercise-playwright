import { test, expect } from "@playwright/test";
import { URL, clickSignupButton, createRandomUser, deleteAccount, fillExtraSignupFields, fillSignupFields, getRandomInt, handleMultipleGoogleAds, homepageVisible, loggedInAs } from "./helpers/helper";
import { addProductToCart, continueShopping, fillCreditCardData, goToCartSection, orderConfirmed, placeDescription, placeOrder, proceedToCheckout, validateBillingAddress, validateDeliveryAddress, validateProductOnReviewOrder } from "./helpers/placeorder-helper";
import { cartVisible } from "./helpers/cart-helper";
import { creaditCardData, signUpData } from "../data/data";

test.beforeEach( async({ page }) => {
  await page.goto(URL);
});

test.describe("Address details in checkout page", () => {
  test("Test Case 23: Verify address details in checkout page", async({ page }) => {
    await homepageVisible( page );
    const user = await createRandomUser( page );
    await addProductToCart( page, 0 );
    await continueShopping( page );
    await goToCartSection( page );
    await cartVisible( page );
    await proceedToCheckout( page );
    await validateDeliveryAddress( page, user );
    await validateBillingAddress( page, user );
    await deleteAccount( page );
  });
})

test.describe("Download invoice", () => {
  test("Test Case 24: Download Invoice after purchase order", async({ page }) => {
    //! Test timeout set to 3 minutes
    test.setTimeout(3 * 60 * 1000);

    const creditCard = creaditCardData[0];
    const user = signUpData[0];
    let auxMail = user.firstname + user.lastname + getRandomInt(999) + `@totallytruemail${getRandomInt(999)}.com`;
    user.email = auxMail;

    await homepageVisible( page );
    const nameFirstProduct    = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[1]/p").textContent();
    const priceFirstProduct   = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[1]/h2").textContent();
    await addProductToCart( page, 0 );
    await continueShopping( page );
    await goToCartSection( page );
    await cartVisible( page );
    await proceedToCheckout( page );
    await page.getByRole('link', { name: 'Register / Login' }).click();
    
    await fillSignupFields( page, user );
    await clickSignupButton( page );
    await fillExtraSignupFields( page, user );
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.getByText('Account Created!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
    await loggedInAs( page, user.fullname );
    
    await goToCartSection( page );
    await proceedToCheckout( page );
    await validateDeliveryAddress( page, user );
    await validateProductOnReviewOrder({ page, productNumber: "1", productName: nameFirstProduct,  productPrice: priceFirstProduct,  quantity: 1});
    await placeDescription( page, "This is a sample description of an order" );
    await placeOrder( page );
    
    await handleMultipleGoogleAds( page );
    await fillCreditCardData({ page, user, creditCard });
    await orderConfirmed( page );
    
    // Validate download
    const download = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole('link', { name: 'Download Invoice' }).click(),
    ]);
    await expect(download[0].path).toBeTruthy();

    await page.getByRole('link', { name: 'Continue' }).click();
    await deleteAccount( page );
  })
})

test.describe("Scroll up and down using 'Arrow' button", () => {
  test.only("Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality", async({ page }) => {
    //* 1. Launch browser
    //* 2. Navigate to url 'http://automationexercise.com'
    //* 3. Verify that home page is visible successfully
    //* 4. Scroll down page to bottom
    //* 5. Verify 'SUBSCRIPTION' is visible
    //* 6. Click on arrow at bottom right side to move upward
    //* 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
  })
})