import fs from "fs";
import path from "path";
const custom_env_path=path.join(process.cwd(),"spc_envfile.json");
const custom_env_path_prod=path.join(process.cwd(),"spc_envfile_prod.json");
var custom_env:any={};
try{
   
   if(process.env.DEV_ENVIRONMENT){
     custom_env=JSON.parse(fs.readFileSync(custom_env_path).toString());
   }else{
     custom_env=JSON.parse(fs.readFileSync(custom_env_path_prod).toString());
   }
}catch(e){
   custom_env={};
}
const ENV={
    NODE_ENV:process.env.DEV_ENVIRONMENT?'development':'production',
    ALLOW_CORS:process.env.ALLOW_CORS=='ALLOW'?true:false,
    PORT:process.env.SERVER_PORT?parseInt(process.env.SERVER_PORT):3000,
    DATABASE:{
        dialect:process.env.DATABASE_DIALECT?process.env.DATABASE_DIALECT:'postgres',
        port:(custom_env.DATABASE&&custom_env.DATABASE.PORT)?process.env.DATABASE_PORT:5432,
        host:(custom_env.DATABASE&&custom_env.DATABASE.HOST)?process.env.DATABASE_HOST:process.env.DATABASE_HOST||'localhost',
        database:(custom_env.DATABASE&&custom_env.DATABASE.DATABASE)?process.env.DATABASE_DATABASE:'postgres',
        username:(custom_env.DATABASE&&custom_env.DATABASE.USERNAME)?process.env.DATABASE_USERNAME:process.env.DATABASE_USERNAME||'postgres',
        password:(custom_env.DATABASE&&custom_env.DATABASE.PASSWORD)?custom_env.DATABASE.PASSWORD:process.env.DATABASE_PASSWORD||'',
    },
    SESSION_SECRET:process.env.SESSION_SECRET?process.env.SESSION_SECRET:"secret key session",
};
export default ENV;