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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class StartDto {
    width;
    height;
}
exports.StartDto = StartDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dimension width of game board',
    }),
    (0, class_validator_1.IsInt)({ message: 'Width must be an integer' }),
    (0, class_validator_1.Min)(5, { message: 'Width must be at least 5' }),
    (0, class_validator_1.Max)(25, { message: 'Width must not exceed 25' }),
    __metadata("design:type", Number)
], StartDto.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dimension height of game board',
    }),
    (0, class_validator_1.IsInt)({ message: 'Height must be an integer' }),
    (0, class_validator_1.Min)(5, { message: 'Height must be at least 5' }),
    (0, class_validator_1.Max)(25, { message: 'Height must not exceed 25' }),
    __metadata("design:type", Number)
], StartDto.prototype, "height", void 0);
//# sourceMappingURL=start.dto.js.map