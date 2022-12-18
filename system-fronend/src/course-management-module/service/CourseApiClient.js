import axios from 'axios';
import { Config } from '../../config/backend-config';
import { WebPathConfig } from '../../config/web-path';

export class CourseApiClient{
    static findCourseAsStudent = '/courses/student/{nid}';
    static findCourseAsTeacher = '/courses/teacher/{nid}';
    static findCourseByCode = '/courses/{code}';

    // cid, name, status
    static loadCourseAsStudent(nid){
        return axios.get(Config.courseModuleURL + this.findCourseAsStudent.replace('{nid}', nid))
    }

    static loadCourseAsTeacher(nid){
        return axios.get(Config.courseModuleURL + this.findCourseAsTeacher.replace('{nid}', nid));
    }

    static getCourseInfo(code){
        return axios.get(Config.courseModuleURL + this.findCourseByCode.replace('{code}', code));
    }
}