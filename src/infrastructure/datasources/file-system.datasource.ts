import fs from 'fs';
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource{
    private readonly logPath = 'logs/'
    private readonly allLogsPath    = 'logs/logs-low.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath   = 'logs/logs-high.log'

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        // 1. Si no existe el directorio 'logs/', lo crea
            if (fs.existsSync(this.logPath)) {
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

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}

