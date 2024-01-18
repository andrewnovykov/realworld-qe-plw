import { EMAIL, PASSWORD } from '../../environment.config'
import { expect, request, test } from '@playwright/test'

import { loginAPI } from '../../src/helpers/api/get-token'
import { uid } from 'uid'

test.describe('Article', () => {
	const newArticle = 'About testing' + uid(5)
	const aboutArticle = 'About testing' + uid(5)
	const writeArticle = 'About testing'
	const tags = 'testing, QA'
	test('should be able to create an article with Valid Inputs @QALA-25', async ({ request }) => {
		const payload = {
			article: {
				title: newArticle,
				description: aboutArticle,
				body: writeArticle,
				tagList: [tags],
			},
		}
		const accessToken = await loginAPI(EMAIL, PASSWORD)
		const response = await request.post('api/articles', {
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			data: payload,
		})
		const data = await response.json()
		expect(response.status()).toBe(201)
		expect(response.ok()).toBeTruthy()
		const { article } = data
		expect(article).toHaveProperty('title', newArticle)
		expect(article).toHaveProperty('description', aboutArticle)
		expect(article).toHaveProperty('body', writeArticle)
	})
})
