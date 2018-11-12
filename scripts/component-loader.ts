// load components in header-primary element
const headerPrimaryElement = document.getElementById("header-primary");
if (headerPrimaryElement !== null) {
    const headerPrimaryComponents = new Vue({
        el: "#header-primary",
        components: {
            "vue-smart-search": vueSmartSearch
        }
    });
}