# Quatt_Assignment_2025
# Playwright Test Automation Framework
## Overview
This repository contains an automated testing framework built with Playwright. The framework is designed for testing web application with focus on API and UI testing.The tests are structured into different files with each handling specific test scenarios.
Additionally, this repository is integrated with Github actions to automate the execution of test suite on each PR merge or can be a manually triggered workflow.The API test's bearer token is stored as a repository secret, which allows it to be accessed during test execution via GitHub Actions. For local test runs, the bearer token is saved in a local JSON file, ensuring that the secrets are securely stored and utilized in both environments.

## Project Structure
For the UI test I have used a page object model to seggregate the different pages in the application and then adding all the elements specific to a page and actions on those specific web elements are written inside the specific page object class.
### Tests Overview
1. purchase-flow.spec.ts (UI Test)

  This test file contains the UI test for validating the product purchase flow. The flow is as follows:
  - Add a product to the shopping cart.
  - Complete the purchase and checkout process.
  - The test ensures that the end-to-end shopping process works correctly, from selecting a product to confirming the purchase.

2. user-crud-operations.spec.ts (API Test)
   
  This test file performs an end-to-end API test for CRUD (Create, Read, Update, Delete) operations on users via the GoRest API. The API version used is v2, and authentication is handled via HTTP Bearer token.
  #### Test Flow:
  - Create user: Send a POST request to create a new user. (I have used an external library faker.js to generate random user data)
  - Get user details: Send a GET request to retrieve the created user's details.
  - Update user: Send a PUT request to update the user's information.
  - Delete user: Send a DELETE request to remove the user.

### GitHub Actions Workflow
A GitHub Actions workflow is set up to automatically run the tests when a pull request (PR) is merged. You can also manually trigger the workflow via the GitHub Actions UI.

# Setting the project for local excecution
## Prerequisites
- Node.js (Version  22.14.0)
- Playwright
- Typescript
- faker.js (Version 9.6.0)

## Installation
 To set up the project locally follow the below steps:
1. Clone the repository:

```bash
git clone https://github.com/ssujith91/Quatt_Assignment_2025.git
cd Quatt_Assignment_2025
```

2. Install the dependencies

```bash
npm install
```

3. Install playwright dependencies

```bash
npx playwright install
```

4. Install faker library

```bash
npm install @faker-js/faker --save-dev
```
#  Running the Tests Locally
To run the tests on your local machine, follow these steps:

## Run UI Tests:

```bash
npx playwright test tests/purchase-flow.spec.ts
```
## Run API Tests:

```bash
npx playwright test tests/user-crud-operations.spec.ts
```
## Run All Tests:

```bash
npx playwright test
```
This will execute all the tests in the tests folder


