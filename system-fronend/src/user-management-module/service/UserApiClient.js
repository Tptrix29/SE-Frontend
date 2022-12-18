import axios from 'axios';
import { Config } from '../../config/backend-config';

export class UserApiClient{
    static userApi = '/users';
    static retrieveApi = '/users/{nid}';
    static registerApi = '/users';
    static deleteApi = '/users/{nid}';
    static uncheckApi = '/users/unchecked';
    static checkApi = '/users/{nid}/validate';


    static retrieve(nid){
        const url = this.retrieveApi.replace('{nid}', nid);
        return axios.get(Config.userModuleURL + url);
    }

    static registerOne(info){
        return axios.post(Config.userModuleURL + this.registerApi, info);
    }

    static deleteOne(nid){
        const url = this.deleteApi.replace('{nid}', nid);
        return axios.delete(Config.userModuleURL + url);
    }

    static findAllUnchecked(){
        return axios.get(Config.userModuleURL+this.uncheckApi);
    }

    static checkOne(nid){
        const url = this.checkApi.replace('{nid}', nid);
        return axios.post(Config.userModuleURL + url);
    }

    static uncheckOne(nid){
        const url = this.checkApi.replace('{nid}', nid);
        return axios.delete(Config.userModuleURL + url);
    }
}