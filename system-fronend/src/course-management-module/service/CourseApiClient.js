import axios from 'axios';
import { Config } from '../../config/backend-config';
import { Utils } from '../../js-library/func-chunk';


export class CourseApiClient{
    static findCourseAsStudentApi = '/courses/student/{nid}';
    static findCourseAsTeacherApi = '/courses/teacher/{nid}';
    static findCourseByCodeApi = '/courses/{code}';
    static findCoursesInPageApi = '/courses';

    static modifyCourseApi = '/courses';
    static createCourseApi = '/courses';
    static deleteCourseApi = '/courses/{code}';

    static findStudentByCodeApi = '/students/{code}';
    static addStudentApi = '/students/{code}';
    static deleteStudentApi = '/students/{code}/{nid}';
    static addStudentABatchApi = '/students/{code}/batch';

    static findTeacherByCodeApi = '/teachers/{code}';
    static addTeacherApi = '/teachers/{code}';
    static deleteTeacherApi = '/teachers/{code}/{nid}';


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

    static getCoursesInPage(page, size){
        return axios.get(Utils.requestWithParams(Config.courseModuleURL + this.findCoursesInPageApi, {
            page: page,
            size: size
        }))
    }

    static modifyCourse(data){
        return axios.put(Config.courseModuleURL + this.modifyCourseApi, data)
    }

    static createCourse(data){
        return axios.post(Config.courseModuleURL + this.createCourseApi, data)
    }

    static deleteCourse(code){
        return axios.delete(Config.courseModuleURL + this.deleteCourseApi.replace("{code}", code))
    }




    static getStudent(code){
        return axios.get(Config.courseModuleURL + this.findStudentByCodeApi.replace("{code}", code))
    }

    static addStudent(code, data) {
        return axios.post(Config.courseModuleURL + this.addStudentApi.replace("{code}", code), data);
    }

    static deleteStudent(code, nid){
        return axios.delete(Config.courseModuleURL + this.deleteStudentApi.replace("{code}", code).replace("{nid}", nid));
    }




    static getTeacher(code) {
        return axios.get(Config.courseModuleURL + this.findTeacherByCodeApi.replace('{code}', code));
    }

    static addTeacher(code, data){
        return axios.post(Config.courseModuleURL + this.addTeacherApi.replace("{code}", code), data);
    }

    static deleteTeacher(code, nid){
        return axios.delete(Config.courseModuleURL + this.deleteTeacherApi.replace("{nid}", nid).replace("{code}", code))
    }
}