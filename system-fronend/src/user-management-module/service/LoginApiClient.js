import { Config } from '../../config/backend-config';
import { Utils } from '../../js-library/func-chunk';
const axios = require('axios').default;

export default class LoginApiClient{

    static verifyApi = "/token";
    
    static login(nid, password){
        console.log("nid: "+nid +" pwd: " + password)
        return axios.post(Config.userModuleURL+this.verifyApi, {
            nid: nid, 
            password: Utils.encrypt(password)
        },{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    };
    
}