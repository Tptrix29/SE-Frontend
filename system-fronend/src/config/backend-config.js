export class Config{
    
    static hostIP = "http://8.130.38.11"

    static userModuleURL = this.hostIP + ":8080";
    static courseModuleURL = this.hostIP + ":8081";
    static exprimentModuleURL = this.hostIP + ":8082";
    static scoreModuleURL = this.hostIP + ":8083";
    static resourceLibModuleURL = this.hostIP + ":8084";

    static defaultHeader = {
        Token: "warrant",
    };
}
