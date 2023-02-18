/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('/getData'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const config_be_1 = __webpack_require__("./libs/utils/config/backend/src/index.ts");
const user_be_1 = __webpack_require__("./libs/user/backend/src/index.ts");
const auth_be_1 = __webpack_require__("./libs/security/auth/backend/src/index.ts");
const source_be_1 = __webpack_require__("./libs/source/backend/src/index.ts");
const admin_be_1 = __webpack_require__("./libs/admin/backend/src/index.ts");
const crypt_1 = __webpack_require__("./libs/security/crypt/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const app_controller_1 = __webpack_require__("./apps/api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [config_be_1.CoreModule, user_be_1.UserModule, auth_be_1.AuthModule, source_be_1.SourceModule, admin_be_1.AdminModule, crypt_1.CryptModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to api!' };
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./libs/admin/backend/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/admin/backend/src/lib/admin.module.ts"), exports);


/***/ }),

/***/ "./libs/admin/backend/src/lib/admin.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const user_be_1 = __webpack_require__("./libs/user/backend/src/index.ts");
const log_be_1 = __webpack_require__("./libs/utils/log/backend/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const admin_resolver_1 = __webpack_require__("./libs/admin/backend/src/lib/admin.resolver.ts");
const admin_service_1 = __webpack_require__("./libs/admin/backend/src/lib/admin.service.ts");
let AdminModule = class AdminModule {
};
AdminModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [user_be_1.UserModule, log_be_1.LogModule],
        controllers: [],
        providers: [admin_resolver_1.AdminResolver, admin_service_1.AdminService],
        exports: [],
    })
], AdminModule);
exports.AdminModule = AdminModule;


/***/ }),

/***/ "./libs/admin/backend/src/lib/admin.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const common_1 = __webpack_require__("@nestjs/common");
const auth_be_1 = __webpack_require__("./libs/security/auth/backend/src/index.ts");
const types_be_1 = __webpack_require__("./libs/utils/types/backend/src/index.ts");
const src_1 = __webpack_require__("./libs/utils/log/backend/src/index.ts");
const admin_service_1 = __webpack_require__("./libs/admin/backend/src/lib/admin.service.ts");
let AdminResolver = class AdminResolver {
    constructor(service, log) {
        this.service = service;
        this.log = log;
    }
    updateRoleUser(user, userId, roleId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.logMethod(`Resolver.updateRoleUser(${userId}, ${roleId})`);
            return this.service.updateRoleUser(user.id, userId, roleId);
        });
    }
    loadAllDesactivatedUsers(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.logMethod(`Resolver.loadAllDesactivatedUsers(${user.id})`);
            return this.service.loadAllDesactivatedUsers(user.id);
        });
    }
    loadAllActivatedUsers(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.logMethod(`Resolver.loadAllActivatedUsers(${user.id})`);
            return this.service.loadAllActivatedUsers(user.id);
        });
    }
    updateUser(user, userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.logMethod(`Resolver.updateUser(${userId}`);
            return this.service.updateUser(user.id, userId, input);
        });
    }
    updateAdminUser(user, userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.logMethod(`Resolver.updateAdminUser(${userId}`);
            return this.service.updateAdminUser(user.id, userId, input);
        });
    }
    updateMyself(user, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.logMethod(`Resolver.updateMyself(${user.id}`);
            return this.service.updateMyself(user.id, input);
        });
    }
    deleteUser(user, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.logMethod(`Resolver.deleteUser(${userId}`);
            return this.service.deleteUser(user.id, userId);
        });
    }
};
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Astek, types_be_1.Role.Admin, types_be_1.Role.Lord),
    (0, graphql_1.Mutation)(() => auth_be_1.User, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('userId')),
    tslib_1.__param(2, (0, graphql_1.Args)('roleId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _c : Object, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminResolver.prototype, "updateRoleUser", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Astek, types_be_1.Role.Admin, types_be_1.Role.Lord),
    (0, graphql_1.Mutation)(() => [auth_be_1.User], { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminResolver.prototype, "loadAllDesactivatedUsers", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Astek, types_be_1.Role.Admin, types_be_1.Role.Lord),
    (0, graphql_1.Mutation)(() => [auth_be_1.User], { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminResolver.prototype, "loadAllActivatedUsers", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Astek, types_be_1.Role.Admin, types_be_1.Role.Lord),
    (0, graphql_1.Mutation)(() => auth_be_1.User, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('userId')),
    tslib_1.__param(2, (0, graphql_1.Args)('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _f : Object, Number, typeof (_g = typeof types_be_1.UpdateUserInput !== "undefined" && types_be_1.UpdateUserInput) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminResolver.prototype, "updateUser", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Astek, types_be_1.Role.Admin, types_be_1.Role.Lord),
    (0, graphql_1.Mutation)(() => auth_be_1.User, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('userId')),
    tslib_1.__param(2, (0, graphql_1.Args)('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _h : Object, Number, typeof (_j = typeof types_be_1.AdminUpdateUserInput !== "undefined" && types_be_1.AdminUpdateUserInput) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminResolver.prototype, "updateAdminUser", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => auth_be_1.User, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _k : Object, typeof (_l = typeof types_be_1.UpdateUserInput !== "undefined" && types_be_1.UpdateUserInput) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminResolver.prototype, "updateMyself", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Astek, types_be_1.Role.Admin),
    (0, graphql_1.Mutation)(() => Boolean, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _m : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminResolver.prototype, "deleteUser", null);
AdminResolver = tslib_1.__decorate([
    (0, common_1.UseGuards)(auth_be_1.RolesGuard),
    (0, graphql_1.Resolver)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _a : Object, typeof (_b = typeof src_1.LogService !== "undefined" && src_1.LogService) === "function" ? _b : Object])
], AdminResolver);
exports.AdminResolver = AdminResolver;


/***/ }),

/***/ "./libs/admin/backend/src/lib/admin.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminService = void 0;
const tslib_1 = __webpack_require__("tslib");
const user_be_1 = __webpack_require__("./libs/user/backend/src/index.ts");
const log_be_1 = __webpack_require__("./libs/utils/log/backend/src/index.ts");
const types_be_1 = __webpack_require__("./libs/utils/types/backend/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const apollo_server_express_1 = __webpack_require__("apollo-server-express");
const client_1 = __webpack_require__("@prisma/client");
let AdminService = class AdminService extends client_1.PrismaClient {
    constructor(data, log) {
        super();
        this.data = data;
        this.log = log;
    }
    onModuleInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.$connect();
        });
    }
    onModuleDestroy() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.$disconnect();
        });
    }
    updateRoleUser(loggedUserId, userId, roleId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Find user
            const userFound = yield this.data.findUser(userId);
            if (!userFound) {
                throw new common_1.NotFoundException(`Can't update Role of user ${userId}, user not found`);
            }
            if (userFound.roleId === types_be_1.Role.Astek) {
                throw new apollo_server_express_1.ForbiddenError(`User ${userId} is granted Astek, no one can update its role`);
            }
            if (roleId === types_be_1.Role.Astek) {
                throw new apollo_server_express_1.ForbiddenError(`User ${userId} can't be granted Astek, only one allowed in the application`);
            }
            // find looged user
            const loggedUserFound = yield this.data.findUser(loggedUserId);
            if (!loggedUserFound) {
                throw new common_1.NotFoundException(`User ${loggedUserId} not allowed to perform update role operation, user not found`);
            }
            if (loggedUserFound.roleId < userFound.roleId) {
                throw new common_1.NotFoundException(`User ${loggedUserId} not allowed to perform update role operation on user ${userId}, logged user has less privileges`);
            }
            if (loggedUserFound.roleId < roleId) {
                throw new common_1.NotFoundException(`User ${loggedUserId} not allowed to grant user ${userId} to a higher level of privileges than himself`);
            }
            return this.data.updateRoleUser(userId, roleId);
        });
    }
    updateUser(loggedUserId, userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userFound = yield this.data.findUser(userId);
            if (!userFound) {
                throw new common_1.NotFoundException(`Can't update User ${userId}, user not found`);
            }
            const loggedUserFound = yield this.data.findUser(loggedUserId);
            if (!loggedUserFound) {
                throw new common_1.NotFoundException(`User ${loggedUserId} not allowed to perform update role operation, user not found`);
            }
            if (loggedUserFound.roleId < userFound.roleId) {
                throw new common_1.NotFoundException(`User ${loggedUserId} not allowed to perform update operation on user ${userId}, logged user has less privileges`);
            }
            common_1.Logger.log('VOILLLAAAAA');
            return this.data.updateUser(userId, input);
        });
    }
    updateAdminUser(loggedUserId, userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userFound = yield this.data.findUser(userId);
            if (!userFound) {
                throw new common_1.NotFoundException(`Can't update User ${userId}, user not found`);
            }
            const loggedUserFound = yield this.data.findUser(loggedUserId);
            if (!loggedUserFound) {
                throw new common_1.NotFoundException(`User ${loggedUserId} not allowed to perform update role operation, user not found`);
            }
            if (loggedUserFound.roleId < userFound.roleId) {
                throw new common_1.NotFoundException(`User ${loggedUserId} not allowed to perform update operation on user ${userId}, logged user has less privileges`);
            }
            common_1.Logger.log('VOILLLAAAAA');
            return this.data.updateAdminUser(userId, input);
        });
    }
    deleteUser(loggedUserId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userFound = yield this.data.findUser(loggedUserId);
            const loggedFound = yield this.data.findUser(userId);
            if (!userFound || !loggedFound) {
                throw new common_1.NotFoundException(`User ${loggedUserId} can't delete user ${userFound}, at least one does not exists`);
            }
            if (userFound.roleId <= loggedFound.roleId) {
                throw new common_1.MethodNotAllowedException(`User ${loggedUserId} not allowed to delete user ${userFound}`);
            }
            return yield this.data.deleteUser(userId);
        });
    }
    updateMyself(id, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userFound = yield this.data.findUser(id);
            if (!userFound) {
                throw new common_1.NotFoundException(`Can't update User ${id}, user not found`);
            }
            if (userFound.pseudo !== input.pseudo) {
                const userPseudoFound = yield this.data.findUserByPseudo(input.pseudo);
                if (userPseudoFound) {
                    throw new common_1.NotFoundException(`User with pseudo ${input.pseudo} already exist`);
                }
            }
            if (userFound.email !== input.email) {
                const userEmailFound = yield this.data.findUserByEmail(input.email);
                if (userEmailFound) {
                    throw new common_1.NotFoundException(`User with email ${input.email} already exist`);
                }
            }
            if (userFound.nickname !== input.nickname) {
                const userNicknameFound = yield this.data.findUserByNickname(input.nickname);
                if (userNicknameFound) {
                    throw new common_1.NotFoundException(`User with nickname ${input.nickname} already exist`);
                }
            }
            return this.data.updateUser(id, input);
        });
    }
    loadAllDesactivatedUsers(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loggedFound = yield this.data.findUserById(id);
            if (!loggedFound) {
                throw new common_1.NotFoundException(`Can't load all deactivated users, User ${id} not found`);
            }
            const found = yield this.user.findMany({
                where: {
                    activated: false,
                    hidden: false,
                    roleId: {
                        lt: loggedFound.role.id
                    }
                },
                include: types_be_1.PrismaIncludes.userIncludes
            });
            common_1.Logger.error('loadAllDesactivatedUsers - found: ', found);
            return found;
        });
    }
    loadAllActivatedUsers(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loggedFound = yield this.data.findUserById(id);
            if (!loggedFound) {
                throw new common_1.NotFoundException(`Can't load all activated users, User ${id} not found`);
            }
            const found = yield this.user.findMany({
                where: {
                    activated: true,
                    hidden: false,
                    roleId: {
                        lt: loggedFound.role.id
                    }
                },
                include: types_be_1.PrismaIncludes.userIncludes
            });
            common_1.Logger.error('loadAllActivatedUsers - found: ', found);
            return found;
        });
    }
};
AdminService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_be_1.UserService !== "undefined" && user_be_1.UserService) === "function" ? _a : Object, typeof (_b = typeof log_be_1.LogService !== "undefined" && log_be_1.LogService) === "function" ? _b : Object])
], AdminService);
exports.AdminService = AdminService;


