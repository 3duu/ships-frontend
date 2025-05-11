import axios from "axios";

export async function fetchInterests(): Promise<string[]> {
    const res = await axios.get('/public/interests');
    return res.data.interests;
}