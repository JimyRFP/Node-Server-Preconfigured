import express from "express";
import { Express } from "express";
import { initSessions } from "./modules/sessions";
import { initPostReader } from "./modules/postreader";
import { initCors } from "./modules/initcors";
import  ENV  from "./settings/env";
import authRouter from "./routes/users";
import { router as wsAuthRoter } from "./routes/wsauth";
import { Server } from "http";
export default class ExpressServer{
    app:Express;
    authBaseUrl:string;
    usePort:number;
    server?:Server;
    wsAuthBaseUrl:string;
    constructor(){
       this.authBaseUrl="";
       this.wsAuthBaseUrl="";
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
    initAuthSystem(baseUrl:string='/user'){
       this.authBaseUrl=baseUrl;
       this.app.use(this.authBaseUrl,authRouter);
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