/***/ }),

/***/ "./libs/security/auth/backend/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/security/auth/backend/src/lib/auth.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/security/auth/backend/src/lib/guards/gql-auth.guards.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/security/auth/backend/src/lib/guards/roles.guards.ts"), exports);
// export * from './lib/enums/role.enum'
tslib_1.__exportStar(__webpack_require__("./libs/security/auth/backend/src/lib/decorators/ctx-user.decorator.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/security/auth/backend/src/lib/decorators/roles.decorator.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/security/auth/backend/src/lib/decorators/public.decorator.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/security/auth/backend/src/lib/models/user.ts"), exports);


/***/ }),

/***/ "./libs/security/auth/backend/src/lib/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_resolver_1 = __webpack_require__("./libs/security/auth/backend/src/lib/auth.resolver.ts");
const auth_service_1 = __webpack_require__("./libs/security/auth/backend/src/lib/auth.service.ts");
const user_be_1 = __webpack_require__("./libs/user/backend/src/index.ts");
const jwt_strategy_1 = __webpack_require__("./libs/security/auth/backend/src/lib/strategies/jwt.strategy.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const gql_auth_guards_1 = __webpack_require__("./libs/security/auth/backend/src/lib/guards/gql-auth.guards.ts");
const log_be_1 = __webpack_require__("./libs/utils/log/backend/src/index.ts");
const config_1 = __webpack_require__("@nestjs/config");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            log_be_1.LogModule,
            user_be_1.UserModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        secret: configService.get('jwt_secret'),
                        signOptions: { expiresIn: +configService.get('jwt_expire') },
                    });
                }),
                inject: [config_1.ConfigService],
            })
        ],
        controllers: [],
        providers: [auth_resolver_1.AuthResolver, auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, gql_auth_guards_1.GqlAuthGuard],
        exports: [],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./libs/security/auth/backend/src/lib/auth.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const auth_service_1 = __webpack_require__("./libs/security/auth/backend/src/lib/auth.service.ts");
const auth_login_input_1 = __webpack_require__("./libs/security/auth/backend/src/lib/dto/auth-login.input.ts");
const auth_register_input_1 = __webpack_require__("./libs/security/auth/backend/src/lib/dto/auth-register.input.ts");
const user_1 = __webpack_require__("./libs/security/auth/backend/src/lib/models/user.ts");
// import { UserToken } from "./models/user-token";
let AuthResolver = class AuthResolver {
    constructor(service) {
        this.service = service;
    }
    login(input) {
        return this.service.login(input);
    }
    register(input) {
        return this.service.register(input);
    }
};
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => user_1.User),
    tslib_1.__param(0, (0, graphql_1.Args)({ name: 'input', type: () => auth_login_input_1.AuthLoginInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof auth_login_input_1.AuthLoginInput !== "undefined" && auth_login_input_1.AuthLoginInput) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthResolver.prototype, "login", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => user_1.User),
    tslib_1.__param(0, (0, graphql_1.Args)({ name: 'input', type: () => auth_register_input_1.AuthRegisterInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof auth_register_input_1.AuthRegisterInput !== "undefined" && auth_register_input_1.AuthRegisterInput) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthResolver.prototype, "register", null);
AuthResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthResolver);
exports.AuthResolver = AuthResolver;


/***/ }),

/***/ "./libs/security/auth/backend/src/lib/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const user_be_1 = __webpack_require__("./libs/user/backend/src/index.ts");
const src_1 = __webpack_require__("./libs/utils/log/backend/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const crypt_1 = __webpack_require__("./libs/security/crypt/src/index.ts");
// import { Role } from "./enums/role.enum";
const types_be_1 = __webpack_require__("./libs/utils/types/backend/src/index.ts");
let AuthService = class AuthService {
    constructor(data, jwt, log, config) {
        this.data = data;
        this.jwt = jwt;
        this.log = log;
        this.config = config;
    }
    login(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`login:`, input);
            const found = yield this.data.findUserByNickname(input.nickname.toLowerCase());
            if (!found) {
                this.log.err(`User with nickname ${input.nickname} does not exists`);
                const httpErrorResponse = { errors: { credentials: [`User with nickname ${input.nickname} does not exists in the database`], } };
                throw new common_1.BadRequestException(JSON.stringify(httpErrorResponse));
            }
            else {
                common_1.Logger.debug(`user by nickname found:`, found);
            }
            if (!found.activated) {
                this.log.err(`User with nickname ${input.nickname} not activated`);
                const httpErrorResponse = { errors: { credentials: [`User with nickname ${input.nickname} is not activated`], } };
                throw new common_1.BadRequestException(JSON.stringify(httpErrorResponse));
            }
            const passwordValid = yield crypt_1.CryptHelper.validate(input.password, found.password);
            if (!passwordValid) {
                this.log.err(`Invalid password`);
                const httpErrorResponse = { errors: { credentials: [`Invalid password`], } };
                throw new common_1.BadRequestException(JSON.stringify(httpErrorResponse));
            }
            else {
                common_1.Logger.debug(`passwordValid:`, passwordValid);
            }
            const response = Object.assign(Object.assign({}, found), { token: this.signToken(found.id) });
            common_1.Logger.debug(`response: ${JSON.stringify(response)}`);
            return response;
        });
    }
    register(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.checkRegisterFieldsOk(input);
            yield this.manageNoDuplicatedEntryErros(input);
            const password = yield crypt_1.CryptHelper.hash(input.password);
            const created = yield this.data.createUser({ email: input.email, nickname: input.nickname, password: password, pseudo: input.pseudo, roleId: 0 });
            const response = Object.assign(Object.assign({}, created), { role: {
                    id: 0,
                    name: 'user'
                } });
            common_1.Logger.log(`response:`, response);
            return response;
        });
    }
    checkRegisterFieldsOk(input) {
        let httpErrorResponse = {
            errors: {
                email: [],
                nickname: [],
                pseudo: [],
                password: [],
            }
        };
        let isEmailValids = true;
        let isNicknameValids = true;
        let isPseudoValids = true;
        let isPasswordValids = true;
        if (input.email.trim().length === 0 || input.email.length < 10) {
            this.manageErrorMessage(httpErrorResponse.errors.email, 'email too short (min size 10)', `Cannot register, the email must be 10 characters long at least`);
            if (isEmailValids) {
                isEmailValids = false;
            }
        }
        if (input.nickname.includes(' ')) {
            this.manageErrorMessage(httpErrorResponse.errors.nickname, 'nickname contains space', `Cannot register, the nickname must have no space character`);
            if (isNicknameValids) {
                isNicknameValids = false;
            }
        }
        if (input.nickname.trim().length === 0 || input.nickname.length < 3) {
            this.manageErrorMessage(httpErrorResponse.errors.nickname, 'nickname empty or too short (min size 3)', `Cannot register, the nickname must be 3 characters long at least`);
            if (isNicknameValids) {
                isNicknameValids = false;
            }
        }
        if (input.pseudo.includes(' ')) {
            this.manageErrorMessage(httpErrorResponse.errors.pseudo, 'pseudo contains space', `Cannot register, the pseudo must have no space character`);
            if (isPseudoValids) {
                isPseudoValids = false;
            }
        }
        if (input.pseudo.trim().length === 0 || input.pseudo.length < 3) {
            this.manageErrorMessage(httpErrorResponse.errors.pseudo, 'pseudo empty or too short (min size 3)', `Cannot register, the pseudo must be 3 characters long at least`);
            if (isPseudoValids) {
                isPseudoValids = false;
            }
        }
        if (input.password.trim().length === 0 || input.password.length < 4) {
            this.manageErrorMessage(httpErrorResponse.errors.password, 'password empty or too short (min size 4)', `Cannot register, the password must be 4 characters long at least`);
            if (isPasswordValids) {
                isPasswordValids = false;
            }
        }
        if (!isEmailValids || !isPasswordValids || !isPasswordValids || !isNicknameValids) {
            if (isEmailValids) {
                delete httpErrorResponse.errors.email;
            }
            if (isPseudoValids) {
                delete httpErrorResponse.errors.pseudo;
            }
            if (isPasswordValids) {
                delete httpErrorResponse.errors.password;
            }
            if (isNicknameValids) {
                delete httpErrorResponse.errors.nickname;
            }
            throw new common_1.BadRequestException(JSON.stringify(httpErrorResponse));
        }
    }
    manageErrorMessage(listToPush, message, logErrMessage) {
        listToPush.push(message);
        this.log.err(logErrMessage);
    }
    manageNoDuplicatedEntryErros(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let httpErrorResponse = {
                errors: {
                    email: [],
                    pseudo: [],
                    nickname: [],
                }
            };
            let isEmailValids = true;
            let isPseudoValids = true;
            let isNicknameValids = true;
            const foundByEmail = yield this.data.findUserByEmail(input.email.toLowerCase());
            if (foundByEmail) {
                this.manageErrorMessage(httpErrorResponse.errors.email, 'email already exists', `Cannot register with email ${input.email}`);
                this.log.err(`Cannot register with email ${input.email},email already in db`);
                if (isEmailValids) {
                    isEmailValids = false;
                }
            }
            const foundByPseudo = yield this.data.findUserByPseudo(input.pseudo.toLowerCase());
            if (foundByPseudo) {
                this.manageErrorMessage(httpErrorResponse.errors.pseudo, 'pseudo already exists', `Cannot register with pseudo ${input.email},pseudo already in db`);
                if (isPseudoValids) {
                    isPseudoValids = false;
                }
            }
            const foundByNickname = yield this.data.findUserByNickname(input.nickname.toLowerCase());
            if (foundByNickname) {
                this.manageErrorMessage(httpErrorResponse.errors.nickname, 'nickname already exists', `Cannot register with nickname ${input.nickname},pseudo already in db`);
                if (isNicknameValids) {
                    isNicknameValids = false;
                }
            }
            if (!isEmailValids || !isPseudoValids || !isNicknameValids) {
                if (isEmailValids) {
                    delete httpErrorResponse.errors.email;
                }
                if (isPseudoValids) {
                    delete httpErrorResponse.errors.pseudo;
                }
                if (isNicknameValids) {
                    delete httpErrorResponse.errors.nickname;
                }
                throw new common_1.BadRequestException(JSON.stringify(httpErrorResponse));
            }
        });
    }
    signToken(id) {
        const payload = { userId: id, roleId: types_be_1.Role.User };
        return this.jwt.sign(payload);
    }
    validateUser(userId) {
        return this.data.findUserById(userId);
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_be_1.UserService !== "undefined" && user_be_1.UserService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof src_1.LogService !== "undefined" && src_1.LogService) === "function" ? _c : Object, typeof (_d = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _d : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./libs/security/auth/backend/src/lib/decorators/ctx-user.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CtxUser = void 0;
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
exports.CtxUser = (0, common_1.createParamDecorator)((data, ctx) => graphql_1.GqlExecutionContext.create(ctx).getContext().req.user);


/***/ }),

