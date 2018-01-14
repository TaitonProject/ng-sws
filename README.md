# NgSws

Это проект для разработки библиотек\компонентов\модулей для Angular 2\4\5

## Ход создания и публикации модуля
1. В папке libs необходимо создать папку с названием создаваемого модуля + префикс 'sws'.
2. В ней необходимо создать package.json (по примеру с sws-pagination)
3. В папке src создать модуль\компоненты\сервис и т.д. (как и в обычном проекте)
4. В папке src оздать файл public_api.ts, в котором указать пути к компонентам\модулям, которые были созданы.
5. В package.json, относящегося ко всему проекту, прописать дополнитульную команду (по примеру с sws-pagination): 
    "build:название_модуля": "rimraf dist && ng-packagr -p libs/sws-название_модуля/package.json",

6. В корневом каталоге всего проекта запустить команду npm run build:азвание_модуля
7. После того, как библиотека будет собрана, необходимо войти в личный кабинет npm (создан отдельный аккаунт npm для данного проекта)
8. Перейти в корневой каталог собранной библиотеки и прописать npm publish
9. Изменения запушить на git, при изменении в существующих модулях необходимо поднимать версию пакета npm (https://docs.npmjs.com/cli/version)
