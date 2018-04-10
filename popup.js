chrome
  .runtime
  .onMessage
  .addListener(function (request, sender) {
    if (request.action == "getFields" && request.data) {
      $('#content').empty();
      $.each(request.data, function (index, value) {
        var newRow
        if (value.type) {
          if (value.type == 'text') {
            newRow = "<tr><td><label for=" + value.name + ">" + value.caption +
              "</label></td><td><input type='text' name=" + value.name + " value=" + value.value + "></td></tr>";
          } else if (value.type == 'select-one') {
            newRow =
              "<tr><td>" +
              "<label for=" + value.name + ">" + value.caption + "</label>" +
              "</td><td>" +
              "<select name=" + value.name + ">" +
              "<option value=" + value.value + " selected>" + value.value + "</option>" +
              "</select></td></tr>";
          } else if (value.type == 'textarea') {
            newRow = "<tr><td><label for=" + value.name + ">" + value.caption +
              "</label></td><td><textarea type='text' name=" + value.name + ">" + value.value + "</textarea></td></tr>";
          }
          $('#content').append(newRow);
        }
      });
    }
  });

function collectData(type) {
  var data = [];
  $(type).each(function () {
    var element = {
      name: $(this).attr("name"),
      value: $(this).val()
    };
    data.push(element);
  });
  return data;
}

$('#get').on('click', function () {
  chrome
    .tabs
    .executeScript(null, {
      file: "getFields.js"
    }, function () {
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
});

$('#set').on('click', function () {
  var fields = [];
  fields = fields.concat(collectData('input'));
  fields = fields.concat(collectData('select'));
  fields = fields.concat(collectData('textarea'));
  chrome
    .tabs
    .executeScript(null, {
      code: 'var fields = ' + JSON.stringify(fields)
    }, function () {
      chrome
        .tabs
        .executeScript(null, {
          file: 'setFields.js'
        });
    });
});