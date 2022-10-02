import { Injectable, Logger } from "@nestjs/common";
import { Color } from "./enums/colors.enum";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class LogService {

    debug: boolean
    debugGuards: boolean

    constructor(private readonly config: ConfigService) {
        this.debug = this.config.get('debug') === "true"
        this.debugGuards = this.config.get('debug_guards') === "true"
    }

    public log(msg: any) {
        if (this.debug) {
            Logger.log(msg);
        }
    }

    public warn(msg: any) {
        if (this.debug) {
            Logger.warn(msg);
        }
    }

    public err(msg: any) {
        if (this.debug) {
            Logger.error(msg);
        }
    }

    public logMethod(msg: any) {
        if (this.debug) {
            Logger.log(`> ${msg}`);
        }
    }

    public logTitle(msg: string) {
        if (this.debug) {
            Logger.log("");
            Logger.log(`# ${msg}`);
        }
    }

    public logDefault(msg: string) {
        Logger.log(msg)
    }

    public logc(msg: any, color: Color) {
        if (this.debug) {
            Logger.log(color + msg + Color.Reset);
        }
    }

    public warnc(msg: any, color: Color) {
        if (this.debug) {
            Logger.warn(color + msg + Color.Reset);
        }
    }

    public errc(msg: any, color: Color) {
        if (this.debug) {
            Logger.error(color + msg + Color.Reset);
        }
    }

    public logcMethod(msg: any, color: Color) {
        if (this.debug) {
            Logger.log(`> ${color} ${msg} ${Color.Reset}`);
        }
    }

    public logcTitle(msg: string, color: Color) {
        if (this.debug) {
            Logger.log("");
            Logger.log(`# ${color} ${msg} ${Color.Reset}`);
        }
    }


    public logGuardMethod(name: string, method: string) {
        if (this.debugGuards){
            Logger.log("");
            Logger.log(`${Color.FgCyan}> Guard catched call for ${name}.${method}() ${Color.Reset} `);
        }
    }

    public logGuard(guardName: string, msg: string) {
        if (this.debugGuards){
            Logger.log(`[${guardName}]:${Color.FgCyan} ${msg} ${Color.Reset} `);
        }
    }
}