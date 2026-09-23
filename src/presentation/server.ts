import { CronJob } from "cron"

 
export class Server{

    public static start(){
        console.log('Server started....')

        //instancia de cronjob

            const job = new CronJob(
                '*/3 * * * * *', // cronTime
                () => {

                    const date = new Date();

                    console.log('Este mensaje aparece cada 2 segundos', date);
                },
            );      
            
            job.start();
    }
}

