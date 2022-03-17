const ENV=require("./../env").default;
module.exports={
    dialect:ENV.DATABASE.dialect,
    host:ENV.DATABASE.host,
    database:ENV.DATABASE.database,
    username:ENV.DATABASE.username,
    password:ENV.DATABASE.password,
    define:{
        underscored:true,
        timestamps:true,
    },
    logging:false,
    
};
