function getFields(document) {
    var fields = [];
    var inputs = document.getElementsByTagName('input');
    var selects = document.getElementsByTagName('select');
    var textareas = document.getElementsByTagName('textarea');
    fields = fields.concat(parser(inputs));
    fields = fields.concat(parser(selects));
    fields = fields.concat(parser(textareas));
    return fields;
}

function parser(arr) {
    var collection = [];
    var caption;
    var value;
    $.each(arr, function (index, value) {
        if (value.name != '') {
            fieldCaption = ($('label[for=' + value.name + ']').text()).replace('*', '');
            fieldName = value.name;
            fieldValue = value.value;
            var element = {
                name: fieldName,
                caption: fieldCaption,
                value: fieldValue
            };
            collection.push(element);
        }
    });
    return collection;
}

chrome
    .runtime
    .sendMessage({
        action: "getFields",
        data: getFields(document)
    });