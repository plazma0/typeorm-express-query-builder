"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_factory_1 = require("./filter-factory");
const default_config_1 = require("./default-config");
class QueryBuilder {
    constructor(expressQuery) {
        this.expressQuery = expressQuery;
        this.typeORMQuery = {};
    }
    build() {
        const factory = new filter_factory_1.FilterFactory();
        if (this.expressQuery['pagination'] === undefined ||
            this.expressQuery['pagination'] === true) {
            this.setPage();
            this.setLimit();
        }
        delete this.expressQuery['pagination'];
        this.setOrder();
        this.setRelations();
        for (const queryItem in this.expressQuery) {
            const filter = factory.get(this.typeORMQuery, queryItem, this.expressQuery[queryItem]);
            filter.buildQuery();
        }
        return this.typeORMQuery;
    }
    setPage() {
        this.typeORMQuery['skip'] = (this.expressQuery['page'] && this.expressQuery['page'] > 1)
            ? (this.expressQuery['page'] - 1) * (this.expressQuery['limit'] || default_config_1.ITEMS_PER_PAGE)
            : 0;
        delete this.expressQuery['page'];
    }
    setLimit() {
        this.typeORMQuery['take'] = (this.expressQuery['limit'] && this.expressQuery['limit'] > 0)
            ? this.expressQuery['limit']
            : default_config_1.ITEMS_PER_PAGE;
        delete this.expressQuery['limit'];
    }
    setOrder() {
        if (!this.expressQuery['order']) {
            return;
        }
        const orderFields = this.expressQuery['order'].split(',');
        for (const field of orderFields) {
            const orderCriteria = this.getOrderCriteria(field);
            this.typeORMQuery['order'] = Object.assign(Object.assign({}, this.typeORMQuery['order']), { [field.substr(1, field.length)]: orderCriteria });
        }
        delete this.expressQuery['order'];
    }
    setRelations() {
        if (!this.expressQuery['with']) {
            return;
        }
        const relations = this.expressQuery['with'].split(',');
        this.typeORMQuery['relations'] = relations;
        delete this.expressQuery['with'];
    }
    getOrderCriteria(field) {
        if (field.startsWith('+')) {
            return 'ASC';
        }
        else if (field.startsWith('-')) {
            return 'DESC';
        }
        else {
            throw new Error(`No order set for <${field}>. Prefix with one of these: [+, -]`);
        }
    }
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=query-builder.js.map