/***/ "./libs/security/auth/backend/src/lib/decorators/public.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__("@nestjs/common");
/**
 * Decorator allowing to set a endpoint of a controller public
 */
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),

/***/ "./libs/security/auth/backend/src/lib/decorators/roles.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__("@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),

/***/ "./libs/security/auth/backend/src/lib/dto/auth-login.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthLoginInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let AuthLoginInput = class AuthLoginInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], AuthLoginInput.prototype, "nickname", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], AuthLoginInput.prototype, "password", void 0);
AuthLoginInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AuthLoginInput);
exports.AuthLoginInput = AuthLoginInput;


/***/ }),

/***/ "./libs/security/auth/backend/src/lib/dto/auth-register.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRegisterInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let AuthRegisterInput = class AuthRegisterInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], AuthRegisterInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], AuthRegisterInput.prototype, "pseudo", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], AuthRegisterInput.prototype, "nickname", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], AuthRegisterInput.prototype, "password", void 0);
AuthRegisterInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AuthRegisterInput);
exports.AuthRegisterInput = AuthRegisterInput;


/***/ }),

/***/ "./libs/security/auth/backend/src/lib/guards/gql-auth.guards.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GqlAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const src_1 = __webpack_require__("./libs/utils/log/backend/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const passport_1 = __webpack_require__("@nestjs/passport");
const public_decorator_1 = __webpack_require__("./libs/security/auth/backend/src/lib/decorators/public.decorator.ts");
const roles_decorator_1 = __webpack_require__("./libs/security/auth/backend/src/lib/decorators/roles.decorator.ts");
let GqlAuthGuard = class GqlAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, log) {
        super();
        this.reflector = reflector;
        this.log = log;
    }
    /**
     * Transform the 'GraphQl context' into a 'standard HTTP request'
     */
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
    canActivate(context) {
        this.log.logGuardMethod(context.getClass().name, context.getHandler().name);
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            this.log.logGuard(`GqlAuthGuard`, `GqlAuthGuard: public route, request allowed`);
            return true;
        }
        else {
            this.log.logGuard(`GqlAuthGuard`, `GqlAuthGuard: user logged`);
        }
        this.log.logGuard(`XXXXX`, `super.canActivate from GplAuthGuard`);
        return super.canActivate(context);
    }
    getRoles(context) {
        const roles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        return roles;
    }
};
GqlAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof src_1.LogService !== "undefined" && src_1.LogService) === "function" ? _b : Object])
], GqlAuthGuard);
exports.GqlAuthGuard = GqlAuthGuard;


/***/ }),

/***/ "./libs/security/auth/backend/src/lib/guards/roles.guards.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const src_1 = __webpack_require__("./libs/utils/log/backend/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const gql_auth_guards_1 = __webpack_require__("./libs/security/auth/backend/src/lib/guards/gql-auth.guards.ts");
let RolesGuard = class RolesGuard extends gql_auth_guards_1.GqlAuthGuard {
    constructor(reflector, log) {
        super(reflector, log);
    }
    canActivate(context) {
        const _super = Object.create(null, {
            canActivate: { get: () => super.canActivate },
            getRoles: { get: () => super.getRoles }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // this.log.logGuardMethod(context.getClass().name, context.getHandler().name)
            yield _super.canActivate.call(this, context);
            const roles = _super.getRoles.call(this, context);
            if (!roles) {
                this.log.logGuard(`RolesGuard`, `no role restriction for this endpoint, request allowed`);
                return true;
            }
            const user = graphql_1.GqlExecutionContext.create(context).getContext().req.user;
            if (!roles.includes(user.roleId)) {
                this.log.logGuard(`RolesGuard`, `user #${user.id} ${user.email} with role ${user.roleId} is not allowed`);
                return false;
            }
            this.log.logGuard(`RolesGuard`, `user #${user.id} ${user.email} with role ${user.roleId} allowed to perform the request`);
            return true;
        });
    }
};
RolesGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof src_1.LogService !== "undefined" && src_1.LogService) === "function" ? _b : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),

/***/ "./libs/security/auth/backend/src/lib/models/role.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let Role = class Role {
};
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Role.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "name", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "description", void 0);
Role = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Role);
exports.Role = Role;


/***/ }),

/***/ "./libs/security/auth/backend/src/lib/models/user.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const role_1 = __webpack_require__("./libs/security/auth/backend/src/lib/models/role.ts");
let User = class User {
};
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "pseudo", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "nickname", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => role_1.Role, { nullable: true }),
    tslib_1.__metadata("design:type", typeof (_a = typeof role_1.Role !== "undefined" && role_1.Role) === "function" ? _a : Object)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "token", void 0);
User = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], User);
exports.User = User;


/***/ }),

/***/ "./libs/security/auth/backend/src/lib/strategies/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const auth_service_1 = __webpack_require__("./libs/security/auth/backend/src/lib/auth.service.ts");
const config_1 = __webpack_require__("@nestjs/config");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(service, config) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('jwt_secret'),
            ignoreExpiration: false,
        });
        this.service = service;
        this.config = config;
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log("AIGHTTT !!! payload: ", payload);
            const user = yield this.service.validateUser(payload.userId);
            if (!user || !(user === null || user === void 0 ? void 0 : user.activated)) {
                throw new common_1.UnauthorizedException('Not allowed inside');
            }
            // return payload
            return user;
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./libs/security/crypt/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/security/crypt/src/lib/crypt.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/security/crypt/src/lib/crypt.helper.ts"), exports);


/***/ }),

/***/ "./libs/security/crypt/src/lib/crypt.helper.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CryptHelper = void 0;
const bcryptjs_1 = __webpack_require__("bcryptjs");
class CryptHelper {
    static validate(password, hashedPassword) {
        return (0, bcryptjs_1.compare)(password, hashedPassword);
    }
    static hash(password) {
        return (0, bcryptjs_1.hash)(password, 10);
    }
}
exports.CryptHelper = CryptHelper;


/***/ }),

/***/ "./libs/security/crypt/src/lib/crypt.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CryptModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let CryptModule = class CryptModule {
};
CryptModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], CryptModule);
exports.CryptModule = CryptModule;


/***/ }),

/***/ "./libs/source/backend/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/source/backend/src/lib/source.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/source/backend/src/lib/dto/create-source-input.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/source/backend/src/lib/dto/create-source-type-input.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/source/backend/src/lib/dto/create-tag-input.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/source/backend/src/lib/dto/update-source-input.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/source/backend/src/lib/dto/update-source-type-input.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/source/backend/src/lib/dto/update-tag-input.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/source/backend/src/lib/models/source.ts"), exports);


/***/ }),

/***/ "./libs/source/backend/src/lib/dto/create-source-input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSourceInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CreateSourceInput = class CreateSourceInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], CreateSourceInput.prototype, "title", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], CreateSourceInput.prototype, "public", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], CreateSourceInput.prototype, "url", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], CreateSourceInput.prototype, "content", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], CreateSourceInput.prototype, "description", void 0);
CreateSourceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreateSourceInput);
exports.CreateSourceInput = CreateSourceInput;


/***/ }),

/***/ "./libs/source/backend/src/lib/dto/create-source-type-input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSourceTypeInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CreateSourceTypeInput = class CreateSourceTypeInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], CreateSourceTypeInput.prototype, "title", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], CreateSourceTypeInput.prototype, "description", void 0);
CreateSourceTypeInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreateSourceTypeInput);
exports.CreateSourceTypeInput = CreateSourceTypeInput;


/***/ }),

/***/ "./libs/source/backend/src/lib/dto/create-tag-input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTagInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CreateTagInput = class CreateTagInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], CreateTagInput.prototype, "title", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], CreateTagInput.prototype, "description", void 0);
CreateTagInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreateTagInput);
exports.CreateTagInput = CreateTagInput;


