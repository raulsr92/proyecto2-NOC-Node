import { CronJob } from "cron";

//types

type CronTime = string | Date
type OnTick =  () => void


export class CronService{

    static createJob(cronTime: CronTime, onTick: OnTick):CronJob{

        //instancia de cronjob
            const job = new CronJob(
                cronTime, 
                onTick
            );      
            
            job.start();   

            return job
    }

}
