(function () {

    var $result = document.getElementById("result");

    function update () {
        var result = null
          , input = editor.getValue()
          ;

        try {
            result = ejs.render(input)
            $result.parentNode.style.background = "#27ae60";
        } catch (e) {
            result = e.stack;
            $result.parentNode.style.background = "#c0392b";
        }

        if (/html/.test(location.search)) {
            $result.innerHTML = result;
        } else {
            $result.textContent = result;
        }
    }

    function setStrage () {
        localStorage.setItem('value', editor.getValue());
        console.log('hoge')
    }

    function getStrage () {
        if(localStorage.getItem('value')) {
            editor.setValue(localStorage.getItem('value'));
        } else {
            editor.setValue("ejsを記述すると、右側の緑のパネルにHTMLが吐き出されます。書いた内容は自動的にブラウザで保存され、リロードしても残ります。(キャッシュ等をクリアすると消えてしまいます)");
        }
    }

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/ejs");
    editor.on("change", update);
    editor.on("change", setStrage);
    window.addEventListener('load', getStrage);
    editor.focus();
})();
