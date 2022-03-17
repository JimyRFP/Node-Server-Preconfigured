import express from "express";
import { initSessions } from "./modules/sessions";
import { initPostReader } from "./modules/postreader";
import { initCors } from "./modules/initcors";
import  ENV  from "./settings/env";
import authRouter from "./routes/auth";
export default class ExpressServer{
     app:any;
     authBaseUrl:string;
     usePort:number;
     constructor(){
        this.authBaseUrl="";
        this.usePort=ENV.PORT;
        this.app=express();
        this.initModules();
     }
     listen(port:any=null){
        if(port!=null)
           this.usePort=parseInt(port);
        this.app.listen(this.usePort);  
     }

     initModules(){
       initSessions(this.app);
       initPostReader(this.app);
       initCors(this.app);
     }
     initAuthSystem(baseUrl:string='/user'){
        this.authBaseUrl=baseUrl;
        this.app.use(this.authBaseUrl,authRouter);
     }

     getApp(){
       return this.app;
     }
}