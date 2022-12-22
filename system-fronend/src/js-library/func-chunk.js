import CryptoJS from 'crypto-js';
import qs from 'query-string';
import dayjs from 'dayjs';

export class Utils{
    static getURLParam(url, key){
        var regex = new RegExp("[?&#]+" + key + "=([^?&#]+)");
        var result = regex.exec(url);
        if (!result) return;
        if (!result[1]) return;
        return result[1];
    }

    static requestWithParams(url, params){
        // console.log(url + '?' + qs.stringify(params))
        return (url + '?' + qs.stringify(params));
    }

    static timestamp2date(stamp){
        return dayjs(stamp).format('YYYY-MM-DD HH:mm:ss');
    }


    static encrypt(raw){
        return CryptoJS.SHA1(raw).toString();
    }

    static _length(str){
        var len = 0;
        for(let i = 0; i<str.length;i++){
            if(str.charAt(i) > '~')
                len += 2
            else
                len++;
        }
        return len;
    }

    static checkEmail(str){
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        return reg.test(str);
    }

    static checkNid(str){
        var reg = /^[0-9]+$/
        return reg.test(str) && str.length == 7;
    }

    static checkPwd(str){
        var reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
        return reg.test(str) && str.length >= 8;
    }

}
