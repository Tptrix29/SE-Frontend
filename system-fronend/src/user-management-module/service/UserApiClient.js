import axios from 'axios';
import { Config } from '../../config/backend-config';

export class UserApiClient{
    static userApi = '/users';

    static retrieve(nid){
        return axios.get(Config.userModuleURL + this.userApi + '/' + nid);
    }

    static registerOne(info){
        return axios.post(Config.userModuleURL + this.userApi, info);
    }
}