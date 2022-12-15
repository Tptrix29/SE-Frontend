export function getURLParam(url, key){
    var regex = new RegExp("[?&]+" + key + "=([^?&]+)");
    var result = regex.exec(url);
    if (!result) return;
    if (!result[1]) return;
    return result[1];
}