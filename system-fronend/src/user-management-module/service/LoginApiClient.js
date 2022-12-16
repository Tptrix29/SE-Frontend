import { Config } from '../../config/backend-config';
import CryptoJS from 'crypto-js';
const axios = require('axios').default;

export default class LoginApiClient{

    static verifyApi = "/token";

    static encrypt(raw){
        return CryptoJS.SHA1(raw).toString();
    }

    static login(nid, password){
        console.log("nid: "+nid +" pwd: " + password)
        return axios.post(Config.userModuleURL+this.verifyApi, {
            nid: nid, 
            password: this.encrypt(password)
        },{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    };
    
}