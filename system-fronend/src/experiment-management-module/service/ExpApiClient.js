import axios from "axios"
import { Config } from "../../config/backend-config"
import { Utils } from "../../js-library/func-chunk";

export class ExpApiClient{
    static findAllExpByCodeApi = '/experiment';
    static findExpByEidApi = '/experiment/{eid}';

    static addExpApi = "/experiment";
    static modifyExpApi = "/experiment";
    static deleteExpApi = "/experiment/{eid}"

    static getAllExp(code){
        return axios.get(Utils.requestWithParams(Config.exprimentModuleURL + this.findAllExpByCodeApi, {
            course: code,
        }))
    }

    static getExpInfo(eid){
        return axios.get(Config.exprimentModuleURL + this.findExpByEidApi.replace('{eid}', eid))
    }

    static addExperiment(data){
        return axios.post(Config.exprimentModuleURL + this.addExpApi, data, {
            headers: {
                "Content-Type": 'application/json',
            }
        })
    }

    static modifyExperiment(data){
        return axios.patch(Config.exprimentModuleURL + this.modifyExpApi, data, {
            headers: {
                "Content-Type": 'application/json',
            }
        })
    }

    static deleteExperiment(eid){
        return axios.delete(Config.exprimentModuleURL + this.deleteExpApi.replace("{eid}", eid));
    }

}