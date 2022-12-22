import axios from "axios";
import { Config } from "../../config/backend-config";
import { Utils } from "../../js-library/func-chunk";

export class AttendanceApiClient{
    static findAllAttByCodeApi = '/attendances';
    static checkAttApi = '/attendances/{atid}/{nid}';
    static findCheckStatusApi = '/attendances/{atid}/{nid}';
    static findAttByAtidApi = '/attendances/{atid};';

    static addAttApi = '/attendances';
    static modifyAttApi = '/attendances/{atid}';
    static deleteAttApi = '/attendances/{atid}';

    static getAttendanceByCode(code){
        return axios.get(Utils.requestWithParams(Config.scoreModuleURL + this.findAllAttByCodeApi, {courseCode: code}));
    }

    // // Not complete
    // static checkIn(atid, nid){
    //     return axios.post()
    // }

    static getCheckStatus(atid, nid){
        return axios.get(Config.scoreModuleURL + this.findCheckStatusApi.replace('{atid}', atid).replace('{nid}', nid));
    }

    static getAttInfoByAtid(atid){
        return axios.get(Config.scoreModuleURL + this.findAttByAtidApi.replace("{atid}", atid))
    }

    static addAttendance(data){
        return axios.post(Config.scoreModuleURL + this.addAttApi, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    static modifyAttendance(atid, data){
        return axios.patch(Config.scoreModuleURL + this.modifyAttApi.replace("{atid}", atid), data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    static deleteAttendance(atid){
        return axios.delete(Config.scoreModuleURL + this.deleteAttApi.replace("{atid}", atid))
    }
}