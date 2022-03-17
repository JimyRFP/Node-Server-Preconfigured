import  express  from "express";
export function initPostReader(app:any){
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
}