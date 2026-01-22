import  express  from "express";
export function initPostReader(app:any){
    app.use(express.json({limit:'3mb'}));
    app.use(express.urlencoded({limit:'3mb',extended:true}));
}