/***/ }),

/***/ "./libs/source/backend/src/lib/dto/update-source-input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSourceInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let UpdateSourceInput = class UpdateSourceInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UpdateSourceInput.prototype, "title", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], UpdateSourceInput.prototype, "public", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UpdateSourceInput.prototype, "url", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UpdateSourceInput.prototype, "content", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UpdateSourceInput.prototype, "description", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], UpdateSourceInput.prototype, "typeId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(type => [Number], { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], UpdateSourceInput.prototype, "tagIds", void 0);
UpdateSourceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdateSourceInput);
exports.UpdateSourceInput = UpdateSourceInput;


/***/ }),

/***/ "./libs/source/backend/src/lib/dto/update-source-type-input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSourceTypeInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let UpdateSourceTypeInput = class UpdateSourceTypeInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UpdateSourceTypeInput.prototype, "title", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UpdateSourceTypeInput.prototype, "description", void 0);
UpdateSourceTypeInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdateSourceTypeInput);
exports.UpdateSourceTypeInput = UpdateSourceTypeInput;


/***/ }),

/***/ "./libs/source/backend/src/lib/dto/update-tag-input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTagInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let UpdateTagInput = class UpdateTagInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UpdateTagInput.prototype, "title", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UpdateTagInput.prototype, "description", void 0);
UpdateTagInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdateTagInput);
exports.UpdateTagInput = UpdateTagInput;


/***/ }),

/***/ "./libs/source/backend/src/lib/models/source-type.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SourceType = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let SourceType = class SourceType {
};
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], SourceType.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], SourceType.prototype, "title", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], SourceType.prototype, "description", void 0);
SourceType = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], SourceType);
exports.SourceType = SourceType;


/***/ }),

/***/ "./libs/source/backend/src/lib/models/source.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Source = void 0;
const tslib_1 = __webpack_require__("tslib");
const auth_be_1 = __webpack_require__("./libs/security/auth/backend/src/index.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const source_type_1 = __webpack_require__("./libs/source/backend/src/lib/models/source-type.ts");
const tag_1 = __webpack_require__("./libs/source/backend/src/lib/models/tag.ts");
// import { IsBoolean, IsString, IsEmail, IsDate, IsUrl } from "class-validator";
let Source = class Source {
};
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Source.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Source.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], Source.prototype, "public", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Source.prototype, "title", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Source.prototype, "url", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Source.prototype, "content", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Source.prototype, "description", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => source_type_1.SourceType, { nullable: true }),
    tslib_1.__metadata("design:type", typeof (_b = typeof source_type_1.SourceType !== "undefined" && source_type_1.SourceType) === "function" ? _b : Object)
], Source.prototype, "type", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [tag_1.Tag], { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], Source.prototype, "tags", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => auth_be_1.User, { nullable: true }),
    tslib_1.__metadata("design:type", typeof (_c = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _c : Object)
], Source.prototype, "owner", void 0);
Source = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Source);
exports.Source = Source;


/***/ }),

/***/ "./libs/source/backend/src/lib/models/tag.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tag = void 0;
const tslib_1 = __webpack_require__("tslib");
const auth_be_1 = __webpack_require__("./libs/security/auth/backend/src/index.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let Tag = class Tag {
};
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Tag.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "title", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "description", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => auth_be_1.User, { nullable: true }),
    tslib_1.__metadata("design:type", typeof (_b = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _b : Object)
], Tag.prototype, "author", void 0);
Tag = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Tag);
exports.Tag = Tag;


/***/ }),

/***/ "./libs/source/backend/src/lib/resolvers/source-type.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SourceTypeResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const common_1 = __webpack_require__("@nestjs/common");
const auth_be_1 = __webpack_require__("./libs/security/auth/backend/src/index.ts");
const types_be_1 = __webpack_require__("./libs/utils/types/backend/src/index.ts");
const src_1 = __webpack_require__("./libs/utils/log/backend/src/index.ts");
const source_service_1 = __webpack_require__("./libs/source/backend/src/lib/source.service.ts");
const source_type_1 = __webpack_require__("./libs/source/backend/src/lib/models/source-type.ts");
const create_source_type_input_1 = __webpack_require__("./libs/source/backend/src/lib/dto/create-source-type-input.ts");
const update_source_type_input_1 = __webpack_require__("./libs/source/backend/src/lib/dto/update-source-type-input.ts");
let SourceTypeResolver = class SourceTypeResolver {
    constructor(service, log) {
        this.service = service;
        this.log = log;
    }
    types() {
        this.log.logMethod(`Resolver.types()`);
        return this.service.findSourceTypes();
    }
    type(id) {
        this.log.logMethod(`Resolver.type()`);
        return this.service.findSourceType(id);
    }
    createType(user, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.logMethod(`Resolver.createType()`);
            return yield this.service.createSourceType(input);
        });
    }
    updateType(user, id, input) {
        this.log.logMethod(`Resolver.updateType()`);
        return this.service.updateSourceType(id, input);
    }
    deleteType(user, id) {
        this.log.logMethod(`Resolver.deleteType()`);
        return this.service.deleteSourceType(id);
    }
};
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [source_type_1.SourceType], { nullable: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], SourceTypeResolver.prototype, "types", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => source_type_1.SourceType, { nullable: true }),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], SourceTypeResolver.prototype, "type", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Admin, types_be_1.Role.Astek),
    (0, graphql_1.Mutation)(() => source_type_1.SourceType, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _c : Object, typeof (_d = typeof create_source_type_input_1.CreateSourceTypeInput !== "undefined" && create_source_type_input_1.CreateSourceTypeInput) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SourceTypeResolver.prototype, "createType", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Admin, types_be_1.Role.Astek),
    (0, graphql_1.Mutation)(() => source_type_1.SourceType, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('id')),
    tslib_1.__param(2, (0, graphql_1.Args)('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _e : Object, Number, typeof (_f = typeof update_source_type_input_1.UpdateSourceTypeInput !== "undefined" && update_source_type_input_1.UpdateSourceTypeInput) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SourceTypeResolver.prototype, "updateType", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Admin, types_be_1.Role.Astek),
    (0, graphql_1.Mutation)(() => Boolean, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _g : Object, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], SourceTypeResolver.prototype, "deleteType", null);
SourceTypeResolver = tslib_1.__decorate([
    (0, common_1.UseGuards)(auth_be_1.RolesGuard),
    (0, graphql_1.Resolver)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof source_service_1.SourceService !== "undefined" && source_service_1.SourceService) === "function" ? _a : Object, typeof (_b = typeof src_1.LogService !== "undefined" && src_1.LogService) === "function" ? _b : Object])
], SourceTypeResolver);
exports.SourceTypeResolver = SourceTypeResolver;


/***/ }),

/***/ "./libs/source/backend/src/lib/resolvers/source.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SourceResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const common_1 = __webpack_require__("@nestjs/common");
const auth_be_1 = __webpack_require__("./libs/security/auth/backend/src/index.ts");
const types_be_1 = __webpack_require__("./libs/utils/types/backend/src/index.ts");
const src_1 = __webpack_require__("./libs/utils/log/backend/src/index.ts");
const source_service_1 = __webpack_require__("./libs/source/backend/src/lib/source.service.ts");
const source_1 = __webpack_require__("./libs/source/backend/src/lib/models/source.ts");
const create_source_input_1 = __webpack_require__("./libs/source/backend/src/lib/dto/create-source-input.ts");
const update_source_input_1 = __webpack_require__("./libs/source/backend/src/lib/dto/update-source-input.ts");
let SourceResolver = class SourceResolver {
    constructor(service, log) {
        this.service = service;
        this.log = log;
    }
    sources() {
        return this.service.findSources();
    }
    sourcesOwned(user) {
        return this.service.findSourcesWhereOwnerId(user.id);
    }
    sourcesPublicOrOwned(user) {
        return this.service.findSourcesWherePublicOrOwnerId(user.id);
    }
    sourcesPublic() {
        return this.service.findSourcesPublic();
    }
    source(id) {
        return this.service.findSource(id);
    }
    sourceOwned(user, id) {
        return this.service.findSourceWhereOwnerId(user.id, id);
    }
    createSource(user, typeId, tagIds, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.logMethod(`Resolver.createSource(${JSON.stringify(input)})`);
            return this.service.createSource(user.id, typeId, tagIds, input);
        });
    }
    updateSource(user, id, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.logMethod(`Resolver.updateSource(${JSON.stringify(input)})`);
            return this.service.updateSource(user.id, id, input);
        });
    }
    updateSourceOwned(user, id, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.logMethod(`Resolver.updateSourceOwned(${JSON.stringify(input)})`);
            return this.service.updateSourceOwned(user.id, id, input);
        });
    }
    deleteSource(user, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.logMethod(`Resolver.deleteSource(${id})`);
            return yield this.service.deleteSource(user.id, id);
        });
    }
    deleteSourceOwned(user, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.logMethod(`Resolver.deleteSource(${id})`);
            return yield this.service.deleteSourceOwned(user.id, id);
        });
    }
    deleteSources(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.logMethod(`Resolver.deleteSources()`);
            return yield this.service.deleteSources(user.id);
        });
    }
};
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Admin, types_be_1.Role.Astek),
    (0, graphql_1.Query)(() => [source_1.Source], { nullable: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], SourceResolver.prototype, "sources", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [source_1.Source], { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SourceResolver.prototype, "sourcesOwned", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [source_1.Source], { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SourceResolver.prototype, "sourcesPublicOrOwned", null);
tslib_1.__decorate([
    (0, auth_be_1.Public)(),
    (0, graphql_1.Query)(() => [source_1.Source], { nullable: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], SourceResolver.prototype, "sourcesPublic", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Admin, types_be_1.Role.Astek),
    (0, graphql_1.Query)(() => source_1.Source, { nullable: true }),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], SourceResolver.prototype, "source", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Admin, types_be_1.Role.Astek),
    (0, graphql_1.Query)(() => source_1.Source, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _e : Object, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], SourceResolver.prototype, "sourceOwned", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => source_1.Source, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('typeId')),
    tslib_1.__param(2, (0, graphql_1.Args)({ name: 'tagIds', type: () => [Number] })),
    tslib_1.__param(3, (0, graphql_1.Args)('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _f : Object, Number, Array, typeof (_g = typeof create_source_input_1.CreateSourceInput !== "undefined" && create_source_input_1.CreateSourceInput) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SourceResolver.prototype, "createSource", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Admin, types_be_1.Role.Astek),
    (0, graphql_1.Mutation)(() => source_1.Source, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('id')),
    tslib_1.__param(2, (0, graphql_1.Args)('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _h : Object, Number, typeof (_j = typeof update_source_input_1.UpdateSourceInput !== "undefined" && update_source_input_1.UpdateSourceInput) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SourceResolver.prototype, "updateSource", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => source_1.Source, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('id')),
    tslib_1.__param(2, (0, graphql_1.Args)('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _k : Object, Number, typeof (_l = typeof update_source_input_1.UpdateSourceInput !== "undefined" && update_source_input_1.UpdateSourceInput) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SourceResolver.prototype, "updateSourceOwned", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Admin, types_be_1.Role.Astek),
    (0, graphql_1.Mutation)(() => Boolean, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _m : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], SourceResolver.prototype, "deleteSource", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _o : Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], SourceResolver.prototype, "deleteSourceOwned", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Admin),
    (0, graphql_1.Mutation)(() => Boolean, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_p = typeof auth_be_1.User !== "undefined" && auth_be_1.User) === "function" ? _p : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SourceResolver.prototype, "deleteSources", null);
SourceResolver = tslib_1.__decorate([
    (0, common_1.UseGuards)(auth_be_1.RolesGuard),
    (0, graphql_1.Resolver)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof source_service_1.SourceService !== "undefined" && source_service_1.SourceService) === "function" ? _a : Object, typeof (_b = typeof src_1.LogService !== "undefined" && src_1.LogService) === "function" ? _b : Object])
], SourceResolver);
exports.SourceResolver = SourceResolver;


/***/ }),

