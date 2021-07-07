$(function () {
    const socket = io.connect();
    const $user_mess = $("#userMess");
    const $send_mess = $("#sendMess");
    const $user_name = $("#userName");
    const $send_name = $("#sendUserName");
    const $all_mess = $("#allMess");
    const $feedback = $("#feedback");
    const $fieldMess = $("#fieldMess");
    const min = 1;
    const max = 6;
    let $random = Math.floor(Math.random() * (max - min)) + min;

    function addZeroTime(n) {
        return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }

    function showTimeNow() {
        let today = new Date();
        let hour = today.getHours();
        let min = today.getMinutes();
        let sec = today.getSeconds();

        return `${addZeroTime(hour)}:${addZeroTime(min)}:${addZeroTime(sec)}`;
    }

    function sendMess() {
        socket.emit("send_mess", {
            time: `[${showTimeNow()}]`,
            message: $user_mess.val(),
            className: alertClass
        });
        $user_mess.val('');
    }

    function sendName() {
        if ($user_name.val().trim().length === 0) {
            $user_name.val('');
            return
        }
        socket.emit("change_username", {username: $user_name.val()})
    }

    $user_mess.keydown(ev => {
        if (ev.keyCode === 13) {
            sendMess();
        }
    });

    $send_mess.click(() => {
        sendMess()
    });

    $user_name.keydown(ev => {
        if (ev.keyCode === 13) {
            sendName();
        }
    });

    $send_name.click(() => {
        sendName();
    });

    $user_mess.bind("keypress", () => {
        socket.emit("typing");
    });


    let alertClass;
    switch ($random) {
        case 1:
            alertClass = "1";
            break;
        case 2:
            alertClass = "2";
            break;
        case 3:
            alertClass = "3";
            break;
        case 4:
            alertClass = "4";
            break;
        case 5:
            alertClass = "5";
            break;
        case 6:
            alertClass = "6";
            break;
    }

    socket.on("add_mess", data => {
        $feedback.html('');

        $all_mess.append(
            "<div class='alert alert-" + data.className +
            "'<p>" +
            "<span class='time'>" + data.time +
            "</span>" +
            "<span class='user'>" + data.username + ": " +
            "</span>" +
            "<span class='mess-user'>" + data.message +
            "</span>" +
            "</p>"
        );

        $fieldMess.animate({
            scrollTop: $all_mess.height()
        }, 300);
    });

    socket.on("typing", data => {
        $feedback.html(
            "<p><i class='feedback-text'>" + data.username + " prints the message..." + "</i></p>"
        );
    });
});
