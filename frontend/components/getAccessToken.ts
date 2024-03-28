'use server'

// import axios from 'axios';
import { cookies } from 'next/headers'

export async function getAccessToken() {

    try {
        const token = cookies().get('accessToken');
        console.log('ACT:', token);
        return token;
    } catch (error) {
        throw (error);
    }
}
