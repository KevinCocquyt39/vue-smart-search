Vue.filter("translation", function (value, labelName, ml) {
    let label = _.find(ml, function (l) { return l.name == labelName });
    return label == null ? value : label.value;
});