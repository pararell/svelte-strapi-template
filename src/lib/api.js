import { API_URL } from './constants';
import Cookie from 'cookie-universal';
const cookies = Cookie();
const tkn = cookies.get('token');
const apiUrl = API_URL;

const send = async ({ method, path, params, data, token }) => {
	const opts = {
		method,
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json',
			Cache: 'no-cache',
		},
	}
	if (data) {
		opts.body = JSON.stringify(data)
	}

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token}`
	} else if (tkn) {
		opts.headers['Authorization'] = `Bearer ${tkn}`
	}

	const uri = new URL(`${apiUrl}/${path}`)

	if (params) {
		Object.keys(params).forEach((key) => uri.searchParams.append(key, params[key]))
	}
	const url = uri.toString()
	const response = await fetch(url, opts)
	const json = await response.text()
	if (!response.ok) {
		throw json
	}
	try {
		return JSON.parse(json)
	} catch (e) {
		return json
	}
}

export const get = (path, params, token) => {
	const apiPath = 'api/' + path;
	console.log(apiPath, 'apiPath')
	return send({ method: 'GET', path: apiPath, params, token })
}

export const del = (path) => {
	const apiPath = 'api/' + path;
	return send({ method: 'DELETE', path: apiPath })
}

export const post = (path, data) => {
	const apiPath = 'api/' + path;
	return send({ method: 'POST', path: apiPath, data })
}

export const patch = (path, data) => {
	const apiPath = 'api/' + path;
	return send({ method: 'PATCH', path: apiPath, data })
}