import { Config } from '../../config/backend-config';
import CryptoJS from 'crypto-js';
const axios = require('axios').default;

export default class LoginApiClient{

    static verifyApi = "/token";
    static testApi = '/users';

    static encrypt(raw){
        return CryptoJS.SHA1(raw).toString();
    }

    static test(){
        axios.get(Config.userModuleURL+this.testApi+'/2000004').then(function(response){
            console.log(response.data);
        });
        
    }

    static login(nid, password){
        axios.post(Config.userModuleURL+this.verifyApi, {
            nid: nid, 
            password: this.encrypt(password)
        },{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response){
            console.log(response.data);
        }).catch(function(err){
            console.log(err.response.status);
        })

    };
    
}