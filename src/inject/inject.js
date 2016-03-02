chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(handle, 10);
	var releaseData = [];

	function handle() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			chrome.storage.local.set({releaseData: null});

			var $elements = $(".table-list-item");
			$elements.on('click', updateReleaseData);
		}
	}

	function updateReleaseData(evt) {
		var $pullRequestContainer = $(evt.target).closest('.table-list-item');
		// remove if exists
		for (var index in releaseData) {
			if (releaseData[index]['id'] == $pullRequestContainer[0].id) {
				$pullRequestContainer.css('background-color', '');
				releaseData.splice(index, 1);
				chrome.storage.local.set({releaseData: releaseData});
				return;
			}
		}

		// add
		$pullRequestContainer.css('background-color', '#CCFFE5');

		var titleAnchor = $pullRequestContainer.find('.issue-title-link');
		var regExp = /\[[^)]+\]\[([^)]+)\]/;
		var issue = regExp.exec(titleAnchor.text())[1];
		var title = titleAnchor.text().replace(/\[[^)]+\]\[[^)]+\]/, '').trim();
		var prlink = '#' + titleAnchor.attr('href').substr(titleAnchor.attr('href').lastIndexOf('/') + 1);

		releaseData.push(
			{'id': $pullRequestContainer[0].id, 'issue': issue, 'title': title, 'prlink': prlink }
		);

		chrome.storage.local.set({releaseData: releaseData});
	}
});
