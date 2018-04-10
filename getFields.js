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
    $.each(arr, function (index, key) {
        if (key.name != '') {
            fieldCaption = ($('label[for=' + key.name + ']').text()).replace('*', '');
            fieldName = key.name;
            fieldValue = key.value;
            fieldType = key.type;
            var element = {
                name: fieldName,
                caption: fieldCaption,
                value: fieldValue,
                type: fieldType
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