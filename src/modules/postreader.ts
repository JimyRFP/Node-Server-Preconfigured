import  express  from "express";
export function initPostReader(app:any){
    app.use(express.json({limit:'1mb'}));
    app.use(express.urlencoded({limit:'1mb',extended:true}));
}