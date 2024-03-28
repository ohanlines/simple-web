'use server'

// import axios from 'axios';
import { cookies } from 'next/headers'

export async function deleteAccessToken() {

    try {
        const token = cookies().set('accessToken', '');
    } catch (error) {
        throw (error);
    }
}
