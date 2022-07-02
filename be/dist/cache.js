"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheStore = void 0;
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const matter = require("gray-matter");
let CacheStore = class CacheStore {
    constructor() {
        this.postPath = (0, path_1.resolve)(__dirname, '..', '..', '..', 'til', 'til');
        this.fileList = [];
        this.postList = {};
    }
    getFilesFromFile() {
        if (this.fileList.length)
            return this.fileList;
        else {
            const files = (0, fs_1.readdirSync)(this.postPath).sort((a, b) => {
                if (a > b)
                    return -1;
                else
                    return 1;
            });
            this.fileList = files;
            return files;
        }
    }
    getPostsForm({ file, data, content }) {
        const post = {
            id: file,
            head: data,
            body: content,
        };
        return post;
    }
    getPostByTerm(term) {
        if (this.postList[term])
            return this.postList[term];
        else {
            const files = this.getFilesFromFile();
            const posts = [];
            for (const file of files) {
                const readFile = (0, fs_1.readFileSync)(`${this.postPath}/${file}`);
                const { data, content } = matter(readFile);
                if (data.category.includes(term) ||
                    content.includes(term) ||
                    file.includes(term)) {
                    const post = this.getPostsForm({ file, data, content });
                    posts.push(post);
                }
            }
            this.postList[term] = posts;
            return posts;
        }
    }
    getPosts() {
        var _a;
        if ((_a = this.postList) === null || _a === void 0 ? void 0 : _a.raw)
            return this.postList.raw;
        else {
            const files = this.getFilesFromFile();
            const posts = [];
            for (const file of files) {
                const readFile = (0, fs_1.readFileSync)(`${this.postPath}/${file}`);
                const { data, content } = matter(readFile);
                const post = this.getPostsForm({ file, data, content });
                posts.push(post);
            }
            this.postList.raw = posts;
            return posts;
        }
    }
    getPostByCategory(category) {
        if (this.postList[category])
            return this.postList[category];
        else {
            const files = this.getFilesFromFile();
            const posts = [];
            for (const file of files) {
                const readFile = (0, fs_1.readFileSync)(`${this.postPath}/${file}`);
                const { data, content } = matter(readFile);
                if (data.category.includes(category)) {
                    const post = this.getPostsForm({ file, data, content });
                    posts.push(post);
                }
            }
            this.postList[category] = posts;
            return posts;
        }
    }
    getData({ term, category }) {
        let data = this.getPosts();
        if (term)
            data = this.getPostByTerm(term);
        if (category)
            data = this.getPostByCategory(category);
        return data;
    }
    getTotalCount({ term, category }) {
        let data = this.getPosts();
        if (term)
            data = this.getPostByTerm(term);
        if (category)
            data = this.getPostByCategory(category);
        return data.length;
    }
};
CacheStore = __decorate([
    (0, common_1.Injectable)()
], CacheStore);
exports.CacheStore = CacheStore;
//# sourceMappingURL=cache.js.map