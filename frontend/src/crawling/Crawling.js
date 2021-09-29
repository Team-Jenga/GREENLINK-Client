import axios from "axios";
import cheerio from "cheerio";

// 한국환경공단 블로그
const getHTML = async() => {
    try {
        return await axios.get("/gethtml");
    } catch(err) {
        console.log(err);
    }
}

export const parsingEvent = async() => {
    const html = await getHTML();
    console.log(html.data);

    const $ = cheerio.load(html.data);
}