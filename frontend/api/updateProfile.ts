import axios from 'axios';
// import { cookies } from 'next/headers'

export async function updateProfile(data) {
    const { email, username, oldPassword, newPassword } = data;
    try {
        const res = await axios.post("http://localhost:8000/users/updateProfile", {
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
