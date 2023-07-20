import { expect, request, test } from '@playwright/test'

import { uid } from 'uid'

test.describe('Authorization', () => {
	const newUsername = `user${uid(4)}`
	const newEmail = `user${uid(4)}@gmail.com`
	const password = 'password'

	test('Registrated with valid credention @QALA-2', async ({ request }) => {
		const playload = { user: { username: newUsername, email: newEmail, password: 'passwword' } }
		const response = await request.post('/api/users', {
			data: playload,
		})
		const data = await response.json()
		expect(response.status()).toBe(201)
		expect(response.ok()).toBeTruthy()

		const { user } = data

		expect(user).toHaveProperty('username', newUsername)
		expect(user).toHaveProperty('email', newEmail)
	})
	test('Should not be able to sign up with empty fields @QALA-5', async ({ request }) => {
		const playload = { user: { username: '', email: '', password: '' } }
		const response = await request.post('/api/users', {
			data: playload,
		})
		const data = await response.json()
		expect(response.status()).toBe(422)
		expect(data).toEqual({
			errors: {
				body: ['A username is required'],
			},
		})
	})
	test('Should not be able sign up with  an already registered email address @QALA-6', async ({ request }) => {
		const playload = { user: { username: 'babybus', email: 'babybus@gmail.com', password: 'passwword' } }
		const response = await request.post('/api/users', {
			data: playload,
		})
		const data = await response.json()
		expect(response.status()).toBe(422)
		expect(data).toEqual({
			errors: {
				body: ['Email already exists.. try logging in'],
			},
		})
	})
})
