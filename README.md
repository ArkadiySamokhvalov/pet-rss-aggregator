[![Actions Status](https://github.com/IvanSavDev/frontend-project-lvl3/workflows/nodejs/badge.svg)](https://codeclimate.com/github/ArkadiySamokhvalov/rss-aggregator/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/e2d5a5acc024f6736236/maintainability)](https://codeclimate.com/github/ArkadiySamokhvalov/rss-aggregator/maintainability)

[![en](https://img.shields.io/badge/lang-en-blue.svg)](https://github.com/ArkadiySamokhvalov/rss-aggregator/blob/main/README.en.md)

# Описание
Веб-приложение для автоматического сбора сообщений из источников, экспортирующих в форматы RSS, например, заголовки новостей, блогов, подкастов и видеохостингов.

## Публикация:
[Посмотреть проект](https://rss-aggregator-o6xkx4kvm-arkadiysamokhvalov.vercel.app)

## Технологический стек:
- Сетевые запросы - **[axios](https://github.com/axios/axios)**
- Верстка страницы - **[bootstrap](https://getbootstrap.com)**
- Работа с текстом - **[i18next](https://www.i18next.com)**
- Дополнительные функции - **[lodash](https://lodash.com)**
- Наблюдение за изменениями - **[on-change](https://github.com/sindresorhus/on-change)**
- Валидация - **[yup](https://github.com/jquense/yup)** 

## Установка:
1. Make sure you have installed [Node.js](https://nodejs.org/en/) no lower version 12: ```node -v```.
2. Clone repository: ```git@github.com:ArkadiySamokhvalov/rss-aggregator.git```.
3. Change directory to rss-aggregator
4. Run the command: ```make install```.

```shell
$ git clone git@github.com:ArkadiySamokhvalov/rss-aggregator.git
$ cd rss-aggregator
$ make install
```

## Режим разработки: 
```shell
$ make develop
```

## Сборка проекта: 
```shell
$ make build
```