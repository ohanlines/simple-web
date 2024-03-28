'use server'

import { cookies } from 'next/headers'
import axios from 'axios';

export async function getContentDetails(id) {
    const token = cookies().get('accessToken')?.value;
    try {
        const res = await axios.get(`http://localhost:8000/contents/contentDetails/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw (error);
    }
}
