import axios from "axios";
import { Config } from "../../config/backend-config";
import { Utils } from "../../js-library/func-chunk";

export class AssignmentApiClient{
    static findAllAssByCodeApi = "/assignments";
    static findAssByAsidApi = "/assignments/{asid}";

    static addAssApi = "/assignments";
    static modifyAssApi = "/assignments/{asid}";
    static deleteAssApi = "/assignments/{asid}";

    static getAssignmentByCode(code){
        return axios.get(Utils.requestWithParams(Config.scoreModuleURL + this.findAllAssByCodeApi, {courseCode: code}));
    }

    static getAssignmentInfoByAsid(asid){
        return axios.get(Config.scoreModuleURL + this.findAssByAsidApi.replace('{asid}', asid));
    }

    static addAssignment(data){
        return axios.post(Utils.requestWithParams(Config.scoreModuleURL + this.addAssApi, data), [], {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    static modifyAssignment(asid, data){
        return axios.patch(Config.scoreModuleURL + this.modifyAssApi.replace("{asid}", asid), data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    static deleteAssignment(asid){
        return axios.delete(Config.scoreModuleURL + this.modifyAssApi.replace("{asid}", asid));
    }
}