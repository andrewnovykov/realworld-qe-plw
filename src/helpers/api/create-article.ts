import { EMAIL, PASSWORD } from '../../../environment.config'

import { loginAPI } from './get-token'
import { request } from '@playwright/test'

export const createArticleApi = async (title, description, body, tagList) => {
	const context = await request.newContext({
		baseURL: 'http://qafromla.herokuapp.com',
	})
	const payload = {
		article: {
			title,
			description,
			body,
			tagList,
		},
	}
	const accessToken = await loginAPI(EMAIL, PASSWORD)
	const response = await context.post('api/articles', {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		data: payload,
	})
	if (response.status() !== 201) {
		throw new Error(`Failed to create the article. Status: ${response.status()}`)
	}
	return response
}
