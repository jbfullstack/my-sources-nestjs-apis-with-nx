import { Float, Query, Resolver } from "@nestjs/graphql";
import { Color, LogService } from '@jbhive_be/log';

@Resolver()
export class CoreResolver {

    // constructor(private readonly log: LogService) {}

    @Query(() => Float)
    uptime() {
        return process.uptime();
    }
}
