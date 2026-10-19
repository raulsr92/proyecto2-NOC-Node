import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Interfaces 

interface CheckServiceUseCase{
    execute(url:string):Promise<boolean>
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Types

type SuccessCallback = () => void
type ErrorCallback = (error: string)=> void

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Clase de caso de uso 

export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository:LogRepository,
        public readonly successCallback: SuccessCallback,
        public readonly erroCallback: ErrorCallback
    ){}
    
    async execute(url: string):Promise<boolean>{
        try {
            const req = await fetch(url)
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`)
            }

            //Grabar log (clase 127)
                const log = new LogEntity(LogSeverityLevel.low, `Service ${url} working`)
                this.logRepository.saveLog(log)    

            this.successCallback()
            //console.log(`${url} is OK`)
            return true

        } catch (error) {     
            //En caso de error al grabar log (clase 127)
                const errorMessage = `${url} is not Ok. ${error}`
                const log = new LogEntity(LogSeverityLevel.high, errorMessage)
                this.logRepository.saveLog(log)
            
            this.erroCallback(errorMessage);
            return false
        }
    }
}

