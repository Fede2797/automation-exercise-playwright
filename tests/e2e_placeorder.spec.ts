import { test, expect } from "@playwright/test";
import { URL, clickSignupButton, createRandomUser, deleteAccount, fillExtraSignupFields, fillSignupFields, getRandomInt, handleMultipleGoogleAds, homepageVisible, loggedInAs, loginUser } from "./helpers/helper";
import { creaditCardData, signUpData } from "../data/data";
import { addProductToCart, continueShopping, fillCreditCardData, goToCartSection, proceedToCheckout, validateDeliveryAddress, validateProductOnReviewOrder, viewCart, placeDescription, placeOrder, orderConfirmed } from "./helpers/placeorder-helper";
import { cartVisible } from "./helpers/cart-helper";

test.beforeEach( async({ page }) => {
  await page.goto(URL);
});

test.describe("Placing an order end to end tests", () => {
  //! Test timeout set to 3 minutes
  test.setTimeout(3 * 60 * 1000);

  test("Test Case 14: Place Order: Register while Checkout", async({ page }) => {
    const user = signUpData[0];
    let auxMail = user.firstname + user.lastname + getRandomInt(999) + `@totallytruemail${getRandomInt(999)}.com`;
    user.email = auxMail;
    const creditCard = creaditCardData[0];

    await homepageVisible( page );
    const nameFirstProduct    = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[1]/p").textContent();
    const priceFirstProduct   = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[1]/h2").textContent();
    const nameSecondProduct   = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[4]/div/div[1]/div[1]/p").textContent();
    const priceSecondProduct  = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[4]/div/div[1]/div[1]/h2").textContent();
    
    await addProductToCart( page, 0 );
    await continueShopping( page );
    await addProductToCart( page, 2 );
    await viewCart( page );
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
    await validateProductOnReviewOrder({ page, productNumber: "3", productName: nameSecondProduct, productPrice: priceSecondProduct, quantity: 1});
    await placeDescription( page, "This is a sample description of an order" );

    await placeOrder( page );

    await handleMultipleGoogleAds( page );
    await fillCreditCardData({ page, user, creditCard });

    await orderConfirmed( page );
    
    await deleteAccount( page );
  });

  test("Test Case 15: Place Order: Register before Checkout", async({ page }) => {
    const creditCard = creaditCardData[0];

    const user = await createRandomUser( page );

    const nameFirstProduct    = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[1]/p").textContent();
    const priceFirstProduct   = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[1]/h2").textContent();
    const nameSecondProduct   = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[4]/div/div[1]/div[1]/p").textContent();
    const priceSecondProduct  = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[4]/div/div[1]/div[1]/h2").textContent();
    await addProductToCart( page, 0 );
    await continueShopping( page );
    await addProductToCart( page, 2 );
    await continueShopping( page );
    await goToCartSection( page );
    await cartVisible( page );
    await proceedToCheckout( page );
    await validateDeliveryAddress( page, user );
    await validateProductOnReviewOrder({ page, productNumber: "1", productName: nameFirstProduct,  productPrice: priceFirstProduct,  quantity: 1});
    await validateProductOnReviewOrder({ page, productNumber: "3", productName: nameSecondProduct, productPrice: priceSecondProduct, quantity: 1});
    await placeDescription( page, "This is a sample description of an order" );

    await placeOrder( page );
    
    await handleMultipleGoogleAds( page );
    await fillCreditCardData({ page, user, creditCard });

    await orderConfirmed( page );
    
    await deleteAccount( page );
  });

  test("Test Case 16: Place Order: Login before Checkout", async({ page }) => {
    const creditCard = creaditCardData[0];
    
    const user = await createRandomUser( page );
    await page.getByRole('link', { name: 'Logout' }).click();
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await loginUser( page, user );
    await loggedInAs( page, user.fullname );

    const nameFirstProduct    = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[1]/p").textContent();
    const priceFirstProduct   = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[1]/h2").textContent();
    const nameSecondProduct   = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[4]/div/div[1]/div[1]/p").textContent();
    const priceSecondProduct  = await page.locator("xpath=/html/body/section[2]/div/div/div[2]/div/div[4]/div/div[1]/div[1]/h2").textContent();
    await addProductToCart( page, 0 );
    await continueShopping( page );
    await addProductToCart( page, 2 );
    await continueShopping( page );
    await goToCartSection( page );
    await cartVisible( page );
    await proceedToCheckout( page );
    await validateDeliveryAddress( page, user );
    await validateProductOnReviewOrder({ page, productNumber: "1", productName: nameFirstProduct,  productPrice: priceFirstProduct,  quantity: 1});
    await validateProductOnReviewOrder({ page, productNumber: "3", productName: nameSecondProduct, productPrice: priceSecondProduct, quantity: 1});
    await placeDescription( page, "This is a sample description of an order" );

    await placeOrder( page );
    
    await handleMultipleGoogleAds( page );
    await fillCreditCardData({ page, user, creditCard });
    await orderConfirmed( page );
    
    await deleteAccount( page );
  });
});

