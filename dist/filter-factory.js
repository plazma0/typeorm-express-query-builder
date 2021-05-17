"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lookup_enum_1 = require("./lookup.enum");
const field_filter_1 = require("./field-filter");
class FilterFactory {
    get(query, key, value) {
        if (this.isFieldFilter(key)) {
            const field = key.split(lookup_enum_1.LookupDelimiter.LOOKUP_DELIMITER)[0];
            const notQuery = key.includes(`${lookup_enum_1.LookupDelimiter.LOOKUP_DELIMITER}${lookup_enum_1.LookupFilter.NOT}`);
            const lookup = key.includes(lookup_enum_1.LookupDelimiter.LOOKUP_DELIMITER)
                ? key.split(lookup_enum_1.LookupDelimiter.LOOKUP_DELIMITER)[notQuery ? 2 : 1]
                : lookup_enum_1.LookupFilter.EXACT;
            return new field_filter_1.FieldFilter(query, field, lookup, value, notQuery);
        }
    }
    isFieldFilter(key) {
        if (!key.includes(lookup_enum_1.LookupDelimiter.RELATION_DELIMITER)) {
            return true;
        }
        return false;
    }
}
exports.FilterFactory = FilterFactory;
//# sourceMappingURL=filter-factory.js.map