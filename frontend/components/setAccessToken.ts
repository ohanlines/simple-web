'use server'

// import axios from 'axios';
import { cookies } from 'next/headers'

export async function setAccessToken() {

    try {
        const token = cookies().set('accessToken', '');
    } catch (error) {
        throw (error);
    }
}
