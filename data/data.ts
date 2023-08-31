
export const signUpData = [
  {
    email: 'signupuser1@testgmail.com',
    password: 'ThisIsAPassword123',
    fullname: 'John Doe',
    firstname: "John",
    lastname: "Doe",
    sex: "male",
    dateOfBirth: new Date(1992, 5, 25),
    company: "Apple",
    first_address: "Buenos Aires 670",
    second_address: "San Martin 432",
    country: "United States",
    state: "Washington",
    city: "Washington DC",
    zipcode: "3978",
    mobile: "+543768958673"
  },
  {
    email: 'signupuser2@testgmail.com',
    password: 'ThisIsAPassword123',
    fullname: 'Johanna Doe',
    firstname: "John",
    lastname: "Doe",
    sex: "female",
    dateOfBirth: new Date(2002, 7, 13),
    company: "Microsoft",
    first_address: "Buenos Aires 670",
    second_address: "San Martin 432",
    country: "Australia",
    state: "New South Wales",
    city: "Sydney",
    zipcode: "3978",
    mobile: "+543768958673"
  },
]

export const loginData = [
  {
    email: 'loginuser1@testgmail.com',
    password: 'ThisIsAPassword123',
    fullname: 'John Doe',
  },
  {
    email: 'loginuser2@testgmail.com',
    password: 'ThisIsAPassword123',
    fullname: 'John Doe',
  },
]

export const incorrectLoginData = [
  {
    email: 'iloginuser1@testgmail.com',
    password: 'ThisIsAPassword123',
    fullname: 'John Doe',
  },
  {
    email: 'loginuser2@testgmail.com',
    password: 'hisIsAPassword123',
    fullname: 'John Doe',
  },
]

export const existingUserSignup = [
  {
    email: 'loginuser1@testgmail.com',
    fullname: 'John Doe',
  },
  {
    email: 'loginuser2@testgmail.com',
    fullname: 'John Doe',
  },
]

export const userContactData =[
  {
    fullname: 'John Doe',
    email: 'loginuser2@testgmail.com',
    subject: 'This is an important email',
    message: 'I\'m reaching to you for an important matter. I want to know if we can schedule a meeting for tomorrow afternoon. Tell me if it\'s ok with u. All the best, Jogn Doe.',
    imagePath: 'data\\car.jpg',
    imageName: 'car.jpg',
  }
]

export const products = [
  "jeans",
  "white",
]

export const emailSubscriptions = [
  "thisisanemail@gmail.com",
  "microsoftemail@outlook.com",
  "yahoooo@yahoo.com",
]