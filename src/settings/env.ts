import fs from "fs";
import path from "path";
const custom_env_path=path.join(process.cwd(),"spc_envfile.json");
var custom_env:any={};
try{
   custom_env=JSON.parse(fs.readFileSync(custom_env_path).toString());
}catch(e){
   custom_env={};
}
const ENV={
    NODE_ENV:process.env.SERVER_ENV=='development'?'development':'production',
    ALLOW_CORS:process.env.ALLOW_CORS=='ALLOW'?true:false,
    PORT:process.env.SERVER_PORT?parseInt(process.env.SERVER_PORT):3000,
    DATABASE:{
        dialect:process.env.DATABASE_DIALECT?process.env.DATABASE_DIALECT:'postgres',
        host:process.env.DATABASE_HOST?process.env.DATABASE_HOST:'localhost',
        database:(custom_env.DATABASE&&custom_env.DATABASE.DATABASE)||(process.env.DATABASE_DATABASE||'postgres'),
        username:process.env.DATABASE_USERNAME?process.env.DATABASE_USERNAME:'postgres',
        password:process.env.DATABASE_PASSWORD?process.env.DATABASE_PASSWORD:'',
    },
    SESSION_SECRET:process.env.SESSION_SECRET?process.env.SESSION_SECRET:"secret key session",
};
export default ENV;