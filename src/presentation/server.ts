import { CronService } from "./cron/cron-service"

 
export class Server{

    public static start(){
        console.log('Server started....')

        //Llamar a paquete CRON

            CronService.createJob(
                '*/5 * * * * *',
                ()=>{
                    const date = new Date();
                    console.log('Este mensaje aparece cada 5 segundos', date)
                }
            )

    }
}

