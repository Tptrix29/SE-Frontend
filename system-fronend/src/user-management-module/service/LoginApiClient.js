import { Config } from '../../config/backend-config';
import { Utils } from '../../js-library/func-chunk';
const axios = require('axios').default;

// axios.defaults.headers.common['Token'] = 'warrant';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default class LoginApiClient{

    static verifyApi = "/token";
    
    static login(nid, password){
        // console.log("nid: "+nid +" pwd: " + password)
        return axios.post(Config.userModuleURL+this.verifyApi, {
            nid: nid, 
            password: Utils.encrypt(password)
        },{
            headers: {
                'Token': 'warrant',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    };
    
}