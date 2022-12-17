import axios from 'axios';
import { Config } from '../../config/backend-config';

export class UserApiClient{
    static userApi = '/users';
    static uncheckedApi = '/users/unchecked';
    static checkApiSuffix = '/validate';

    static retrieve(nid){
        return axios.get(Config.userModuleURL + this.userApi + '/' + nid);
    }

    static registerOne(info){
        return axios.post(Config.userModuleURL + this.userApi, info);
    }

    static deleteOne(nid){
        return axios.delete(Config.userModuleURL + this.userApi + '/' + nid);
    }

    static findAllUnchecked(){
        return axios.get(Config.userModuleURL+this.uncheckedApi);
    }

    static checkOne(nid){
        return axios.post(Config.userModuleURL + this.userApi + '/' + nid + this.checkApiSuffix)
    }
}