

export class WebPathConfig{
    // static host = 'http://localhost:3001';
    // static host = 'http://120.78.65.145:80';
    static host = "http://" + window.location.host;

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