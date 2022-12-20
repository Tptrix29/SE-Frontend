import axios from "axios";
import { Config } from "../../config/backend-config";
import { Utils } from "../../js-library/func-chunk";

export class AttendanceApiClient{
    static findAllAttByCodeApi = '/attendances';
    static checkAttApi = '/attendances/{atid}/{nid}';
    static findCheckStatusApi = '/attendances/{atid}/{nid}';
    static findAttByAtidApi = '/attendances/{atid};'

    static getAttendanceByCode(code){
        return axios.get(Utils.requestWithParams(Config.scoreModuleURL + this.findAllAttByCodeApi, {courseCode: code}));
    }

    static checkIn(atid, nid){
        return axios.post()
    }

    static getCheckStatus(atid, nid){
        return axios.get(Config.scoreModuleURL + this.findCheckStatusApi.replace('{atid}', atid).replace('{nid}', nid));
    }

    static getAttInfoByAtid(atid){
        return axios.get(Config.scoreModuleURL + this.findAttByAtidApi.replace("{atid}", atid))
    }
}