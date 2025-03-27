"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const game_service_1 = require("./game.service");
let GameController = class GameController {
    gameService;
    constructor(gameService) {
        this.gameService = gameService;
    }
    startGame(body) {
        try {
            return this.gameService.start(body.width, body.height);
        }
        catch (error) {
            throw new common_1.HttpException(error instanceof Error ? error.message : '', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    move(body) {
        return this.gameService.move(body.direction);
    }
};
exports.GameController = GameController;
__decorate([
    (0, common_1.Post)('start'),
    (0, swagger_1.ApiOperation)({ summary: 'Start a new game with specified dimensions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Game started successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid dimensions' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GameController.prototype, "startGame", null);
__decorate([
    (0, common_1.Post)('move'),
    (0, swagger_1.ApiOperation)({ summary: 'Move the snake in the specified direction' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Move executed successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GameController.prototype, "move", null);
exports.GameController = GameController = __decorate([
    (0, swagger_1.ApiTags)('Game'),
    (0, common_1.Controller)('game'),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameController);
//# sourceMappingURL=game.controller.js.map