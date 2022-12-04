#!/usr/bin/env node
const LIB_SEQUELIZE_FILENAME=".sequelizercproj";
const PROJECT_SEQUELIZE_FILENAME=".sequelizerc";
const MIGRATIONS_PATH="migrations";
const LIB_DIR=__dirname;
const PROJECT_DIR=process.cwd();
const CUSTOMENV_FILENAME="spc_envfile.json";
const fs=require("fs");
const path=require("path");
const color=require('colors-cli');
const PRINTWARNING=color.yellow;
const PRINTERROR=color.red;
const PRINTOK=color.green;
(async()=>{
   try{
       console.log(PRINTWARNING("START UPDATING MIGRATIONS FILE"));
       await updateMigrations();
       console.log(PRINTOK("MIGRATIONS FILE UPDATED"))
   }catch(e){
       console.log(PRINTERROR("UPDATE MIGRATIONS FILE ERROR"));
       console.log(e);
   }
   try{
      console.log(PRINTWARNING("START COPY SEQUELIZERC FILE IF NOT EXISTS"));
      await copySequelizeRcFile();
      console.log(PRINTOK("COPY SEQUELIZERCFILE OK"));
   }catch(e){
      console.log(PRINTERROR("COPY SEQUELIZERCFILE ERROR"));
      console.log(e);
   }
   try{
     console.log(PRINTWARNING("COPY CUSTOM ENV FILE IF NOT EXISTS"));
     await copyCustomEnvFile();
     console.log(PRINTOK("COPY CUSTOM ENV FILE OK"));
   }catch(e){
     console.log(PRINTERROR("COPY CUSTOM ENV FILE ERROR"));
     console.log(e);
   }

})()


async function updateMigrations(){
    try{
        await createPath();
        await copyFiles();
    }catch(e){
        throw e;
    }

    async function createPath(){
    try{
        if(fs.existsSync(getProjectMigrationDirPath())){
            return true;
        }else{
            fs.mkdirSync(getProjectMigrationDirPath());
        }
    }catch(e){
        throw e;
    }
    }
    async function copyFiles(){
        const files=fs.readdirSync(getLibMigrationDirPath());
        for(let file of files){
            const projectFileName=path.join(getProjectMigrationDirPath(),file);
            if(fs.existsSync(projectFileName))
               continue;
            const libFileName=path.join(getLibMigrationDirPath(),file);   
            fs.copyFileSync(libFileName,projectFileName);   
        }
    }
    function getProjectMigrationDirPath(){
       return path.join(PROJECT_DIR,MIGRATIONS_PATH);
    }
    function getLibMigrationDirPath(){
       return path.join(LIB_DIR,MIGRATIONS_PATH);
    }
}
async function copySequelizeRcFile(){
   try{
      const proj_seq=path.join(PROJECT_DIR,PROJECT_SEQUELIZE_FILENAME);
      if(fs.existsSync(proj_seq))
         return;
      const lib_seq=path.join(LIB_DIR,LIB_SEQUELIZE_FILENAME);   
      fs.copyFileSync(lib_seq,proj_seq);
   }catch(e){
      throw e;
   }
}
async function copyCustomEnvFile(){
    try{
        const proj_env_custom_filename=path.join(PROJECT_DIR,CUSTOMENV_FILENAME);
        if(fs.existsSync(proj_env_custom_filename))
          return;
        const lib_env_custom_filename=path.join(LIB_DIR,CUSTOMENV_FILENAME);
        fs.copyFileSync(lib_env_custom_filename,proj_env_custom_filename);
    }catch(e){
        throw e;
    }
}
