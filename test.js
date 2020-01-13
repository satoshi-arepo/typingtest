$(function() {
	var wordlist = $("#wordlist"),
	    input = $("input"),
	    timer;
	function starttest() {
		wordlist.addClass("loading").text("Loading...");
		input.val("")
		     .attr("placeholder", "")
		     .prop("disabled", true);
		$.get("dict.php", function(data) {
			var list = data.split("\n"), html = "";
			list.forEach(item => html += "<span>" + item + "</span> ");
			wordlist.removeClass("loading").html(html);
			input.prop("disabled", false).focus();
			var word = $("span").first().addClass("current");
			timerSet = false;
			clearInterval(timer);
			input.off();
			$("#time").text("1:00");
			input.on("input", function() {
				if (!timerSet) startTimer();
				var typed = input.val();
				if (typed.slice(-1) == " ") {
					if (typed = typed.trim()) {
						word.removeClass("current");
						word.addClass("done");
						if (word.text() != typed)
							word.addClass("typo");
						word = word.next();
						if (word.offset().top - word.parent().offset().top > 100)
							word.parent()[0].scrollTop += 20;
					}
					input.val("");
				} else if (word.text().indexOf(typed) != 0)
					word.addClass("typo");
				else word.removeClass("typo");
				word.addClass("current");
			});
			function startTimer() {
				timerSet = true;
				timeLeft = 60;
				timer = setInterval(function() {
					--timeLeft;
					$("#time").text("0:" + timeLeft.toString());
					if (timeLeft == 0) {
						var count = 0;
						$(".done").not(".typo").each(function() {
							count += $(this).text().length + 1;
						});
						clearInterval(timer);
						input.off();
						input[0].disabled = true;
						input.val("");
						count = Math.round(count / 5) + " WPM";
						input[0].setAttribute("placeholder", count);
						$("#time").text("1:00");
					}
				}, 1000);
			}
		});
	}
	$("#retry").click(starttest);
	starttest();
});