/***/ "./libs/source/backend/src/lib/resolvers/tag.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TagResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const common_1 = __webpack_require__("@nestjs/common");
const auth_be_1 = __webpack_require__("./libs/security/auth/backend/src/index.ts");
const client_1 = __webpack_require__("@prisma/client");
// import { Role } from '@jbhive/auth_be';
const types_be_1 = __webpack_require__("./libs/utils/types/backend/src/index.ts");
const src_1 = __webpack_require__("./libs/utils/log/backend/src/index.ts");
const create_tag_input_1 = __webpack_require__("./libs/source/backend/src/lib/dto/create-tag-input.ts");
const tag_1 = __webpack_require__("./libs/source/backend/src/lib/models/tag.ts");
const source_service_1 = __webpack_require__("./libs/source/backend/src/lib/source.service.ts");
const update_tag_input_1 = __webpack_require__("./libs/source/backend/src/lib/dto/update-tag-input.ts");
let TagResolver = class TagResolver {
    constructor(service, log) {
        this.service = service;
        this.log = log;
    }
    tags() {
        return this.service.findTags();
    }
    tag(id) {
        return this.service.findTag(id);
    }
    createTag(user, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.service.createTag(user.id, input);
        });
    }
    updateTag(user, id, input) {
        return this.service.updateTag(user.id, id, input);
    }
    updateTagOwned(user, id, input) {
        return this.service.updateTagOwned(user.id, id, input);
    }
    deleteTag(user, id) {
        return this.service.deleteTag(user.id, id);
    }
};
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [tag_1.Tag], { nullable: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TagResolver.prototype, "tags", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => tag_1.Tag, { nullable: true }),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], TagResolver.prototype, "tag", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Admin, types_be_1.Role.Astek, types_be_1.Role.Lord, types_be_1.Role.Buddy),
    (0, graphql_1.Mutation)(() => tag_1.Tag, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _c : Object, typeof (_d = typeof create_tag_input_1.CreateTagInput !== "undefined" && create_tag_input_1.CreateTagInput) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TagResolver.prototype, "createTag", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Admin, types_be_1.Role.Astek),
    (0, graphql_1.Mutation)(() => tag_1.Tag, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('id')),
    tslib_1.__param(2, (0, graphql_1.Args)('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _e : Object, Number, typeof (_f = typeof update_tag_input_1.UpdateTagInput !== "undefined" && update_tag_input_1.UpdateTagInput) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], TagResolver.prototype, "updateTag", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => tag_1.Tag, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('id')),
    tslib_1.__param(2, (0, graphql_1.Args)('input')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _g : Object, Number, typeof (_h = typeof update_tag_input_1.UpdateTagInput !== "undefined" && update_tag_input_1.UpdateTagInput) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], TagResolver.prototype, "updateTagOwned", null);
tslib_1.__decorate([
    (0, auth_be_1.Roles)(types_be_1.Role.Admin, types_be_1.Role.Astek),
    (0, graphql_1.Mutation)(() => Boolean, { nullable: true }),
    tslib_1.__param(0, (0, auth_be_1.CtxUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _j : Object, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], TagResolver.prototype, "deleteTag", null);
TagResolver = tslib_1.__decorate([
    (0, common_1.UseGuards)(auth_be_1.RolesGuard),
    (0, graphql_1.Resolver)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof source_service_1.SourceService !== "undefined" && source_service_1.SourceService) === "function" ? _a : Object, typeof (_b = typeof src_1.LogService !== "undefined" && src_1.LogService) === "function" ? _b : Object])
], TagResolver);
exports.TagResolver = TagResolver;


/***/ }),

/***/ "./libs/source/backend/src/lib/source-prisma-includes.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SourcePrismaIncludes = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let SourcePrismaIncludes = class SourcePrismaIncludes {
};
SourcePrismaIncludes.userIncludes = {
    role: true
};
SourcePrismaIncludes.sourceIncludes = {
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
};
SourcePrismaIncludes.tagIncludes = {
    author: {
        select: {
            id: true,
            pseudo: true,
            email: true,
            role: true
        }
    }
};
SourcePrismaIncludes = tslib_1.__decorate([
    (0, common_1.Injectable)()
], SourcePrismaIncludes);
exports.SourcePrismaIncludes = SourcePrismaIncludes;


/***/ }),

/***/ "./libs/source/backend/src/lib/source.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SourceModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const user_be_1 = __webpack_require__("./libs/user/backend/src/index.ts");
const log_be_1 = __webpack_require__("./libs/utils/log/backend/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const source_type_resolver_1 = __webpack_require__("./libs/source/backend/src/lib/resolvers/source-type.resolver.ts");
const source_resolver_1 = __webpack_require__("./libs/source/backend/src/lib/resolvers/source.resolver.ts");
const tag_resolver_1 = __webpack_require__("./libs/source/backend/src/lib/resolvers/tag.resolver.ts");
const source_service_1 = __webpack_require__("./libs/source/backend/src/lib/source.service.ts");
let SourceModule = class SourceModule {
};
SourceModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [user_be_1.UserModule, log_be_1.LogModule],
        controllers: [],
        providers: [source_service_1.SourceService, tag_resolver_1.TagResolver, source_type_resolver_1.SourceTypeResolver, source_resolver_1.SourceResolver],
        exports: [],
    })
], SourceModule);
exports.SourceModule = SourceModule;


/***/ }),

