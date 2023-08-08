import { expect, request, test } from '@playwright/test'
export const Login = async (email, password) => {
	const context = await request.newContext({
		baseURL: 'http://qafromla.herokuapp.com',
	})
	const payload = {
		user: {
			email,
			password,
		},
	}
	const response = await context.post('api/users/login', {
		data: payload,
	})
	const data = await response.json()
	expect(response.status()).toBe(200)
	const { user } = data
	expect(user.token).toBeTruthy()
	const accessToke = user.token
	return accessToke
}
 