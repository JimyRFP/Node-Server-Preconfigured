import cors from 'cors';
import ENV  from '../settings/env';

export function initCors(app:any){
    if(ENV.ALLOW_CORS) 
         app.use(cors());
}