

export class WebPathConfig{
    static host = 'http://localhost:80';

    static toURL(path, params=null){
        if(!params)
            window.location = this.host + path;
        
        var arr = []
        for(var key in params){
            arr.push(key.toString()+'='+params[key].toString())
        }
        window.location = this.host + path + '?' + arr.join('&')
    }

    static redirectToLogin(){
        window.location = this.host + '/login';
    }

}