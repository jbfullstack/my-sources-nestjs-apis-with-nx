import { Injectable } from "@nestjs/common"

@Injectable()
export class SourcePrismaIncludes {

    static readonly userIncludes = {
        role: true
    }

    static readonly sourceIncludes = {
        owner: {
            select: {
                id: true,
                pseudo: true,
                email: true,
                role: true
            }
        },
        type: true,
        tags: { 
            include: { 
                tag: true
            } 
        },
    }

    static readonly tagIncludes = {
        author: {            
            select: {
                id: true,
                pseudo: true,
                email: true,
                role: true
            }
        }
    }
}