import axios from 'axios';

export async function signUp(email,username, password) {
    try {
        const res = await axios.post("http://localhost:8000/users/signup", {
            email: email,
            username: username,
            password: password
        });

        return res.data;
    } catch (error) {
        throw (error);
    }
}
