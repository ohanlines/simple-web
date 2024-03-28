'use server'
import axios from 'axios';

export async function getContents() {
    try {
        const res = await axios.get(`${process.env.BE_HOST}/contents/content-list`);
        return res.data;
    } catch (error) {
        throw (error);
    }
}
