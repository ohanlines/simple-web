'use server'

import axios from 'axios';
import { cookies } from 'next/headers'

export async function signIn(email, password) {
    try {
        const res = await axios.post(`${process.env.BE_HOST}/users/login`, {
            email: email,
            password: password
        });

      cookies().set('accessToken', res.data.data.token);
        return res.data;
    } catch (error) {
        throw (error);
    }
}
