import { expect } from "@playwright/test";

export const homepageVisible = async( page ) => {
  await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();
}

export const accessLoginSection = async( page ) => {
  await page.getByRole('link', { name: ' Signup / Login' }).click();
}

export const loggedInAs = async( page, fullname ) => {
  await expect( page.getByText(`Logged in as ${ fullname }`) ).toBeVisible;
}

export const handleGoogleAd = async( page ) => {
  if ( await page.url().includes("google_vignette") ){
    await page.getByLabel('Close ad').click();
  }
}

export const fillSignupFields = async( page, user ) => {
  if ( user.sex === "male" ) {
    await page.getByLabel('Mr.').click();
  } else if ( user.sex === "female" ) {
    await page.getByLabel('Mrs.').click();
  };
  await page.getByLabel('Password *').fill( user.password );
  await page.locator('#days').selectOption( user.dateOfBirth.getDay().toString() );
  await page.locator('#months').selectOption( user.dateOfBirth.getMonth().toString() );
  await page.locator('#years').selectOption( user.dateOfBirth.getFullYear().toString() );
  await page.getByLabel('Sign up for our newsletter!').click();
  await page.getByLabel('Receive special offers from our partners!').click();
  await page.getByLabel('First name *').fill( user.firstname );
  await page.getByLabel('Last name *').fill( user.lastname );
  await page.getByLabel('Company', { exact: true }).fill( user.company );
  await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill( user.first_address );
  await page.getByLabel('Address 2').fill( user.second_address );
  await page.getByLabel('Country *').selectOption( user.country );
  await page.getByLabel('State *').fill( user.state );
  await page.getByLabel('City *').fill( user.city );
  await page.locator('#zipcode').fill( user.zipcode );
  await page.getByLabel('Mobile Number *').fill( user.mobile );
}

export const loginAccountVisible = async( page ) => {
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
}

export const loginUser = async( page, user ) => {
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill( user.email );
  await page.getByPlaceholder('Password').fill( user.password );
  await page.getByRole('button', { name: 'Login' }).click();
}