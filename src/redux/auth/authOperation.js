import axios from 'config';
import Notiflix from 'notiflix';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthHeader, clearAuthHeader } from 'config';
// import { json } from 'react-router-dom';

export const logIn = createAsyncThunk(
	'auth/login',
	async (credentials, thunkAPI) => {
		try {
			const { data } = await axios.post('/auth/login', credentials);
			setAuthHeader(data.accessToken);
      
			console.log('logIn data', data);

			return data;
		} catch (error) {
			Notiflix.Notify.failure(error.response.data.message);
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const register = createAsyncThunk(
	'auth/register',
	async (credentials, thunkAPI) => {
		try {
			const password = credentials.password;
			const email = credentials.email;
			await axios.post('/auth/register', credentials);
			const { data } = await axios.post('/auth/login', { email, password });
			setAuthHeader(data.accessToken);
			return data
		} catch (error) {

			Notiflix.Notify.failure(error.response.data.message);

			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const logOut = createAsyncThunk(
	'auth/logout',
	async (accessToken, thunkAPI) => {
		setAuthHeader(accessToken);
		try {
			await axios.post('/auth/logout');
			clearAuthHeader();
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const refreshUser = createAsyncThunk(
	'auth/refresh',
	async (sid, thunkAPI) => {
		const state = thunkAPI.getState();
		const persistedToken = state.auth.refreshToken;

		if (persistedToken === null) {
			return thunkAPI.rejectWithValue('Unable to fetch user');
		}

		try {
			setAuthHeader(persistedToken);
			const { data } = await axios.post('/auth/refresh', sid);
			setAuthHeader(data.newAccessToken);

			// console.log(data);

			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
// const divGoogle = document.querySelector('#google');
export const loginWithGoogle = createAsyncThunk(
	'auth/loginwithgoogle',
	async (setMarkup, thunkAPI) => {
		try {

			const { data } = await axios.get('/auth/google');
			console.log(data);

			fetch('https://bookread-backend.goit.global/auth/google')
				.then(res =>fetch(res.url)).then(console.log)
				// .then(res => (divGoogle.innerHTML = res.data))
				// .then(console.log);

		} catch (error) {
			console.log(error.message);
			// return thunkAPI.rejectWithValue(error.message);
		}
	}
);
