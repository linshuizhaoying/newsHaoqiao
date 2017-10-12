export const UrlRegEx = (url: string) =>   
{      
    //如果加上/g参数，那么只返回$0匹配。也就是说arr.length = 0   
    var re = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i;   
    //re.exec(url);   
    var arr = url.match(re);   
    return arr;   
     
} 