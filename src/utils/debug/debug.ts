export function debugMessage(isDebug:boolean,message:string,data:any={}){
    if(!isDebug)
      return;
    let error:any=new Error();
    let stack=error.stack.split("\n");  
    console.log("----DEBUG----"+
                "\nCaller: "+stack[2]+
                "\nMessage: "+message
                );
} 