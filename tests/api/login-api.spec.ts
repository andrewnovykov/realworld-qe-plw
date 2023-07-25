import { expect, test } from '@playwright/test'

test.describe('Login', () => {
	test('should be able to login with existing account @QALA-7', async ({ request }) => {
		const playload = {
			user: { email: 'babybus@gmail.com', password: 'QWERTY12345' },
		}
		const response = await request.post('/api/users/login', {
			data: playload,
		})
		const data = await response.json()
		expect(response.status()).toBe(200)
		expect(response.ok()).toBeTruthy()
		const { user } = data
		expect(user.token).toBeTruthy()
	})
	test('should not be able to login with invalid email @QALA-8', async ({ request }) => {
		const playload = {
			user: { email: 'babybus999@gmail.com', password: 'QWERTY12345' },
		}
		const response = await request.post('/api/users/login', {
			data: playload,
		})
		const data = await response.json()
		expect(response.status()).toBe(404)

		const { user } = data
		expect(data).toEqual({
			errors: {
				body: ['Email not found sign in first'],
			},
		})
	})
})
