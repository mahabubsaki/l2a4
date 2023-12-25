# Course Review

This application is a TypeScript-based CRUD (Create, Read, Update, Delete) application using Express, MongoDB, and Mongoose.

### Prerequisites

Before running the application, ensure you have the following installed in your work station:

- Node.js (preferably the latest LTS version)
- MongoDB installed and running on your local machine or a remote server
- Git (if cloning from a repository)

### Installation

1. Clone or download the repository from [https://github.com/mahabubsaki/l2a3.git].

`Clone a Repository:`
This command clones a repository from GitHub to your local machine.

```bash
   git clone https://github.com/mahabubsaki/l2a3.git
```

2. Navigate to the project directory in your terminal.

```bash
   cd l2a3
```

3. Install dependencies using npm (Node Package Manager).

```bash
   npm install
```

### Configuration

Create a `.env` file in the root directory of the project.

Add necessary environment variables to the `.env` file, such as:

`MONGODB_URI:` MongoDB connection URI.
Other necessary environment variables required for your application.
Example .env file:

```bash
MONGODB_URI=mongodb://localhost:27017/your_database_name
PORT=3000
```

### Running the Application

#### Development Mode

Start Development Server:
To run the application in development mode (with live reload):

```bash
   npm run dev
```

> The development server will start at http://localhost:3000 or the server port your local machine.

#### Production Mode

`Build for Production:`

To build the application for production:

```bash
    npm run build
```

`Start Production Server:`

To run the application in production mode:

```bash
    npm run start
```

#### Troubleshooting and FAQs

##### Troubleshooting

If you encounter any issues while running the application, try the following steps:

1. Make sure `MongoDB is running`.
2. Check if all dependencies are installed by running `npm install`.

#### My Server is Hosted on Vercel

You can also access the API from the following link:
[https://l2a3.vercel.app/]

##### API Documentation

The API endpoints and their usages are documented below:

`Create a new course`
Endpoint: POST /api/course`

`Retrieve a list of all course (you can add query like page,limit,sortBy,sortOrder,minPrice, maxPrice,tags,startDate, endDate,language,provider,durationInWeeks & level)`
Endpoint: GET /api/courses

`Create a new category`
Endpoint: POST /api/categories

`Retrieve all categories`
Endpoint: GET /api/categories

`Create a new review`
Endpoint: POST /api/reviews

`Update course information`
Endpoint: PUT /api/courses/:courseId

`Retrieve course by ID with reviews`
Endpoint: GET /api/courses/:courseId/reviews

`Retrieve the best course based on average review (rating)`
Endpoint: GET /api/course/best
