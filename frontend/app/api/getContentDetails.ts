import axios from 'axios';

export async function getContentDetails(id) {
    try {
        const res = await axios.get(`http://localhost:8000/contents/contentDetails/${id}`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9oYW5saW5lc0BnbWFpbC5jb20iLCJleHBpcmF0aW9uIjoiMjAyNC0wMy0yN1QxNTo1Mzo1NS45NjhaIiwiaWF0IjoxNzExNDY4NDM1fQ.hQSOG-El9MWpKPZ69YRvo-xzrmH_NLbeLtP_13--qic'
            }
        });
        return res.data;
    } catch (error) {
        throw (error);
    }
}
