import {test,expect,APIRequestContext} from '@playwright/test'
import {faker} from '@faker-js/faker'
import { AuthHelper } from '../helper/authhelper'

const apiUrl='https://gorest.co.in/public/v2'

async function addUser(api: APIRequestContext,baseUrl:string,userName:string,userEmail:string,userGender:string,userStatus:string) {
    const userData = {
    name: userName,
    email: userEmail,
    gender: userGender,
    status: userStatus,
  }
  const authHeader = AuthHelper.getAuthHeader()
  const response = await api.post(baseUrl+'/users', {
    headers: authHeader,
    ignoreHTTPSErrors:true,
    data: userData,
  })

  const responseData = await response.json()
  expect(response.status()).toBe(201)
  return responseData.id
}


async function getUser(api: APIRequestContext,baseUrl:string, userId: string) {
    const authHeader = AuthHelper.getAuthHeader()
    const response = await api.get(baseUrl+`/users/${userId}`, {
    headers: authHeader,
    ignoreHTTPSErrors:true,
  })

  const responseData = await response.json()
  expect(response.status()).toBe(200)
  return responseData
}


async function updateUser(api: APIRequestContext,baseUrl:string, userId: string,userName:string,userEmail:string,userGender:string,userStatus:string) {
  const userData = {
    name: userName,
    email: userEmail,
    gender: userGender,
    status: userStatus,
  }
  const authHeader = AuthHelper.getAuthHeader()
  const response = await api.put(baseUrl+`/users/${userId}`, {
    headers: authHeader,
    data: userData,
    ignoreHTTPSErrors:true,
  })

  const responseData = await response.json()
  expect(response.status()).toBe(200)
  return responseData
}


async function deleteUser(api: APIRequestContext,baseUrl:string, userId: string) {
    const authHeader = AuthHelper.getAuthHeader()
    const response = await api.delete(baseUrl+`/users/${userId}`, {
    headers: authHeader,
    ignoreHTTPSErrors:true,
  })

  expect(response.status()).toBe(204)
}


test('CRUD operations for user', async ({ request }) => {
  
  //Create a new user
  const userName = faker.person.firstName()
  const userEmail = userName +`${faker.number.int(1000)}`+'@gmail.com'
  const userGender = faker.person.sex()
  const userStatus = 'active'
  const userId = await addUser(request,apiUrl,userName,userEmail,userGender,userStatus)

  //Read the created user data
  const user = await getUser(request,apiUrl,userId)
  expect(user.id).toBe(userId)
  expect(user.name).toBe(userName)
  expect(user.email).toBe(userEmail)
  expect(user.status).toBe(userStatus)

  //Update the user
  const newUserName = userName+'Updated'
  const newEmail = userEmail.split('@')[0]+'Updated'+'@gmail.com'
  const newGender = userGender
  const newStatus = 'inactive'
  const updatedUser = await updateUser(request,apiUrl,userId,newUserName,newEmail,newGender,newStatus)
  expect(updatedUser.name).toBe(newUserName)
  expect(updatedUser.email).toBe(newEmail)
  expect(updatedUser.status).toBe(newStatus)

  //Delete the user
  await deleteUser(request,apiUrl, userId)
})
