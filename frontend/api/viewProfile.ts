'use server'

import axios from 'axios';
import { cookies } from 'next/headers'

export async function viewProfile() {
    const token = cookies().get('accessToken')?.value;
    try {
        const res = await axios.get("http://localhost:8000/users/viewProfile", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return res.data;
    } catch (error) {
        throw (error);
    }
}
