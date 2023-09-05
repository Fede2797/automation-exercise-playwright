import { expect } from "@playwright/test";

export const addProductToCart = async( page, productNumber ) => {
  await page.locator(".single-products").nth(productNumber).hover();
  await page.locator('.productinfo > .btn').nth(productNumber).click();
}

export const continueShopping = async( page ) => {
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
}

export const viewCart = async( page ) => {
  await page.getByRole('link', { name: 'View Cart' }).click();
}

export const goToCartSection = async( page ) => {
  await page.getByRole('link', { name: 'Cart' }).click();
}

export const proceedToCheckout = async( page ) => {
  await page.getByText('Proceed To Checkout').click();
}

export const validateDeliveryAddress = async( page, user ) => {
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
}

export const validateBillingAddress = async( page, user ) => {
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

  // Billing Address validation
  await expect(await page.locator('#address_invoice').locator(".address_firstname").textContent())       .toBe( firstName );
  await expect(await page.locator('#address_invoice').locator(".address_address1").nth(0).textContent()) .toBe( company );
  await expect(await page.locator('#address_invoice').locator(".address_address1").nth(1).textContent()) .toBe( first_address );
  await expect(await page.locator('#address_invoice').locator(".address_address1").nth(2).textContent()) .toBe( second_address );
  
  const aux = await page.locator('#address_invoice') .locator(".address_city").textContent();
  let cleanLocation = "";
  if ( aux ) {
    cleanLocation = aux.replace(/\n/g, ' ').replace(/\t/g, '');
  }
  await expect(cleanLocation).toBe( location );
  await expect(await page.locator('#address_invoice').locator(".address_country_name").textContent()).toBe( country );
  await expect(await page.locator('#address_invoice').locator(".address_phone").textContent()).toBe( phone );
}

export const validateProductOnReviewOrder = async({ page, productNumber, productName, productPrice, quantity }) => {
  // To use this function you need to pass: 
  // productNumber: the number of the product on the grid in the homepage/product section (first product is 1, second is 2, etc)
  // productName: the name of the product displayed on the homepage/product section
  // productPrice: the prive of the product displayed on the homepage/product section
  // quantity: the quantity specified

  await expect(productName).toBeTruthy;
  await expect(productPrice).toBeTruthy;
  if (productName && productPrice) {
    await expect(page.locator(`#product-${productNumber}`).getByText(productName)).toBeVisible();
    await expect(page.locator(`#product-${productNumber}`).getByText(productPrice).first()).toBeVisible();
    const firstProductQuantity = await page.locator(`#product-${productNumber}`).getByRole("button").textContent();
    const firstProductTotalPrice = await page.locator(`#product-${productNumber}`).locator(".cart_total_price").last().textContent();
    await expect(firstProductQuantity).toBe((quantity).toString());
    await expect(firstProductTotalPrice).toBe(productPrice);
  }
}

export const fillCreditCardData = async({ page, user, creditCard }) => {
  await page.locator('input[data-qa="name-on-card"]') .fill(user.fullname);
  await page.locator('input[data-qa="card-number"]')  .fill(creditCard.number);
  await page.locator('input[data-qa="cvc"]')          .fill(creditCard.cvc);
  await page.locator('input[data-qa="expiry-month"]') .fill(creditCard.month);
  await page.locator('input[data-qa="expiry-year"]')  .fill(creditCard.year);
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
}

export const placeDescription = async( page, description ) => {
  await page.locator('textarea[name="message"]').fill( description );
}

export const placeOrder = async( page ) => {
  await page.getByRole('link', { name: 'Place Order' }).click();
}

export const orderConfirmed = async( page ) => {
  await expect(await page.getByText("Congratulations! Your order has been confirmed!")).toBeVisible();
}