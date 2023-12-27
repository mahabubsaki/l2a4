# Course Review with Authentication and Authorization

This project is a course review system with authentication. Add reviews for each course.
Courses, reviews, and users are stored in MongoDB. In this project mongoose (Mongoose is an Object Data Modeling (ODM) library specifically designed for MongoDB and Node.js.) is used for database operations.

- Password change rules are implemented, including password history tracking and uniqueness checks.
- The system ensures that sensitive information (e.g., passwords) is not included in response data.
- JWT tokens are used for secure user authentication and authorization.
- JWT tokens will expire after 10 hour.
- The system allows users to create, read, update, and delete courses.
- The system allows users to add reviews for each course.
- The system have two kinds of users: `admin` and `user`.
- Admin users can create, read, update courses, and create and read categories.
- Normal users can create, read reviews.

## Tools Used

- [TypeScript](https://www.typescriptlang.org/) - TypeScript
- [Node.js](https://nodejs.org/en/) - JavaScript runtime environment
- [Express.js](https://expressjs.com/) - Node.js framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing and salting
- [JWT](https://jwt.io/) - JSON Web Token
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variables
- [Zod](https://zod.dev/) - TypeScript validation

This enhanced system ensures secure and organized management of users, courses, and related data within the online course platform. It offers a scalable architecture with features tailored for both administrators and regular users.

# Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/Porgramming-Hero-web-course/l2b2a4-course-review-with-auth-mahabubsaki.git
```

### Go to the project directory

```bash
cd .\l2b2a4-course-review-with-auth-mahabubsaki\
```

## 2. Install the dependencies

```bash
npm install
```

## 3. Create a file named `.env` and then Add environment variables

To run this project, you will need to add the following environment variables to your .env file

```bash
PORT=5000
DATABASE_URL=your-database-uri
JWT_SECRET=your-secret
```

## 4. Start the server

```bash
npm run dev
```

<br>
<br>

# API Reference

<br>

## Register User

- ### Route: `/api/auth/register`

- ### Method: POST

#### This endpoint allows users to register and create an account.

### Request Body

```json
{
  "username": "john1_user",
  "email": "john1@user.com",
  "password": "123456",
  "role": "user"
}
```

### Response

```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "username": "john1_user",
    "email": "john1@user.com",
    "role": "user",
    "_id": "6589258cc8386cffe645a8e5",
    "createdAt": "2023-12-25T06:47:40.054Z",
    "updatedAt": "2023-12-25T06:47:40.054Z"
  }
}
```

<br>

## Login User

- ### Route: `/api/auth/login`

- ### Method: POST

#### This endpoint allows users to login and get access token.

### Request Body

```json
{
  "username": "john1_user",
  "password": "123456"
}
```

### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User login successful",
  "data": {
    "user": {
      "_id": "6589258cc8386cffe645a8e5",
      "username": "john1_user",
      "email": "john1@user.com",
      "role": "user"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThiYmE2MzM2MTFhNjdkZDIwY2U4ODQiLCJyb2xlIjoidXNlciIsImVtYWlsIjoiam9objIzMTMxMjNAZXhhbXBsZS5jb20iLCJpYXQiOjE3MDM2NTYxMDgsImV4cCI6MTcwMzY5MjEwOH0.3xNQ86PWrKgWuryXnPjQaJxEay0GQGhyWRHDu-4-6t0"
  }
}
```

## Change User Password

- ### Route: `api/auth/change-password`

- ### Method: POST

### Request Headers

```json
Authorization - ADMIN JWT TOKEN
```

### Request Body

```json
{
  "currentPassword": "123456",
  "newPassword": "new123456"
}
```

### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Password changed successfully",
  "data": {
    "_id": "6589258cc8386cffe645a8e5",
    "username": "john1_user",
    "email": "john1@user.com",
    "role": "user",
    "createdAt": "2023-12-25T06:47:40.054Z",
    "updatedAt": "2023-12-25T06:47:40.054Z"
  }
}
```

## Create Category

- ### Route: `/api/categories`

- ### Method: POST

### Request Headers

```json
Authorization - ADMIN JWT TOKEN
```

### Request Body

```json
{
  "name": "new category"
}
```

### Response

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Category created successfully",
  "data": {
    "name": "new category",
    "createdBy": "65890a575d9bff8a3734d7a1",
    "_id": "65893622f3a3fe859ab6ae25",
    "createdAt": "2023-12-25T07:58:26.202Z",
    "updatedAt": "2023-12-25T07:58:26.202Z"
  }
}
```

## Get all Categories

- ### Route: `/api/categories`
- ### Method: GET

### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Categories retrieved successfully",
  "data": {
    "categories": [
      {
        "_id": "65890b39610a73e0cc4ca19f",
        "name": "Web Development",
        "createdBy": {
          "_id": "65890a575d9bff8a3734d7a1",
          "username": "admin",
          "email": "admin@admin.com",
          "role": "admin"
        },
        "createdAt": "2023-12-25T04:55:21.966Z",
        "updatedAt": "2023-12-25T04:55:21.966Z"
      }
    ]
  }
}
```

## Create Courses

- ### Route: `/api/courses`
- ### Method: POST

### Request Headers

```json
Authorization - ADMIN JWT TOKEN
```

### Request Body

```json
{
  "title": "Introductory Human Physiology",
  "instructor": "Jennifer Carbrey",
  "categoryId": "658b9a3882d3fa3cea87c104",
  "price": 599.99,
  "tags": [
    {
      "name": "Health",
      "isDeleted": false
    },
    {
      "name": "physiology ",
      "isDeleted": false
    },
    {
      "name": "Medical Science",
      "isDeleted": false
    }
  ],
  "startDate": "2023-08-23",
  "endDate": "2024-04-24",
  "language": "English",
  "provider": "Coursera",
  "details": {
    "level": "Advanced",
    "description": "Explore the fascinating world of human physiology and learn about the body's organ systems, their functions, and how they maintain health. In this comprehensive course, you will."
  }
}
```

### Response

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Course created successfully",
  "data": {
    "title": "Introductory Human Physiology",
    "instructor": "Jennifer Carbrey",
    "categoryId": "65890c97c4814ed3fdf26a52",
    "price": 599.99,
    "tags": [
      {
        "name": "Health",
        "isDeleted": false
      },
      {
        "name": "physiology ",
        "isDeleted": false
      },
      {
        "name": "Medical Science",
        "isDeleted": false
      }
    ],
    "startDate": "2023-08-23",
    "endDate": "2024-04-24",
    "language": "English",
    "provider": "Coursera",
    "details": {
      "level": "Advanced",
      "description": "Explore the fascinating world of human physiology and learn about the body's organ systems, their functions, and how they maintain health. In this comprehensive course, you will."
    },
    "createdBy": "658b980523a9418b9a80933d",
    "_id": "65894ffc38c7648767754779",
    "createdAt": "2023-12-25T09:48:44.786Z",
    "updatedAt": "2023-12-25T09:48:44.786Z",
    "durationInWeeks": 35
  }
}
```

## Get All Courses

- ### Route: `/api/courses`
- ### Method: GET

### Queries

| SortBy Query      | Example                             | Description                              |
| :---------------- | :---------------------------------- | :--------------------------------------- |
| `title`           | /api/courses?sortBy=title           | **Optional**. Sort using course title    |
| `price`           | /api/courses?sortBy=price           | **Optional**. Sort using course prices   |
| `startDate`       | /api/courses?sortBy=startDate       | **Optional**. Sort using startDate       |
| `endDate`         | /api/courses?sortBy=endDate         | **Optional**. Sort using endDate         |
| `language`        | /api/courses?sortBy=language        | **Optional**. Sort using endDate         |
| `durationInWeeks` | /api/courses?sortBy=durationInWeeks | **Optional**. Sort using durationInWeeks |

| Filter Queries    | Example                        | Description                                                                    |
| :---------------- | :----------------------------- | :----------------------------------------------------------------------------- |
| `page`            | /api/courses?page=1            | **Optional**. Specifies the page number for paginated results                  |
| `limit`           | /api/courses?limit=10          | **Optional**. Sets the number of items per page                                |
| `sortBy`          | /api/courses?sortBy=title      | **Optional**. Specifies the field by which the results should be sorted        |
| `sortOrder`       | /api/courses?sortOrder=desc    | **Optional**. Determines the sorting order, either 'asc' (ascending) or 'desc' |
| `minPrice`        | /api/courses?minPrice=130      | **Optional**. Filters results by a price range                                 |
| `maxPrice`        | /api/courses?maxPrice=200      | **Optional**. Filters results by a price range                                 |
| `level`           | /api/courses?level=beginner    | **Optional**. Filters results by the difficulty level of the course            |
| `durationInWeeks` | /api/courses?durationInWeeks=5 | **Optional**. Filters results by the duration of the course in weeks           |
| `provider`        | /api/courses?provider=PH       | **Optional**. Filters results by the course provider                           |
| `language`        | /api/courses?language=Bangla   | **Optional**. Filters results by the language of the course                    |

### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Courses retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 1,
    "total": 1
  },
  "data": {
    "courses": [
      {
        "_id": "658914dc5c6b1f5e1d6531e3",
        "title": "Mastering Algorithms: A Comprehensive Guide",
        "instructor": "Alexandra Johnson",
        "categoryId": "65890ed5c4814ed3fdf26a6a",
        "price": 359.99,
        "tags": [
          {
            "name": "Programming",
            "isDeleted": false
          },
          {
            "name": "Web Development",
            "isDeleted": false
          },
          {
            "name": "JavaScript",
            "isDeleted": false
          }
        ],
        "startDate": "2023-10-01",
        "endDate": "2023-12-31",
        "language": "English",
        "provider": "Code Wizards",
        "details": {
          "level": "Intermediate",
          "description": "A comprehensive course on web development with a focus on JavaScript."
        },
        "createdBy": {
          "_id": "65890a575d9bff8a3734d7a1",
          "username": "admin",
          "email": "admin@admin.com",
          "role": "admin"
        },
        "createdAt": "2023-12-25T05:36:28.835Z",
        "updatedAt": "2023-12-25T14:56:34.073Z",
        "durationInWeeks": 13
      }
    ]
  }
}
```

## Update Course

- ### Route: `/api/courses/:courseId`
- ### Method: PUT

| Parameter  | Description                                    |
| :--------- | :--------------------------------------------- |
| `courseId` | **Required**. courseId is id of item to Update |

### Request Headers

```json
Authorization - ADMIN JWT TOKEN
```

### Request Body

```json
{
  "price": 59.99,
  "tags": [
    { "name": "Programming", "isDeleted": false },
    { "name": "Web Development", "isDeleted": false },
    { "name": "JavaScript", "isDeleted": false }
  ],
  "details": {
    "level": "Intermediate",
    "description": "A comprehensive course on web development with a focus on JavaScript."
  }
}
```

### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Course updated successfully",
  "data": {
    "_id": "658914dc5c6b1f5e1d6531e3",
    "title": "Mastering Algorithms: A Comprehensive Guide",
    "instructor": "Alexandra Johnson",
    "categoryId": "65890ed5c4814ed3fdf26a6a",
    "price": 359.99,
    "tags": [
      {
        "name": "Programming",
        "isDeleted": false
      },
      {
        "name": "Web Development",
        "isDeleted": false
      },
      {
        "name": "JavaScript",
        "isDeleted": false
      }
    ],
    "startDate": "2023-10-01",
    "endDate": "2023-12-31",
    "language": "English",
    "provider": "Code Wizards",
    "details": {
      "level": "Intermediate",
      "description": "A comprehensive course on web development with a focus on JavaScript."
    },
    "createdBy": {
      "_id": "65890a575d9bff8a3734d7a1",
      "username": "sajid_admin",
      "email": "sajid@admin.com",
      "role": "admin"
    },
    "createdAt": "2023-12-25T05:36:28.835Z",
    "updatedAt": "2023-12-25T11:25:35.136Z",
    "durationInWeeks": 13
  }
}
```

