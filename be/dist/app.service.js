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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const cache_1 = require("./cache");
let AppService = class AppService {
    constructor(cacheStore) {
        this.cacheStore = cacheStore;
    }
    getPosts(getPostQuery) {
        const { category, term, page, perPage } = getPostQuery;
        const posts = this.cacheStore.getData({ category, term });
        const skip = (page - 1) * perPage;
        const data = posts.slice(skip, skip + perPage);
        const totalCount = this.cacheStore.getTotalCount({ category, term });
        return { data, totalCount };
    }
    getPost(id) {
        const posts = this.cacheStore.getData({ term: '', category: '' });
        const post = posts.find((post) => post.id === id);
        if (!post)
            throw new common_1.NotFoundException('포스트가 존재하지 않습니다.');
        return post;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cache_1.CacheStore])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map