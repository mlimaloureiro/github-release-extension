$(document).ready(function() {
  $('#generate').on('click', function() {
    chrome.storage.local.get("releaseData", function (data) {
      buildTable(data['releaseData']);
    });

    function buildTable(data) {
      var head = '| PR  | ISSUE | DESCRIPTION |<br />| ------------- | -------------  | ------------- |<br />';
      var body = '';
      for (var index in data) {
        body += '| ' + data[index]['prlink'] + ' | ' + data[index]['issue'] + ' | ' + data[index]['title'] + ' |<br />';
      }
      $('#result').html(head + body);
    }
  })
});
