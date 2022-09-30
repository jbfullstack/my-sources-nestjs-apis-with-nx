import { Injectable } from "@angular/core";


@Injectable()
export class PersistanceService {
    set(key: string, data: any): void {
        try{
            localStorage.setItem(key, JSON.stringify(data))
        } catch(e){
            console.error(`Error saving to local storage`, e)
        }
    }

    get(key: string): any {
        try{
            const parsed = localStorage.getItem(key);
            if (parsed === null){
                console.error(`Error getting data fromlocal storage: localStorage.getItem(${key}) return null`)
            }else {
                return JSON.parse(parsed)
            }
        } catch(e){
            console.error(`Error retriving data from local storage`, e)
            return null
        }
    }
}