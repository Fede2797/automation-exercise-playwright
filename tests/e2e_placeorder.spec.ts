import { test, expect } from "@playwright/test";
import { URL, accessLoginSection, clickSignupButton, deleteAccount, fillExtraSignupFields, fillSignupFields, getRandomInt, homepageVisible, loggedInAs } from "./helpers/helper";
import { creaditCardData, signUpData } from "../data/data";
import { addProductToCart, continueShopping, fillCreditCardData, goToCartSection, proceedToCheckout, validateAddressDetails, validateProductOnReviewOrder, viewCart } from "./helpers/placeorder-helper";

test.beforeEach( async({ page }) => {
  await page.goto(URL);
});

test.describe("Placing an order end to end tests", () => {
  test("Test Case 14: Place Order: Register while Checkout", async({ page }) => {

    const user = signUpData[0];
    let auxMail = user.firstname + user.lastname + getRandomInt(100) + "@totallytruemail.com";
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
    await expect(page).toHaveURL(/view_cart/);
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
    await validateAddressDetails( page, user );
    await validateProductOnReviewOrder({ page, productNumber: "1", productName: nameFirstProduct,  productPrice: priceFirstProduct,  quantity: 1});
    await validateProductOnReviewOrder({ page, productNumber: "3", productName: nameSecondProduct, productPrice: priceSecondProduct, quantity: 1});
    await page.locator('textarea[name="message"]').fill("This is a sample description of an order");
    await page.getByRole('link', { name: 'Place Order' }).click();

    await fillCreditCardData({ page, user, creditCard });

    await expect(await page.getByText("Congratulations! Your order has been confirmed!")).toBeVisible();
    
    await deleteAccount( page );
  })

  test.only("Test Case 15: Place Order: Register before Checkout", async({ page }) => {

    const user = signUpData[0];
    let auxMail = user.firstname + user.lastname + getRandomInt(100) + "@totallytruemail.com";
    user.email = auxMail;
    const creditCard = creaditCardData[0];

    await homepageVisible( page );
    await accessLoginSection( page );
    await fillSignupFields( page, user );
    await clickSignupButton( page );
    await fillExtraSignupFields( page, user );
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.getByText('Account Created!')).toBeVisible();
    await loggedInAs( page, user.fullname );

    //* 8. Add products to cart
    //* 9. Click 'Cart' button
    //* 10. Verify that cart page is displayed
    //* 11. Click Proceed To Checkout
    //* 12. Verify Address Details and Review Your Order
    //* 13. Enter description in comment text area and click 'Place Order'
    //* 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    //* 15. Click 'Pay and Confirm Order' button
    //* 16. Verify success message 'Your order has been placed successfully!'
    //* 17. Click 'Delete Account' button
    //* 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  })
})