import session from "express-session";
import  ENV  from "../settings/env";
export function initSessions(app:any){
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: ENV.NODE_ENV=='development'?false:true,
                  httpOnly:true,               
                },
    }));

}