import { Config } from "../../config/backend-config";
import axios from 'axios';
import { Utils } from "../../js-library/func-chunk";

// axios.defaults.headers.common['Token'] = 'warrant';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export class TokenApiClient{
    static verifyApi = '/token'

    static verify(token){
        return axios.get(Utils.requestWithParams(Config.userModuleURL + this.verifyApi, {
            token: token,
        }))
    }
}