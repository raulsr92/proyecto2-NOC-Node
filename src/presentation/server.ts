import { CheckService } from "../domain/use-cases/checks/check-service"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()  //Esto es lo que se va a poder cambiar si se cambia el origen de datos por ejem a PostgreSql
    // new PostgreSQLLogDataSource()

)

export class Server{
    public static start(){
        console.log('Server started....')

        //Llamar a paquete CRON
            CronService.createJob(
                '*/5 * * * * *',
                ()=>{
                    
                    const url = 'http://google.com';
                    new CheckService(
                        fileSystemLogRepository,

                        ()=>console.log(`${url} is OK`),

                        (error)=> console.log(error)
                    ).execute(url)
                    //new CheckService().execute('http://localhost:3000/posts')
                }
            )
    }
}

