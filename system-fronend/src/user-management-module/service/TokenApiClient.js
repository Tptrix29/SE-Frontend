import { Config } from "../../config/backend-config";
import axios from 'axios';
import qs from 'query-string';

export class TokenApiClient{
    static host = Config.userModuleURL;
    static verifyApi = '/token'


    static verify(token){
        return axios.get(Config.userModuleURL + this.verifyApi + '?' +qs.stringify({
            token: token
        }))
    }
}