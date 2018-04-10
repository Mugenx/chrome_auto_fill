chrome
  .runtime
  .onMessage
  .addListener(function (request, sender) {
    if (request.action == "getFields" && request.data) {
      $('#content').empty();
      $.each(request.data, function (index, value) {
        var newRow = "<tr><td><label for=" + value.name + ">" + value.caption +
          "</label></td><td><input type='text' name=" + value.name + " value=" + value.value + "></td></tr>";
        $('#content').append(newRow);
      });
    }
  });

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
  var data = [];
  $("input").each(function () {
    var element = {
      name: $(this).attr("name"),
      value: $(this).val()
    };
    data.push(element);
  });
  chrome
    .tabs
    .executeScript(null, {
      code: 'var data = ' + JSON.stringify(data)
    }, function () {
      chrome
        .tabs
        .executeScript(null, {
          file: 'setFields.js'
        });
    });
});