/***/ "./libs/source/backend/src/lib/source.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SourceService = void 0;
const tslib_1 = __webpack_require__("tslib");
const user_be_1 = __webpack_require__("./libs/user/backend/src/index.ts");
const log_be_1 = __webpack_require__("./libs/utils/log/backend/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const apollo_server_express_1 = __webpack_require__("apollo-server-express");
const client_1 = __webpack_require__("@prisma/client");
const source_prisma_includes_1 = __webpack_require__("./libs/source/backend/src/lib/source-prisma-includes.ts");
const types_be_1 = __webpack_require__("./libs/utils/types/backend/src/index.ts");
let SourceService = class SourceService extends client_1.PrismaClient {
    constructor(data, log) {
        super();
        this.data = data;
        this.log = log;
        this.groupby_desc = 'desc';
    }
    onModuleInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.$connect();
            this.ensureDbIsInitialized();
        });
    }
    ensureDbIsInitialized() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Check if DB need to load a default dataset..`);
            yield this.data.ensureRolesExist();
            yield this.data.ensureAdminUserExists();
            yield this.ensureTagsExist();
            yield this.ensureTypesExist();
        });
    }
    onModuleDestroy() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.$disconnect();
        });
    }
    findSource(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const source = yield this.source.findUnique({
                where: {
                    id
                },
                include: source_prisma_includes_1.SourcePrismaIncludes.sourceIncludes
            });
            if (!source) {
                throw new common_1.NotFoundException(`Source ${id} not found`);
            }
            // Map the tags
            const result = Object.assign(Object.assign({}, source), { tags: source.tags.map(tag => tag.tag) });
            return result;
        });
    }
    findSources() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const allSources = yield this.source.findMany({ include: source_prisma_includes_1.SourcePrismaIncludes.sourceIncludes });
            if (!allSources || allSources.length === 0) {
                throw new common_1.NotFoundException(`No source found`);
            }
            // Map the tags
            const result = allSources.map(source => {
                return Object.assign(Object.assign({}, source), { tags: source.tags.map(tag => tag.tag) });
            });
            return result;
        });
    }
    findSourcesWhereOwnerId(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const allSources = yield this.source.findMany({
                where: {
                    ownerId: userId
                },
                include: source_prisma_includes_1.SourcePrismaIncludes.sourceIncludes
            });
            if (!allSources || allSources.length === 0) {
                throw new common_1.NotFoundException(`No source found`);
            }
            const result = allSources.map(source => {
                return Object.assign(Object.assign({}, source), { tags: source.tags.map(tag => tag.tag) });
            });
            return result;
        });
    }
    findSourcesWherePublicOrOwnerId(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const allSources = yield this.source.findMany({
                where: {
                    OR: [
                        { ownerId: userId },
                        { public: true }
                    ]
                },
                orderBy: { createdAt: 'desc' },
                include: source_prisma_includes_1.SourcePrismaIncludes.sourceIncludes
            });
            if (!allSources || allSources.length === 0) {
                throw new common_1.NotFoundException(`No source found`);
            }
            const result = allSources.map(source => {
                return Object.assign(Object.assign({}, source), { tags: source.tags.map(tag => tag.tag) });
            });
            return result;
        });
    }
    findSourceWhereOwnerId(userId, sourceId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const allSources = yield this.source.findMany({
                where: {
                    id: sourceId,
                    ownerId: userId
                },
                orderBy: { createdAt: 'desc' },
                include: source_prisma_includes_1.SourcePrismaIncludes.sourceIncludes
            });
            if (!allSources || allSources.length === 0) {
                throw new common_1.NotFoundException(`No source found`);
            }
            const result = allSources.map(source => {
                return Object.assign(Object.assign({}, source), { tags: source.tags.map(tag => tag.tag) });
            });
            return result;
        });
    }
    findSourcesPublic() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const allSources = yield this.source.findMany({
                where: {
                    public: true
                },
                orderBy: { createdAt: 'desc' },
                include: source_prisma_includes_1.SourcePrismaIncludes.sourceIncludes
            });
            if (!allSources || allSources.length === 0) {
                throw new common_1.NotFoundException(`No source found`);
            }
            const result = allSources.map(source => {
                return Object.assign(Object.assign({}, source), { tags: source.tags.map(tag => tag.tag) });
            });
            return result;
        });
    }
    createSource(userId, typeId, tagsIds, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userFound = yield this.data.findUserById(userId);
            if (!userFound) {
                // this.log.err(`user ${userId} not found, can"t create the source: ${JSON.stringify(input)}`)
                throw new common_1.NotFoundException(`user ${userId} not found, can"t create the source: ${JSON.stringify(input)}`);
            }
            if (!this.notEmptyAndWithMinimumSize(input.title, 2)) {
                throw new common_1.BadRequestException(`Can't create source, title must be set and 2 characters longs at least`);
            }
            const created = yield this.source.create({
                data: Object.assign(Object.assign({}, input), { createdAt: new Date(), type: { connect: { id: typeId } }, owner: { connect: { id: userId } } })
            });
            yield this.manageReccordAssignementForSourceTag(created.id, tagsIds);
            return yield this.findSource(created.id);
        });
    }
    updateSource(userId, sourceId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const typeId = input === null || input === void 0 ? void 0 : input.typeId;
            delete input.typeId;
            const tagIds = input === null || input === void 0 ? void 0 : input.tagIds;
            delete input.tagIds;
            let data;
            if (typeId) {
                data = Object.assign(Object.assign({}, input), { type: { connect: { id: typeId } } });
            }
            else {
                data = Object.assign({}, input);
            }
            const updatedSource = yield this.source.update({
                where: { id: sourceId },
                data: data,
            });
            if (tagIds) {
                yield this.manageReccordAssignementForSourceTag(sourceId, tagIds);
            }
            const updateCompletedSource = yield this.findSource(updatedSource.id);
            return updateCompletedSource;
        });
    }
    updateSourceOwned(userId, sourceId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const found = yield this.findSource(sourceId);
            if (!found) {
                throw new common_1.NotFoundException(`Can't performe update operation, source ${sourceId} not found`);
            }
            if (found.ownerId !== userId) {
                throw new apollo_server_express_1.ForbiddenError(`User ${userId} is not allowed to update source ${sourceId}`);
            }
            return yield this.updateSource(userId, sourceId, input);
        });
    }
    deleteSource(userId, sourceId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deleted = yield this.source.delete({
                where: {
                    id: sourceId
                }
            });
            return !!deleted;
        });
    }
    deleteSourceOwned(userId, sourceId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const found = yield this.findSource(sourceId);
            if (!found) {
                throw new common_1.NotFoundException(`Can't performe delete operation, source ${sourceId} not found`);
            }
            if (found.ownerId !== userId) {
                throw new apollo_server_express_1.ForbiddenError(`User ${userId} is not allowed to delte source ${sourceId}`);
            }
            const deleted = yield this.deleteSource(userId, sourceId);
        });
    }
    deleteSources(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deleted = yield this.source.deleteMany({});
            return deleted.count > 0;
        });
    }
    findTagById(tagId) {
        return this.tag.findUnique({
            where: {
                id: tagId
            }
        });
    }
    findTagByTitle(title) {
        return this.tag.findUnique({
            where: {
                title: title
            }
        });
    }
    findTag(id) {
        return this.tag.findUnique({
            where: {
                id
            },
            include: source_prisma_includes_1.SourcePrismaIncludes.tagIncludes
        });
    }
    findTags() {
        return this.tag.findMany({ include: source_prisma_includes_1.SourcePrismaIncludes.tagIncludes });
    }
    findTagByIds(tags) {
        return this.tag.findMany({
            where: {
                id: { in: tags }
            }
        });
    }
    createTag(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.notEmptyAndWithMinimumSize(input.title, 3)) {
                throw new common_1.BadRequestException(`Can't create tag, title must be set and 3 characters longs at least`);
            }
            if (!this.notEmptyAndWithMinimumSize(input.description, 6)) {
                throw new common_1.BadRequestException(`Can't create tag, description must be set and 6 characters longs at least`);
            }
            const userFound = yield this.data.findUserById(userId);
            if (!userFound) {
                // this.log.err(`user ${userId} not found, can"t create the tag: ${JSON.stringify(input)}`)
                throw new common_1.NotFoundException(`User ${userId} not found, can"t create the tag: ${JSON.stringify(input)}`);
            }
            const tagFound = yield this.findTagByTitle(input.title);
            if (tagFound) {
                // this.log.err(`user ${userId} not found, can"t create the tag: ${JSON.stringify(input)}`)
                throw new common_1.ForbiddenException(`Tag ${input.title} already exists}`);
            }
            const created = yield this.tag.create({
                data: Object.assign(Object.assign({}, input), { author: { connect: { id: userId } } })
            });
            const createTagFound = yield this.findTag(created.id);
            return createTagFound;
        });
    }
    updateTag(userId, id, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tag.update({
                where: { id: id },
                data: Object.assign({}, input)
            });
        });
    }
    updateTagOwned(userId, id, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const found = yield this.findTag(id);
            if (!found) {
                throw new common_1.NotFoundException(`Tag ${id} not found, can't update the tag ${id}`);
            }
            if (found.authorId !== userId) {
                throw new apollo_server_express_1.ForbiddenError(`User ${userId} not allowed to update tag ${id}`);
            }
            return yield this.tag.update({
                where: { id: id },
                data: Object.assign({}, input)
            });
        });
    }
    deleteTag(userId, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deleted = yield this.tag.delete({
                where: { id: id }
            });
            return !!deleted;
        });
    }
    findTypeById(id) {
        return this.sourceType.findUnique({
            where: {
                id: id
            }
        });
    }
    findSourceType(id) {
        return this.sourceType.findUnique({
            where: {
                id
            }
        });
    }
    findSourceTypes() {
        return this.sourceType.findMany();
    }
    createSourceType(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.notEmptyAndWithMinimumSize(input.title, 2)) {
                throw new common_1.BadRequestException(`Can't create source type, title must be set and 2 characters longs at least`);
            }
            if (!this.notEmptyAndWithMinimumSize(input.description, 6)) {
                throw new common_1.BadRequestException(`Can't create source type, description must be set and 6 characters longs at least`);
            }
            return yield this.sourceType.create({
                data: Object.assign({}, input)
            });
        });
    }
    updateSourceType(id, input) {
        return this.sourceType.update({
            where: { id: id },
            data: Object.assign({}, input)
        });
    }
    deleteSourceType(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deleted = yield this.sourceType.delete({
                where: { id: id }
            });
            return !!deleted;
        });
    }
    manageReccordAssignementForSourceTag(sourceId, tags) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const source = yield this.findSource(sourceId);
            yield this.removeOldReccordsForSourceTag(source, sourceId, tags);
            yield this.addNewReccordsForSourceTag(source, sourceId, tags);
            return true;
        });
    }
    addNewReccordsForSourceTag(source, sourceId, tags) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // // News
            let assignements = [];
            for (var tagId of tags) {
                let found = false;
                for (var tag of source.tags) {
                    if (tagId === tag.id) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    assignements = [
                        ...assignements,
                        {
                            sourceId: sourceId,
                            tagId: tagId
                        }
                    ];
                }
            }
            const relationsCreated = yield this.sourceTag.createMany({
                data: assignements
            });
            return relationsCreated;
        });
    }
    removeOldReccordsForSourceTag(source, sourceId, tags) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Olds
            // let assignements = []
            let ids = [];
            for (var tag of source.tags) {
                let found = false;
                for (var tagId of tags) {
                    if (tagId === tag.id) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    ids.push(tag.id);
                }
            }
            for (var id of ids) {
                yield this.sourceTag.delete({
                    where: {
                        sourceId_tagId: {
                            sourceId: sourceId,
                            tagId: id
                        }
                    }
                });
            }
        });
    }
    /*********************************
     *  UTILS
     *
     *********************************/
    //  private async ensureRolesExist() {
    //     const found = await this.findRoleById(0)
    //     if (found) {
    //         return true
    //     }
    //     Logger.debug(`Initialize Roles..`)
    //     // create roles
    //     for (var role of roles_dataset) {
    //         await this.createRole({ id: role.id, name: role.name, description: role.description })
    //     }
    // }
    // private async ensureAdminUserExists() {
    //     const found = await this.data.findUserByEmail(this.default_admin.email)
    //     if (found) {
    //         return true
    //     }
    //     Logger.debug(`Initialize Admin user AIGHT..`)
    //     const created = await this.data.createActivatedUser(this.default_admin)
    //     for (var user of users_dataset) {
    //         Logger.debug(`Initialize Admin user..`)
    //         await this.data.createActivatedUser({ email: user.email, nickname: user.nickname, pseudo: user.pseudo, password: this.default_admin.password, roleId: user.roleId })
    //     }
    // }
    ensureTagsExist() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const found = yield this.findTagById(1);
            if (found) {
                return true;
            }
            // create roles
            common_1.Logger.debug(`Initialize Tags..`);
            for (var tag of types_be_1.tags_dataset) {
                yield this.createTag(1, { title: tag.title, description: tag.description });
            }
        });
    }
    ensureTypesExist() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const found = yield this.findTypeById(1);
            if (found) {
                return true;
            }
            common_1.Logger.debug(`Initialize Types..`);
            // create roles
            for (var type of types_be_1.types_dataset) {
                yield this.createSourceType({ title: type.title, description: type.description });
            }
        });
    }
    notEmptyAndWithMinimumSize(value, minimalSize) {
        if (value === null || value.trim().length === 0 || value.length < minimalSize) {
            return false;
        }
        else {
            return true;
        }
    }
};
SourceService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_be_1.UserService !== "undefined" && user_be_1.UserService) === "function" ? _a : Object, typeof (_b = typeof log_be_1.LogService !== "undefined" && log_be_1.LogService) === "function" ? _b : Object])
], SourceService);
exports.SourceService = SourceService;


