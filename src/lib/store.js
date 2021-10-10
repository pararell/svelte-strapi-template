import { BehaviorSubject } from 'rxjs';
import { post } from './api';
import Cookie from 'cookie-universal';
const cookies = Cookie();

export const user = new BehaviorSubject(null);
export const config = new BehaviorSubject(null);
export const pages = new BehaviorSubject([]);
export const categories = new BehaviorSubject([]);
export const token = new BehaviorSubject(false);
export const disqusLoaded = new BehaviorSubject(false);
export const loading = new BehaviorSubject(false);
export const errors = new BehaviorSubject(null);

export const formSubmit = async(path, request) => {
  setLoading();

	try {
		const response = await post(path, request);
		if (response) {
			endLoading();
		}

	} catch (error) {
		endLoading(JSON.parse(error).errors);
	}
}

export const autoLogin = () => {
	const userFromCookies = cookies.get('user');
	const tokenFromCookies = cookies.get('token');

	if (userFromCookies && tokenFromCookies) {
		user.next(userFromCookies);
		token.next(tokenFromCookies);
	}

	return true;
};

export const login = async (request) => {
  setLoading();

	try {
		const response = await post(`auth/local`, request);

		if (response) {
			cookies.set('user', JSON.stringify(response.user));
			cookies.set('token', JSON.stringify(response.jwt));
			user.next(response.user);
			token.next(response.token);
			endLoading();
		}
	} catch (error) {
		endLoading(JSON.parse(error).errors);
	}
}

export const register = async (request) => {
	setLoading();

	try {
		const response = await post(`auth/local/register`, request);

		if (response) {
			cookies.set('user', JSON.stringify(response.user));
			cookies.set('token', JSON.stringify(response.jwt));
			user.next(response.user);
			token.next(response.token);
			endLoading();
		}
	} catch (error) {
		endLoading(JSON.parse(error).errors);
	}
};

export const logout = () => {
	cookies.remove('token');
	cookies.remove('user');
	user.next(null);
	token.next(null);
};

const setLoading = () => {
	loading.next(true);
	errors.next(null);
};

const endLoading = (error = null) => {
	const errorUpdated = error
		? Array.isArray(error)
			? error.reduce((prev, curr) => prev + ', ' + curr.msg, '')
			: error.msg
		: null;
	errors.next(errorUpdated);
	loading.next(false);
};