## Get Course by ID with Reviews

- ### Route: `/api/courses/:courseId/review`
- ### Method: GET

| Parameter  | Description                                       |
| :--------- | :------------------------------------------------ |
| `courseId` | **Required**. courseId is Id of the course to get |

### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Course and Reviews retrieved successfully",
  "data": {
    "course": {
      "_id": "6589162200dcc73e01e2336b",
      "title": "Next Level Web Development",
      "instructor": "Jhankar Mahbub",
      "categoryId": "65890b39610a73e0cc4ca19f",
      "price": 69.99,
      "tags": [
        {
          "name": "Programming",
          "isDeleted": false
        },
        {
          "name": "Web Development",
          "isDeleted": false
        }
      ],
      "startDate": "2023-03-15",
      "endDate": "2023-04-14",
      "language": "Bangla",
      "provider": "Programming Hero",
      "details": {
        "level": "Intermediate",
        "description": "Boost Your Web development Career by Learning and Mastering Typescript, Express, Mongoose,Redis, Redux ,Next.js ,DBMS,SQL ,PostgreSQL, AWS, Docker, Unit Testing and many more."
      },
      "durationInWeeks": 5,
      "createdBy": {
        "_id": "65890a575d9bff8a3734d7a1",
        "username": "sajid_admin",
        "email": "sajid@admin.com",
        "role": "admin"
      },
      "createdAt": "2023-12-25T05:41:54.415Z",
      "updatedAt": "2023-12-25T05:41:54.415Z"
    },
    "reviews": [
      {
        "courseId": "6589162200dcc73e01e2336b",
        "rating": 5,
        "review": "Great course!",
        "createdBy": {
          "_id": "658914a6564072a6da70e61e",
          "username": "john_user",
          "email": "john@user.com",
          "role": "user"
        },
        "createdAt": "2023-12-25T05:58:18.485Z",
        "updatedAt": "2023-12-25T05:58:18.485Z"
      },
      {
        "courseId": "6589162200dcc73e01e2336b",
        "rating": 4.9,
        "review": "Great course, very informative and well-structured!",
        "createdBy": {
          "_id": "658914a6564072a6da70e61e",
          "username": "john_user",
          "email": "john@user.com",
          "role": "user"
        },
        "createdAt": "2023-12-25T05:58:59.802Z",
        "updatedAt": "2023-12-25T05:58:59.802Z"
      }
    ]
  }
}
```

## Get the Best Course Based on Average Review (Rating)

- ### Route: `/api/course/best`
- ### Method: GET

### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Best course retrieved successfully",
  "data": {
    "course": {
      "_id": "6589162200dcc73e01e2336b",
      "title": "Next Level Web Development",
      "instructor": "Jhankar Mahbub",
      "categoryId": "65890b39610a73e0cc4ca19f",
      "price": 69.99,
      "tags": [
        {
          "name": "Programming",
          "isDeleted": false
        },
        {
          "name": "Web Development",
          "isDeleted": false
        }
      ],
      "startDate": "2023-03-15",
      "endDate": "2023-04-14",
      "language": "Bangla",
      "provider": "Programming Hero",
      "details": {
        "level": "Intermediate",
        "description": "Boost Your Web development Career by Learning and Mastering Typescript, Express, Mongoose,Redis, Redux ,Next.js ,DBMS,SQL ,PostgreSQL, AWS, Docker, Unit Testing and many more."
      },
      "durationInWeeks": 5,
      "createdBy": {
        "_id": "65890a575d9bff8a3734d7a1",
        "username": "sajid_admin",
        "email": "sajid@admin.com",
        "role": "admin"
      },
      "createdAt": "2023-12-25T05:41:54.415Z",
      "updatedAt": "2023-12-25T05:41:54.415Z"
    },
    "averageRating": 4.95,
    "reviewCount": 2
  }
}
```

## Create Review

- ### Route: `/api/reviews`
- ### Method: POST

### Request Headers

```json
Authorization - USER TOKEN
```

### Request Body

```json
{
  "courseId": "658914dc5c6b1f5e1d6531e3",
  "rating": 4,
  "review": "TEST"
}
```

### Response

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Review created successfully",
  "data": {
    "_id": "65896e9444cce7116613fc29",
    "courseId": "658914dc5c6b1f5e1d6531e3",
    "rating": 4,
    "review": "TEST",
    "createdBy": {
      "_id": "658914a6564072a6da70e61e",
      "username": "john_user",
      "email": "john@user.com",
      "role": "user"
    },
    "createdAt": "2023-12-25T11:59:17.003Z",
    "updatedAt": "2023-12-25T11:59:17.003Z"
  }
}
```
