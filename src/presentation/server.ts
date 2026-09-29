import { CheckService } from "../domain/use-cases/checks/check-service"
import { CronService } from "./cron/cron-service"

 
export class Server{

    public static start(){
        console.log('Server started....')

        //Llamar a paquete CRON

            CronService.createJob(
                '*/5 * * * * *',
                ()=>{
                    
                    new CheckService().execute('https://www.google.com/')
                    //new CheckService().execute('http://localhost:3000/posts')

                }
            )

    }
}

