import fs from 'fs';
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource{
    private readonly logPath = 'logs/'
    private readonly allLogsPath    = 'logs/logs-all.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath   = 'logs/logs-high.log'

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        // 1. Si no existe el directorio 'logs/', lo crea
            if (!fs.existsSync(this.logPath)) {
                fs.mkdirSync(this.logPath)
            }
        // 2. Si no existen los archivos de logs, los crea vacíos

            [
                this.allLogsPath,
                this.mediumLogsPath,
                this.highLogsPath
            ].forEach((path)=>{
                if (fs.existsSync(path)) return;
    
                fs.writeFileSync(path,'')  
            })
    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n `;

        fs.appendFileSync(this.allLogsPath, logAsJson)

        if (newLog.level=== LogSeverityLevel.low) return; //retornamos, porque los low solo se guardan en archivo all logs

        if (newLog.level=== LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPath,logAsJson)  // los de severidad "medium" si se guardan en 2 archivos: all y propio
        }

        if (newLog.level=== LogSeverityLevel.high){

            fs.appendFileSync(this.highLogsPath,logAsJson) // los de severidad "medium" si se guardan en 2 archivos: all y propio
        
        }

    }

        //método privado a utilizar en getLogs 

        private getLogsFromFile = (path:string):LogEntity[]=>{

            const content = fs.readFileSync(path, "utf-8")

            const stringLogs = content.split("\n")

            const logs = stringLogs.map((log)=>{
            return LogEntity.fromJson(log)
            })

            return logs

        }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogSeverityLevel.low:
                
                return this.getLogsFromFile(this.allLogsPath);

            case LogSeverityLevel.medium:
                
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`${severityLevel} not implemented`)

        }
    }

}

