import axios from 'axios';

export async function getContents() {
    try {
        const res = await axios.get("http://localhost:8000/contents/contentList");
        return res.data;
    } catch (error) {
        throw (error);
    }
}
