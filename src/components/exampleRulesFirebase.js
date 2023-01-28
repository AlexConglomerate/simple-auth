const a = {
    "rules": {
        "user": {
            ".read": "auth !=null", // читать могут только авторизованные пользователи
            "$uid": {
                ".write": "$uid === auth.uid" // перезаписывать может только этот пользователь
            }
        },
        "quality": {
            ".read": true, // читать могут все
            ".write": false // редактировать не может никто
        },
        "profession": {
            ".read": true,
            ".write": false
        },
        "comment": {
            ".read": "auth !=null",
            ".indexOn": [
                "pageId"
            ],
            "$uid": {
                ".write": "auth!=null&& (data.child('userId').val() === auth.uid) || (newData.child('userId').val() === auth.uid)"
            }
        }
    }
}