import { TypeOrmModule } from "@nestjs/typeorm";
import { ConnectionOptions } from "typeorm";


export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        
        async useFactory() {
            return {
                type: 'mongodb',
                host: 'localhost',
                port: 27017,
                database: 'cloris',
                username: 'clorisowner',
                password: 'clorisowner'
            } as ConnectionOptions;
        }
    })
];