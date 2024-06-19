# Movie Review App

## Summary
The Movie Review App is a simple web application that allows users to register, create and manage movie reviews, and comment on reviews. It is built using Node.js, Express, and MongoDB, demonstrating a basic full-stack setup with RESTful API design.

## Project Structure


## Setup
1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/movie-review-app.git
    cd movie-review-app
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Start MongoDB**:
    Ensure MongoDB is running on your local machine.

4. **Run the application**:
    ```sh
    npm start
    ```
    The server will start on `http://localhost:3000`.

## API Endpoints

### Users
- `POST /users`: Create a user
- `GET /users`: Get all users

### Posts
- `GET /posts`: Get all posts
- `POST /posts`: Create a post
- `GET /posts/:id`: Get a single post
- `PATCH /posts/:id`: Update a post
- `DELETE /posts/:id`: Delete a post

### Comments
- `GET /comments/post/:postId`: Get all comments for a post
- `POST /comments`: Create a comment
- `DELETE /comments/:id`: Delete a comment

