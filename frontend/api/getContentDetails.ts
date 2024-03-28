'use server'

import { cookies } from 'next/headers'
import axios from 'axios';

export async function getContentDetails(id) {
    const token = cookies().get('accessToken')?.value;
    try {
        const res = await axios.get(`${process.env.BE_HOST}/contents/content-details/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw (error);
    }
}
