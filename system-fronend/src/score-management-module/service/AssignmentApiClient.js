import axios from "axios";
import { Config } from "../../config/backend-config";
import { Utils } from "../../js-library/func-chunk";

export class AssignmentApiClient{
    static findAllAssByCodeApi = "/assignments";
    static findAssByAsidApi = "/assignments/{asid}";

    static getAssignmentByCode(code){
        return axios.get(Utils.requestWithParams(Config.scoreModuleURL + this.findAllAssByCodeApi, {courseCode: code}));
    }

    static getAssignmentInfoByAsid(asid){
        return axios.get(Config.scoreModuleURL + this.findAssByAsidApi.replace('{asid}', asid));
    }
}