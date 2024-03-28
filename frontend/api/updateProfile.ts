'use server'
import axios from 'axios';

export async function updateProfile(data) {
    const { email, username, oldPassword, newPassword } = data;
    try {
        const res = await axios.post(`${process.env.BE_HOST}/users/update-profile`, {
            email: email,
            username: username,
            oldPass: oldPassword,
            newPass: newPassword

        });

        return res.data;
    } catch (error) {
        throw (error);
    }
}
