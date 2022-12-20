import axios from "axios"
import { Config } from "../../config/backend-config"
import { Utils } from "../../js-library/func-chunk";

export class ExpApiClient{
    static findAllExpByCodeApi = '/experiment';
    static findExpByEidApi = '/experiment/{eid}';

    static getAllExp(code){
        return axios.get(Utils.requestWithParams(Config.exprimentModuleURL + this.findAllExpByCodeApi, {
            course: code,
        }))
    }

    static getExpInfo(eid){
        return axios.get(Config.exprimentModuleURL + this.findExpByEidApi.replace('{eid}', eid))
    }
}