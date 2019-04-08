// firebase_subscribe.js
firebase.initializeApp({
    messagingSenderId: '709026399979'
});

// браузер поддерживает уведомления
// вообще, эту проверку должна делать библиотека Firebase, но она этого не делает
if ('Notification' in window) {
    var messaging = firebase.messaging();

    // пользователь уже разрешил получение уведомлений
    // подписываем на уведомления если ещё не подписали
    if (Notification.permission === 'granted') {
        subscribe();
    }

    // по клику, запрашиваем у пользователя разрешение на уведомления
    // и подписываем его
    document.getElementById('subscribe').onclick = function () {
        subscribe();
    };

    /*
    // получение фонового уведомления
    messaging.setBackgroundMessageHandler(function(payload) {
        console.log('Received background message', payload);
    });
    */

    // получение активного уведомления
    messaging.onMessage(function(payload) {
        console.log('Received foreground message', payload);
    });
}

function subscribe() {
    // запрашиваем разрешение на получение уведомлений
    messaging.requestPermission()
        .then(function () {
            // получаем ID устройства
            messaging.getToken()
                .then(function (currentToken) {
                    console.log(currentToken);

                    if (!currentToken) {
                        console.warn('Не удалось получить токен.');
                    }
                })
                .catch(function (err) {
                    console.warn('При получении токена произошла ошибка.', err);
                });
    })
    .catch(function (err) {
        console.warn('Не удалось получить разрешение на показ уведомлений.', err);
    });
}
