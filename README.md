# NgSws

* Это проект для разработки библиотек\компонентов\модулей для Angular 2\4\5
* Цель данного проекта - создание и тестирование модулей Angular, которые соответствуют стандарту [Angular Package Format](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview), с дальнейшей их публикацией на NPM по отдельности.

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

## Доп. информация

* Стили для компонентов пишутся в их локальных файлах (название_модуля.component.css\scss). 
* Для более подробной инйформации: [git проекта на основании котрого был сделан данный](https://github.com/dherges/ng-packagr), [доп. статья](https://medium.com/@nikolasleblanc/building-an-angular-4-component-library-with-the-angular-cli-and-ng-packagr-53b2ade0701e) 

## 
