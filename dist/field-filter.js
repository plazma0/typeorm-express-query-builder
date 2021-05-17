"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./filter");
const lookup_enum_1 = require("./lookup.enum");
const typeorm_1 = require("typeorm");
class FieldFilter extends filter_1.AbstractFilter {
    constructor(query, prop, lookup, value, notOperator = false) {
        super(query, prop, lookup, value);
        this.notOperator = notOperator;
    }
    buildQuery() {
        let queryToAdd;
        switch (this.lookup) {
            case lookup_enum_1.LookupFilter.EXACT:
                queryToAdd = { [this.prop]: this.value };
                break;
            case lookup_enum_1.LookupFilter.CONTAINS:
                queryToAdd = { [this.prop]: typeorm_1.Like(`%${this.value}%`) };
                break;
            case lookup_enum_1.LookupFilter.STARTS_WITH:
                queryToAdd = { [this.prop]: typeorm_1.Like(`${this.value}%`) };
                break;
            case lookup_enum_1.LookupFilter.ENDS_WITH:
                queryToAdd = { [this.prop]: typeorm_1.Like(`%${this.value}`) };
                break;
            case lookup_enum_1.LookupFilter.IS_NULL:
                queryToAdd = { [this.prop]: typeorm_1.IsNull() };
                break;
            case lookup_enum_1.LookupFilter.LT:
                queryToAdd = { [this.prop]: typeorm_1.LessThan(this.value) };
                break;
            case lookup_enum_1.LookupFilter.LTE:
                queryToAdd = { [this.prop]: typeorm_1.LessThanOrEqual(this.value) };
                break;
            case lookup_enum_1.LookupFilter.GT:
                queryToAdd = { [this.prop]: typeorm_1.MoreThan(this.value) };
                break;
            case lookup_enum_1.LookupFilter.GTE:
                queryToAdd = { [this.prop]: typeorm_1.MoreThanOrEqual(this.value) };
                break;
            case lookup_enum_1.LookupFilter.IN:
                queryToAdd = { [this.prop]: typeorm_1.In(this.value.split(',')) };
                break;
            case lookup_enum_1.LookupFilter.BETWEEN:
                const rangeValues = this.value.split(',');
                queryToAdd = { [this.prop]: typeorm_1.Between(+rangeValues[0], +rangeValues[1]) };
                break;
        }
        if (this.notOperator) {
            queryToAdd[this.prop] = typeorm_1.Not(queryToAdd[this.prop]);
        }
        this.query['where'] = Object.assign(Object.assign({}, this.query['where']), queryToAdd);
    }
}
exports.FieldFilter = FieldFilter;
//# sourceMappingURL=field-filter.js.map