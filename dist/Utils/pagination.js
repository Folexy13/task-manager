"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const paginate = (model, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page } = options;
    // Calculate offset based on the current page
    const offset = (page - 1) * limit;
    // Fetch paginated data
    const result = yield model.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']], // or any other field for ordering
    });
    const totalPages = Math.ceil(result.count / limit);
    const currentPage = page;
    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    return {
        total: result.count,
        currentPage,
        previousPage,
        nextPage,
        totalPages,
        data: result.rows,
    };
});
exports.paginate = paginate;
