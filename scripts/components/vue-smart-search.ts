const vueSmartSearch = Vue.component("vue-smart-search", {
    props: {
        searchAction: {
            type: String,
            required: true
        },
        suggestionAction: {
            type: String,
            required: true
        },
        searchTerm: {
            type: String
        }
    },
    data: function () {
        return {
            searchTermLocal: "",
            showResults: false,
            productList: [],
            categoryList: [],
            ml: []
        }
    },
    beforeMount: function () {
        this.searchTermLocal = this.searchTerm;
    },
    mounted: function () {
        var self = this;

        // hide results when a list is shown + a click event happened outside of the component
        $("body").on("click", function (e) {
            if (self.showResults === true) {
                var clickInSmartSearch = $(e.target).closest(".c-smart-search").length > 0;
                if (clickInSmartSearch === false) {
                    self.showResults = false;
                }
            }
        });
    },
    computed: {
        placeholderSearch: function () {
            var label = _.find(this.ml, function (l) { return l.name == "placeholder.search" });
            return label == null ? "Zoek een product op naam of code" : label.value;
        }
    },
    methods: {
        search: _.debounce(function (e) {
            var self = this;

            self.searchTermLocal = e.target.value;
            self.showResults = false;
            self.productList = [];
            self.categoryList = [];

            if (self.searchTermLocal.length >= 3) {
                $.getJSON(self.suggestionAction, { query: self.searchTermLocal }, function (data) {
                    if (data === null) {
                        return;
                    }

                    self.showResults = true;
                    self.productList = data.productList;
                    self.categoryList = data.categoryList;
                });
            }
        }, 150)
    },
    template: `
            <div class="c-smart-search">
                <form :action="searchAction" method="get" role="form">
                    <div class="input-group">
                        <input type="text" name="searchTerm" class="form-control" autocomplete="off"
                            v-model="searchTermLocal" :placeholder="placeholderSearch" @input="search">
                        <span class="input-group-btn">
                            <button class="btn btn-success" type="submit">
                                <span class="glyphicon glyphicon-search"></span>
                            </button>
                        </span>
                    </div>
                </form>
                <div class="c-smart-search__result-list" v-show="showResults">
                    <div v-show="productList.length > 0">
                        <div class="clearfix">
                            <div class="c-smart-search__result-title pull-right">
                                {{ "Producten" | translation("label.products", ml) }}
                            </div>
                        </div>
                        <ul class="list-unstyled">
                            <li v-for="product in productList">
                                <a :href="product.url">{{ product.name }}</a>
                            </li>
                        </ul>
                    </div>
                    <hr v-show="productList.length > 0 && categoryList.length > 0" />
                    <div v-show="categoryList.length > 0">
                        <div class="clearfix">
                            <div class="c-smart-search__result-title pull-right">
                                {{ "Categorieën" | translation("label.categories", ml) }}
                            </div>
                        </div>
                        <ul class="list-unstyled">
                            <li v-for="category in categoryList">
                                <a :href="category.url">{{ category.name }} <b>({{ category.productCount }})</b></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`
})