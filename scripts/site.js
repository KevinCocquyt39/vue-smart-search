var TestProject = (function () {
    "use strict";

    function initSmartSearch() {
        headerPrimaryComponents.$refs.smartSearch.ml = [
            { name: "label.products", value: Multilang.SmartSearchLabelProducts },
            { name: "label.categories", value: Multilang.SmartSearchLabelCategories },
            { name: "placeholder.search", value: Multilang.SmartSearchPlaceholder }
        ];
    }

    return {
        initSmartSearch: initSmartSearch
    };

})();

TestProject.initSmartSearch();