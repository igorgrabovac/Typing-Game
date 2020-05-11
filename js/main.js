(function() {
    let start = $('#start');
    let mainInput = $('.maininput');
    let lines = $('.line');
    let allText = [];
    let result = $("#result");
    let score = 0;


    start.on('click', startGame);

    function startGame() {
        $(this).hide();
        mainInput.focus();
        let speed = 1;
        let textLength = 3;
        let typingWords = words.filter(word => word.length == textLength);

        let speedUp = setInterval(function() {
            textLength++;
            typingWords = words.filter(word => word.length == textLength);
        }, 20000)

        let lvl = 6;
        mainInput.on('keyup', checkInput);

        function checkInput() {
            let inputVal = $(this).val();
            let self = $(this);
            if (allText.includes(inputVal)) {
                let index = allText.indexOf(inputVal);
                allText.splice(index, 1);
                $('span').filter(function() {
                    return $(this).text() == inputVal;
                }).css({ backgroundColor: "green" }).fadeOut(400, function() {
                    $(this).remove();
                })
                self.val("");
                score++;
                result.html(score);

            }

        }

        function insertSpans() {
            for (var i = 0; i < lines.length; i++) {
                let rand = Math.floor(Math.random() * 20);
                if (rand <= lvl) {
                    let text = choseText();
                    allText.push(text);
                    $(lines[i]).append("<span>" + text + "</span>");
                }
            }
            setTimeout(insertSpans, 7000);
        }
        insertSpans();



        function choseText() {
            let rand = Math.floor(Math.random() * typingWords.length);
            let savedWord = typingWords[rand];
            typingWords.splice(rand, 1);
            return savedWord;
        }
        let moveSpans = setInterval(function() {
            let spans = $("span");
            spans.css({
                left: "+=" + speed
            })
            $(spans).each(function(index, el) {
                let position = $(el).position().left;
                if (position > 850) {
                    clearAllIntervals();
                } else if (position > 700) {
                    $(el).addClass("spanRed");
                }
            })
        }, 80);

        function clearAllIntervals() {
            clearInterval(moveSpans);
        }
    }
})()