/***/ }),

/***/ "./libs/user/backend/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/user/backend/src/lib/user.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/user/backend/src/lib/user.service.ts"), exports);


/***/ }),

/***/ "./libs/user/backend/src/lib/user.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const user_service_1 = __webpack_require__("./libs/user/backend/src/lib/user.service.ts");
const types_be_1 = __webpack_require__("./libs/utils/types/backend/src/index.ts");
let UserModule = class UserModule {
};
UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [types_be_1.StructModule],
        controllers: [],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),

/***/ "./libs/user/backend/src/lib/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const client_1 = __webpack_require__("@prisma/client");
const types_be_1 = __webpack_require__("./libs/utils/types/backend/src/index.ts");
const crypt_1 = __webpack_require__("./libs/security/crypt/src/index.ts");
let UserService = class UserService extends client_1.PrismaClient {
    constructor(config) {
        super();
        this.config = config;
        this.default_admin = {
            email: this.config.get('admin_email'),
            password: this.config.get('admin_password'),
            pseudo: this.config.get('admin_pseudo'),
            nickname: this.config.get('admin_pseudo'),
            roleId: this.config.get('admin_role_id'),
        };
    }
    onModuleInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.$connect();
        });
    }
    onModuleDestroy() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.$disconnect();
        });
    }
    /*********************************
     *  USERS & ROLES
     *
     *********************************/
    createUser({ email, password, pseudo, roleId, nickname }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Comming from PrsimaClient
            common_1.Logger.log(`createUser`);
            const created = yield this.user.create({
                data: {
                    email,
                    password,
                    pseudo,
                    nickname,
                    roleId: +roleId,
                    hidden: false,
                    activated: true,
                    token: '',
                }
            });
            return created;
        });
    }
    createActivatedUser({ email, password, pseudo, roleId, nickname }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Comming from PrsimaClient
            common_1.Logger.log(`createActivatedUser`);
            const created = yield this.user.create({
                data: {
                    email,
                    password,
                    pseudo,
                    nickname,
                    role: { connect: { id: +roleId } },
                    hidden: false,
                    activated: true,
                    token: '',
                }
            });
            return created;
        });
    }
    createRole({ id, name, description }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Comming from PrismaClient
            const created = yield this.role.create({
                data: {
                    id,
                    name,
                    description
                }
            });
            return created;
        });
    }
    findUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.user.findUnique({
                where: {
                    id: userId
                }
            });
        });
    }
    updateRoleUser(userId, roleId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Update
            return yield this.user.update({
                where: { id: userId },
                data: { roleId }
            });
        });
    }
    // async loadAllDesactivatedUsersWithLessPrivilege(userRoleId: number) {
    //     return await this.user.findMany({
    //         where: {
    //             activated: true,
    //             // hidden: false,
    //             // roleId: {
    //             //     lt: userRoleId
    //             // }
    //         }
    //     })
    // }
    loadAllUsersWithLessPrivilege(userRoleId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.user.findMany({
                where: {
                    hidden: false,
                    activated: true,
                    roleId: {
                        lt: userRoleId
                    }
                }
            });
        });
    }
    updateAdminUser(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let data = Object.assign({}, input);
            return yield this.user.update({
                where: { id: userId },
                data: data
            });
        });
    }
    updateUser(userId, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('userservice.updateUser: ', input);
            let data = Object.assign({}, input);
            if (input === null || input === void 0 ? void 0 : input.password) {
                data = Object.assign(Object.assign({}, data), { password: yield crypt_1.CryptHelper.hash(input.password) });
            }
            return yield this.user.update({
                where: { id: userId },
                data: data
            });
        });
    }
    deleteUser(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deleted = yield this.user.delete({
                where: {
                    id
                }
            });
            return !!deleted;
        });
    }
    findUserByEmail(email) {
        return this.user.findUnique({
            where: { email },
            include: types_be_1.PrismaIncludes.userIncludes
        });
    }
    findUserById(userId) {
        return this.user.findUnique({
            where: {
                id: userId
            },
            include: types_be_1.PrismaIncludes.userIncludes
        });
    }
    findUserByNickname(nickname) {
        return this.user.findUnique({
            where: { nickname },
            include: types_be_1.PrismaIncludes.userIncludes
        });
    }
    findUserByPseudo(pseudo) {
        return this.user.findUnique({
            where: { pseudo },
            include: types_be_1.PrismaIncludes.userIncludes
        });
    }
    findRoleById(roleId) {
        return this.role.findUnique({
            where: {
                id: roleId
            }
        });
    }
    // /*********************************
    //  *  UTILS
    //  * 
    //  *********************************/
    ensureRolesExist() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const found = yield this.findRoleById(0);
            if (found) {
                return true;
            }
            common_1.Logger.log(`Initialize Roles..`);
            // create roles
            for (var role of types_be_1.roles_dataset) {
                yield this.createRole({ id: role.id, name: role.name, description: role.description });
            }
        });
    }
    ensureAdminUserExists() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const found = yield this.findUserByEmail(this.default_admin.email);
            if (found) {
                return true;
            }
            common_1.Logger.log(`Initialize Admin user`);
            const created = yield this.createActivatedUser(this.default_admin);
            for (var user of types_be_1.users_dataset) {
                common_1.Logger.debug(`Initialize ${user.pseudo} user`);
                yield this.createActivatedUser({ email: user.email, nickname: user.nickname, pseudo: user.pseudo, password: this.default_admin.password, roleId: user.roleId });
            }
        });
    }
};
UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./libs/utils/config/backend/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/utils/config/backend/src/lib/core.module.ts"), exports);


/***/ }),

/***/ "./libs/utils/config/backend/src/lib/config/configuration.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.configuration = void 0;
const configuration = () => ({
    environment: "development" || 0,
    port: parseInt(process.env.PORT || '3000', 10),
    admin_email: process.env.ADMIN_EMAIL,
    admin_pseudo: process.env.ADMIN_PSEUDO,
    admin_password: process.env.ADMIN_PASSWORD,
    admin_role_id: parseInt(process.env.ADMIN_ROLE_ID),
    debug: process.env.DEBUG,
    debug_guards: process.env.DEBUG_GUARDS,
    jwt_expire: parseInt(process.env.JWT_EXPIRE),
    jwt_secret: process.env.JWT_SECRET,
});
exports.configuration = configuration;


/***/ }),

/***/ "./libs/utils/config/backend/src/lib/config/validation.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validationSchema = void 0;
const Joi = __webpack_require__("joi");
exports.validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid("development", "production", "test").required(),
    PORT: Joi.number().default(3000),
    ADMIN_EMAIL: Joi.string().email().required(),
    ADMIN_PSEUDO: Joi.string().required(),
    ADMIN_PASSWORD: Joi.string().required(),
    ADMIN_ROLE_ID: Joi.number().required(),
    DEBUG: Joi.string().valid("true", "false").required(),
    DEBUG_GUARDS: Joi.string().valid("true", "false").required(),
    JWT_EXPIRE: Joi.number(),
    JWT_SECRET: Joi.string().required(),
});


/***/ }),

/***/ "./libs/utils/config/backend/src/lib/core.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoreModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const configuration_1 = __webpack_require__("./libs/utils/config/backend/src/lib/config/configuration.ts");
const validation_1 = __webpack_require__("./libs/utils/config/backend/src/lib/config/validation.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const core_resolver_1 = __webpack_require__("./libs/utils/config/backend/src/lib/core.resolver.ts");
const apollo_1 = __webpack_require__("@nestjs/apollo");
const src_1 = __webpack_require__("./libs/utils/log/backend/src/index.ts");
let CoreModule = class CoreModule {
};
CoreModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            src_1.LogModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.configuration],
                validationSchema: validation_1.validationSchema,
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true,
                playground: true,
            }),
        ],
        controllers: [],
        providers: [core_resolver_1.CoreResolver],
        exports: [],
    })
], CoreModule);
exports.CoreModule = CoreModule;


/***/ }),

/***/ "./libs/utils/config/backend/src/lib/core.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoreResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CoreResolver = class CoreResolver {
    // constructor(private readonly log: LogService) {}
    uptime() {
        return process.uptime();
    }
};
tslib_1.__decorate([
    (0, graphql_1.Query)(() => graphql_1.Float),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], CoreResolver.prototype, "uptime", null);
CoreResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)()
], CoreResolver);
exports.CoreResolver = CoreResolver;


/***/ }),

/***/ "./libs/utils/log/backend/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/utils/log/backend/src/lib/log.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/utils/log/backend/src/lib/log.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/utils/log/backend/src/lib/enums/colors.enum.ts"), exports);


/***/ }),

/***/ "./libs/utils/log/backend/src/lib/enums/colors.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Color = void 0;
var Color;
(function (Color) {
    Color["Reset"] = "\u001B[0m";
    Color["FgBlack"] = "\u001B[30m";
    Color["FgRed"] = "\u001B[31m";
    Color["FgGreen"] = "\u001B[32m";
    Color["FgYellow"] = "\u001B[33m";
    Color["FgBlue"] = "\u001B[34m";
    Color["FgMagenta"] = "\u001B[35m";
    Color["FgCyan"] = "\u001B[36m";
    Color["FgWhite"] = "\u001B[37m";
    Color["BgBlack"] = "\u001B[40m";
    Color["BgRed"] = "\u001B[41m";
    Color["BgGreen"] = "\u001B[42m";
    Color["BgYellow"] = "\u001B[43m";
    Color["BgBlue"] = "\u001B[44m";
    Color["BgMagenta"] = "\u001B[45m";
    Color["BgCyan"] = "\u001B[46m";
    Color["BgWhite"] = "\u001B[47m";
    Color["Bright"] = "\u001B[1m";
    Color["Dim"] = "\u001B[2m";
    Color["Underscore"] = "\u001B[4m";
    Color["Blink"] = "\u001B[5m";
    Color["Reverse"] = "\u001B[7m";
    Color["Hidden"] = "\u001B[8m";
})(Color = exports.Color || (exports.Color = {}));


