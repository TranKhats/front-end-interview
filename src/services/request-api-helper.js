// import { API_URL } from "../constants/constants";
import axios from "axios";
import { BASE_URL } from "../constants";



export default class RequestApiHelper {
    static async pos(url, params) {
            try {
                var result = await axios({
                    method: 'POST',
                    url: BASE_URL + url,
                    data: params,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                // console.log('result', result);
                return result.data;
            } catch (error) {
                console.log(`Service error ${BASE_URL + url}`, error)
                return {
                    isSuccessed: false,
                    message: 'Some thing wrong in server',
                }
            }


    }
}
