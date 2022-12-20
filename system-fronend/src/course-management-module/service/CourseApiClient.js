import axios from 'axios';
import { Config } from '../../config/backend-config';
import { WebPathConfig } from '../../config/web-path';

axios.defaults.headers.common['Token'] = 'warrant';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


export class CourseApiClient{
    static findCourseAsStudentApi = '/courses/student/{nid}';
    static findCourseAsTeacherApi = '/courses/teacher/{nid}';
    static findCourseByCodeApi = '/courses/{code}';
    static findTeacherByCodeApi = '/teachers/{code}'

    // cid, name, status
    static loadCourseAsStudent(nid){
        return axios.get(Config.courseModuleURL + this.findCourseAsStudentApi.replace('{nid}', nid))
    }

    static loadCourseAsTeacher(nid){
        return axios.get(Config.courseModuleURL + this.findCourseAsTeacherApi.replace('{nid}', nid));
    }

    static getCourseInfo(code){
        return axios.get(Config.courseModuleURL + this.findCourseByCodeApi.replace('{code}', code));
    }

    static getTeacher(code) {
        return axios.get(Config.courseModuleURL + this.findTeacherByCodeApi.replace('{code}', code));
    }
}