/***/ }),

/***/ "./libs/utils/log/backend/src/lib/log.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const log_service_1 = __webpack_require__("./libs/utils/log/backend/src/lib/log.service.ts");
let LogModule = class LogModule {
};
LogModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [log_service_1.LogService],
        exports: [log_service_1.LogService],
    })
], LogModule);
exports.LogModule = LogModule;


/***/ }),

/***/ "./libs/utils/log/backend/src/lib/log.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const colors_enum_1 = __webpack_require__("./libs/utils/log/backend/src/lib/enums/colors.enum.ts");
const config_1 = __webpack_require__("@nestjs/config");
let LogService = class LogService {
    constructor(config) {
        this.config = config;
        this.debug = this.config.get('debug') === "true";
        this.debugGuards = this.config.get('debug_guards') === "true";
    }
    log(msg) {
        if (this.debug) {
            common_1.Logger.log(msg);
        }
    }
    warn(msg) {
        if (this.debug) {
            common_1.Logger.warn(msg);
        }
    }
    err(msg) {
        if (this.debug) {
            common_1.Logger.error(msg);
        }
    }
    logMethod(msg) {
        if (this.debug) {
            common_1.Logger.log(`> ${msg}`);
        }
    }
    logTitle(msg) {
        if (this.debug) {
            common_1.Logger.log("");
            common_1.Logger.log(`# ${msg}`);
        }
    }
    logDefault(msg) {
        common_1.Logger.log(msg);
    }
    logc(msg, color) {
        if (this.debug) {
            common_1.Logger.log(color + msg + colors_enum_1.Color.Reset);
        }
    }
    warnc(msg, color) {
        if (this.debug) {
            common_1.Logger.warn(color + msg + colors_enum_1.Color.Reset);
        }
    }
    errc(msg, color) {
        if (this.debug) {
            common_1.Logger.error(color + msg + colors_enum_1.Color.Reset);
        }
    }
    logcMethod(msg, color) {
        if (this.debug) {
            common_1.Logger.log(`> ${color} ${msg} ${colors_enum_1.Color.Reset}`);
        }
    }
    logcTitle(msg, color) {
        if (this.debug) {
            common_1.Logger.log("");
            common_1.Logger.log(`# ${color} ${msg} ${colors_enum_1.Color.Reset}`);
        }
    }
    logGuardMethod(name, method) {
        if (this.debugGuards) {
            common_1.Logger.log("");
            common_1.Logger.log(`${colors_enum_1.Color.FgCyan}> Guard catched call for ${name}.${method}() ${colors_enum_1.Color.Reset} `);
        }
    }
    logGuard(guardName, msg) {
        if (this.debugGuards) {
            common_1.Logger.log(`[${guardName}]:${colors_enum_1.Color.FgCyan} ${msg} ${colors_enum_1.Color.Reset} `);
        }
    }
};
LogService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], LogService);
exports.LogService = LogService;


/***/ }),

/***/ "./libs/utils/types/backend/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/utils/types/backend/src/lib/struct.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/utils/types/backend/src/lib/enums/role.enum.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/utils/types/backend/src/lib/data-set/my-sources-init.dataset.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/utils/types/backend/src/lib/dto/update-user-inupt.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/utils/types/backend/src/lib/dto/admin-update-user-inupt.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/utils/types/backend/src/lib/prisma/prisma-includes.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/utils/types/backend/src/lib/dto/created-role.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/utils/types/backend/src/lib/dto/create-user-dto.ts"), exports);


/***/ }),

/***/ "./libs/utils/types/backend/src/lib/data-set/my-sources-init.dataset.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sources_dataset = exports.users_dataset = exports.types_dataset = exports.tags_dataset = exports.roles_dataset = void 0;
const role_enum_1 = __webpack_require__("./libs/utils/types/backend/src/lib/enums/role.enum.ts");
exports.roles_dataset = [
    { id: role_enum_1.Role.User, name: 'user', description: 'Un mec connecté' },
    { id: role_enum_1.Role.Buddy, name: 'buddy', description: 'My buddy' },
    { id: role_enum_1.Role.Lord, name: 'lord', description: 'Lui c\'est le sang' },
    { id: role_enum_1.Role.Admin, name: 'admin', description: 'Monsieur, mes homages..' },
    { id: role_enum_1.Role.Astek, name: 'astek', description: 'Le dev en personne' }
];
exports.tags_dataset = [
    { title: '1er', description: 'Premières et autres fois' },
    { title: 'science', description: 'C\'est scientifique!' },
    { title: 'skate', description: 'Obligé pour loic' },
    { title: 'eminem', description: 'Encore obligé pour loic' },
    { title: 'histoire', description: 'C\'est historique!' },
    { title: 'dev', description: 'Vive le code!' },
];
exports.types_dataset = [
    { title: 'web', description: 'Basiquement, un site web' },
    { title: 'book', description: 'Vue sur du papier' },
    { title: 'other', description: 'Type de source non repertorié' },
];
exports.users_dataset = [
    { email: 'bj@gmail.com', nickname: 'astek', pseudo: 'astek', roleId: role_enum_1.Role.Astek },
    { email: 'bu@gmail.com', nickname: 'buddy', pseudo: 'buddy', roleId: role_enum_1.Role.Buddy },
    { email: 'lo@gmail.com', nickname: 'lord', pseudo: 'lord', roleId: role_enum_1.Role.Lord },
    { email: 'us@gmail.com', nickname: 'user', pseudo: 'user', roleId: role_enum_1.Role.User },
];
exports.sources_dataset = [
    { title: 'bj@gmail.com', public: 'astek', url: 'astek', content: 'content', description: 'description', type: 0, ownerId: 0, typeId: 0,
        tags: [0, 1], },
];


/***/ }),

/***/ "./libs/utils/types/backend/src/lib/dto/admin-update-user-inupt.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminUpdateUserInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let AdminUpdateUserInput = class AdminUpdateUserInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], AdminUpdateUserInput.prototype, "activated", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], AdminUpdateUserInput.prototype, "hidden", void 0);
AdminUpdateUserInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AdminUpdateUserInput);
exports.AdminUpdateUserInput = AdminUpdateUserInput;


/***/ }),

/***/ "./libs/utils/types/backend/src/lib/dto/create-user-dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatedUserDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CreatedUserDto = class CreatedUserDto {
};
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    tslib_1.__metadata("design:type", String)
], CreatedUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    tslib_1.__metadata("design:type", String)
], CreatedUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    tslib_1.__metadata("design:type", String)
], CreatedUserDto.prototype, "pseudo", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    tslib_1.__metadata("design:type", Number)
], CreatedUserDto.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    tslib_1.__metadata("design:type", String)
], CreatedUserDto.prototype, "nickname", void 0);
CreatedUserDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreatedUserDto);
exports.CreatedUserDto = CreatedUserDto;


/***/ }),

/***/ "./libs/utils/types/backend/src/lib/dto/created-role.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatedRoleDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CreatedRoleDto = class CreatedRoleDto {
};
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    tslib_1.__metadata("design:type", Number)
], CreatedRoleDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    tslib_1.__metadata("design:type", String)
], CreatedRoleDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    tslib_1.__metadata("design:type", String)
], CreatedRoleDto.prototype, "description", void 0);
CreatedRoleDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreatedRoleDto);
exports.CreatedRoleDto = CreatedRoleDto;


/***/ }),

/***/ "./libs/utils/types/backend/src/lib/dto/update-user-inupt.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let UpdateUserInput = class UpdateUserInput {
};
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UpdateUserInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UpdateUserInput.prototype, "pseudo", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UpdateUserInput.prototype, "nickname", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UpdateUserInput.prototype, "password", void 0);
UpdateUserInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdateUserInput);
exports.UpdateUserInput = UpdateUserInput;


/***/ }),

/***/ "./libs/utils/types/backend/src/lib/enums/role.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role[Role["User"] = 0] = "User";
    Role[Role["Buddy"] = 1] = "Buddy";
    Role[Role["Lord"] = 2] = "Lord";
    Role[Role["Admin"] = 3] = "Admin";
    Role[Role["Astek"] = 4] = "Astek";
})(Role = exports.Role || (exports.Role = {}));


/***/ }),

/***/ "./libs/utils/types/backend/src/lib/prisma/prisma-includes.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaIncludes = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let PrismaIncludes = class PrismaIncludes {
};
PrismaIncludes.userIncludes = {
    role: true
};
PrismaIncludes.sourceIncludes = {
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
};
PrismaIncludes.tagIncludes = {
    author: {
        select: {
            id: true,
            pseudo: true,
            email: true,
            role: true
        }
    }
};
PrismaIncludes.coursesIncludes = {
    lessons: true,
    author: {
        select: {
            id: true,
            pseudo: true,
            email: true,
            role: true
        }
    }
};
PrismaIncludes = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PrismaIncludes);
exports.PrismaIncludes = PrismaIncludes;


/***/ }),

/***/ "./libs/utils/types/backend/src/lib/struct.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StructModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let StructModule = class StructModule {
};
StructModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], StructModule);
exports.StructModule = StructModule;


/***/ }),

/***/ "@nestjs/apollo":
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/swagger":
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@prisma/client":
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "apollo-server-express":
/***/ ((module) => {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "bcryptjs":
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "joi":
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const config_1 = __webpack_require__("@nestjs/config");
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
const swagger_1 = __webpack_require__("@nestjs/swagger");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const config = app.get(config_1.ConfigService);
        const configSwagger = new swagger_1.DocumentBuilder()
            .setTitle('My Sources')
            .setDescription('The my-sources API description')
            .setVersion('1.0')
            .addTag('sources')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, configSwagger);
        swagger_1.SwaggerModule.setup('api', app, document);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = config.get('port');
        yield app.listen(port, () => {
            common_1.Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
            common_1.Logger.log('Listening at http://localhost:' + port + '/graphql');
            common_1.Logger.log(`🚀 Running in ${config.get('environment')} mode`);
        });
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map