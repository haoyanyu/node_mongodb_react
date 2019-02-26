/**
 * 全局配置文件
 */
let baseURL; 
if(process.env.NODE_ENV === 'development'){
  baseURL = 'http://localhost:3001/';
}else{
  baseURL = 'http://localhost:3001/';
}

export {baseURL}