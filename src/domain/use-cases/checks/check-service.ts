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
        public readonly successCallback: SuccessCallback,
        public readonly erroCallback: ErrorCallback
    ){}
    
    async execute(url: string):Promise<boolean>{
        try {
            const req = await fetch(url)
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`)
            }

            this.successCallback()
            //console.log(`${url} is OK`)
            return true

        } catch (error) {            
            //console.log(`${error}`)
            this.erroCallback(`${error}`);
            return false
        }
    }
}

