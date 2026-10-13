
export enum LogSeverityLevel  {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity{

    public level:LogSeverityLevel; //Enum
    public message: string;
    public createdAt:Date

    constructor(level:LogSeverityLevel, message:string){

        this.level = level,
        this.message = message,
        this.createdAt = new Date()// Valor asignado automáticamente

    }

    static fromJson = (json:string):LogEntity=>{

       const {level, message, createdAt} = JSON.parse(json)

       if(!message)throw new Error('Message is required')
       if(!level)throw new Error('Level is required')

       const log = new LogEntity(level,message)

       //establecer la fecha

       log.createdAt=new Date(createdAt)

       return log
    }

}