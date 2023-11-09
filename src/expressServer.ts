import express from "express";
import { Express } from "express";
import { initSessions } from "./modules/sessions";
import { initPostReader } from "./modules/postreader";
import { initCors } from "./modules/initcors";
import  ENV  from "./settings/env";
import authUserRouter from "./routes/userauth";
import { router as wsAuthRoter } from "./routes/wsauth";
import { Server } from "http";
import userRegisterRouter from "./routes/userresgister";
export default class ExpressServer{
    app:Express;
    authUserBaseUrl:string;
    registerUserBaseUrl:string;
    usePort:number;
    server?:Server;
    wsAuthBaseUrl:string;
    constructor(){
       this.authUserBaseUrl="";
       this.wsAuthBaseUrl="";
       this.registerUserBaseUrl="";
       this.usePort=ENV.PORT;
       this.app=express();
       this.initModules();
    }
    listen(port:any=null){
       if(port!=null)
          this.usePort=parseInt(port);
       this.server=this.app.listen(this.usePort);  
    }

    initModules(){
      initSessions(this.app);
      initPostReader(this.app);
      initCors(this.app);
    }
    initUserAuthSystem(baseUrl:string='/user'){
       this.authUserBaseUrl=baseUrl;
       this.app.use(this.authUserBaseUrl,authUserRouter);
    }
    initUserRegisterSystem(baseUrl:string='/userregister'){
        this.registerUserBaseUrl=baseUrl;
        this.app.use(this.registerUserBaseUrl,userRegisterRouter)
    }
    initWSAuthSystem(wsBaseUrl:string='/ws'){
       this.wsAuthBaseUrl=wsBaseUrl;
       this.app.use(this.wsAuthBaseUrl,wsAuthRoter);
    }

    getApp(){
      return this.app;
    }
    getServer(){
      return this.server;
    }
}