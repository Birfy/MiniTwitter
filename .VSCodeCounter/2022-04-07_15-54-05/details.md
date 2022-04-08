# Details

Date : 2022-04-07 15:54:05

Directory d:\Projects\MiniTwitter

Total : 50 files,  6755 codes, 187 comments, 768 blanks, all 7710 lines

[summary](results.md) / details / [diff summary](diff.md) / [diff details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [Dockerfile](/Dockerfile) | Docker | 9 | 1 | 1 | 11 |
| [README.md](/README.md) | Markdown | 1 | 0 | 0 | 1 |
| [app.js](/app.js) | JavaScript | 82 | 10 | 25 | 117 |
| [database.js](/database.js) | JavaScript | 16 | 0 | 5 | 21 |
| [middleware.js](/middleware.js) | JavaScript | 7 | 0 | 0 | 7 |
| [package-lock.json](/package-lock.json) | JSON | 3,897 | 0 | 1 | 3,898 |
| [package.json](/package.json) | JSON | 31 | 0 | 1 | 32 |
| [public/css/login.css](/public/css/login.css) | CSS | 39 | 0 | 5 | 44 |
| [public/css/main.css](/public/css/main.css) | CSS | 654 | 10 | 144 | 808 |
| [public/js/chatPage.js](/public/js/chatPage.js) | JavaScript | 148 | 1 | 54 | 203 |
| [public/js/clientSocket.js](/public/js/clientSocket.js) | JavaScript | 16 | 2 | 8 | 26 |
| [public/js/common.js](/public/js/common.js) | JavaScript | 456 | 81 | 143 | 680 |
| [public/js/followersAndFollowing.js](/public/js/followersAndFollowing.js) | JavaScript | 17 | 0 | 5 | 22 |
| [public/js/home.js](/public/js/home.js) | JavaScript | 5 | 0 | 2 | 7 |
| [public/js/inboxPage.js](/public/js/inboxPage.js) | JavaScript | 54 | 2 | 11 | 67 |
| [public/js/newMessage.js](/public/js/newMessage.js) | JavaScript | 65 | 3 | 26 | 94 |
| [public/js/postPage.js](/public/js/postPage.js) | JavaScript | 5 | 0 | 1 | 6 |
| [public/js/profile.js](/public/js/profile.js) | JavaScript | 20 | 0 | 4 | 24 |
| [public/js/search.js](/public/js/search.js) | JavaScript | 27 | 0 | 8 | 35 |
| [routes/api/chats.js](/routes/api/chats.js) | JavaScript | 77 | 7 | 26 | 110 |
| [routes/api/messages.js](/routes/api/messages.js) | JavaScript | 35 | 1 | 7 | 43 |
| [routes/api/posts.js](/routes/api/posts.js) | JavaScript | 171 | 29 | 55 | 255 |
| [routes/api/users.js](/routes/api/users.js) | JavaScript | 111 | 2 | 27 | 140 |
| [routes/loginRoutes.js](/routes/loginRoutes.js) | JavaScript | 40 | 0 | 9 | 49 |
| [routes/logoutRoutes.js](/routes/logoutRoutes.js) | JavaScript | 12 | 0 | 3 | 15 |
| [routes/messagesRoutes.js](/routes/messagesRoutes.js) | JavaScript | 72 | 11 | 17 | 100 |
| [routes/notificationRoutes.js](/routes/notificationRoutes.js) | JavaScript | 14 | 1 | 3 | 18 |
| [routes/postRoutes.js](/routes/postRoutes.js) | JavaScript | 15 | 0 | 3 | 18 |
| [routes/profileRoutes.js](/routes/profileRoutes.js) | JavaScript | 50 | 3 | 13 | 66 |
| [routes/registerRoutes.js](/routes/registerRoutes.js) | JavaScript | 53 | 4 | 16 | 73 |
| [routes/searchRoutes.js](/routes/searchRoutes.js) | JavaScript | 24 | 0 | 6 | 30 |
| [routes/uploadRoutes.js](/routes/uploadRoutes.js) | JavaScript | 10 | 0 | 3 | 13 |
| [schemas/ChatSchema.js](/schemas/ChatSchema.js) | JavaScript | 22 | 0 | 7 | 29 |
| [schemas/MessageSchema.js](/schemas/MessageSchema.js) | JavaScript | 22 | 0 | 8 | 30 |
| [schemas/PostSchema.js](/schemas/PostSchema.js) | JavaScript | 32 | 0 | 6 | 38 |
| [schemas/UserSchema.js](/schemas/UserSchema.js) | JavaScript | 55 | 0 | 13 | 68 |
| [templates/chatPage.pug](/templates/chatPage.pug) | Pug | 25 | 0 | 9 | 34 |
| [templates/followersAndFollowing.pug](/templates/followersAndFollowing.pug) | Pug | 14 | 2 | 5 | 21 |
| [templates/home.pug](/templates/home.pug) | Pug | 7 | 0 | 4 | 11 |
| [templates/inboxPage.pug](/templates/inboxPage.pug) | Pug | 8 | 2 | 5 | 15 |
| [templates/layouts/login-layout.pug](/templates/layouts/login-layout.pug) | Pug | 13 | 1 | 5 | 19 |
| [templates/layouts/main-layout.pug](/templates/layouts/main-layout.pug) | Pug | 44 | 2 | 9 | 55 |
| [templates/login.pug](/templates/login.pug) | Pug | 10 | 0 | 3 | 13 |
| [templates/mixins/mixins.pug](/templates/mixins/mixins.pug) | Pug | 153 | 7 | 20 | 180 |
| [templates/newMessage.pug](/templates/newMessage.pug) | Pug | 11 | 2 | 5 | 18 |
| [templates/notificationsPage.pug](/templates/notificationsPage.pug) | Pug | 8 | 2 | 5 | 15 |
| [templates/postPage.pug](/templates/postPage.pug) | Pug | 8 | 0 | 5 | 13 |
| [templates/profilePage.pug](/templates/profilePage.pug) | Pug | 53 | 1 | 13 | 67 |
| [templates/register.pug](/templates/register.pug) | Pug | 25 | 0 | 6 | 31 |
| [templates/searchPage.pug](/templates/searchPage.pug) | Pug | 12 | 0 | 8 | 20 |

[summary](results.md) / details / [diff summary](diff.md) / [diff details](diff-details.md)