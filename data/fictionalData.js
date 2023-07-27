export const fictionalDataForForum = {
    topics: [
        {
            id: -1,
            title: "Карелия",
            content: "кто там бывал? делитесь впечатлениями",
            createdAt: "2023-07-14T11:55:56.228Z",
            updatedAt: "2023-07-23T22:08:00.974Z",
            userId: "1"
        },
        {
            id: -3,
            title: "Флудилка",
            content: "о разном",
            createdAt: "2023-07-14T15:34:51.486Z",
            updatedAt: "2023-07-14T18:34:39.000Z",
            userId: "1"
        },
        {
            id: -18,
            title: "Крым",
            content: "описание темы",
            createdAt: null,
            updatedAt: "2023-07-23T22:06:28.075Z",
            userId: "1"
        }
    ],
    users: [
        {
            id: "1",
            name: "user",
            email: "user@example.com",
            emailVerified: null,
            image: "",
            role: ""
        }
    ]
};

export const fictionalDataForTopic = {
    topic: {
        id: -1,
        title: "Тема",
        content: "",
        createdAt: "2023-07-14T11:55:56.228Z",
        updatedAt: "2023-07-23T22:08:00.974Z",
        userId: "1"
    },
    posts: [
        {
            id: 1,
            content: "Всем привет!",
            createdAt: "2023-07-14T13:01:16.126Z",
            updatedAt: "2023-07-23T16:43:04.832Z",
            userId: "1",
            topicId: 1
        },
        {
            id: 3,
            content: "Привет!",
            createdAt: "2023-07-14T18:41:03.986Z",
            updatedAt: "2023-07-14T21:40:41.000Z",
            userId: "1",
            topicId: 1
        }
    ],
    users: [
        {
            id: "1",
            name: "",
            email: "mail@example.com",
            emailVerified: null,
            image: "",
            role: ""
        }
    ]
};