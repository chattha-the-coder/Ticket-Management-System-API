# Ticket Management System API

This project implements a **Ticket Management System API** using Node.js, Express, and MySQL. The API provides endpoints to manage tickets and users, including features like creating, updating, deleting tickets, and querying user or ticket data.

---

## Features

- CRUD operations for tickets.
- User-related queries, including active users and archived statuses.
- Relational queries between **Tickets** and **Users** using MySQL JOINs.
- Error handling and structured responses for API calls.
- Demonstrates database connection and query execution.

---

## Table of Contents

1. [Requirements](#requirements)
2. [Setup](#setup)
3. [API Endpoints](#api-endpoints)
   - [Ticket Endpoints](#ticket-endpoints)
   - [User Endpoints](#user-endpoints)
   - [Relational Endpoints](#relational-endpoints)
4. [Database Schema](#database-schema)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

---

## Requirements

- Node.js (v14 or higher)
- MySQL (any version supporting modern SQL features)
- Postman or a similar API testing tool for testing the API

---

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

## Install dependencies:

bash
Copy code
npm install
Set up MySQL database:

## Create a MySQL database and import the required schema.

Add a connection configuration file at ../database/connection.js to connect the API with your database.
Run the server:

bash
Copy code
node app.js
Access the API:

API runs at http://localhost:9000.
API Endpoints
Ticket Endpoints
Get All Tickets

http
Copy code
GET /ticket
Fetch all tickets from the database.

Delete a Ticket by ID

http
Copy code
DELETE /ticket/:id
Deletes the ticket with the specified ID.

Update a Ticket

http
Copy code
PATCH /ticket/:id
Updates ticket details based on provided body parameters:

Title (string)
Des (string)
Status (string)
Insert a Ticket

http
Copy code
POST /ticket
Inserts a new ticket into the database. Example body:

json
Copy code
{
"Title": "Sample Ticket",
"Des": "Sample Description",
"Status": "Open"
}
User Endpoints
Get Active Users

http
Copy code
GET /active
Fetches all active users, regardless of their archive status.

Get Non-Archived Users

http
Copy code
GET /not_archive
Fetches all users who are active and not archived.

Relational Endpoints
Fetch Tickets Reported by a Specific User

http
Copy code
GET /fetch_reporter/:id
Fetches all tickets reported by a user with the given ID.

Fetch All Tickets with Active Reporters

http
Copy code
GET /fetch_all
Fetches all tickets where the reporter is an active user.

## Fetch Tickets Assigned to a Specific User

http
Copy code
GET /fetch_ticket_assigne/:id
Fetches all tickets assigned to a user with the given ID.

## Count Tickets Grouped by Reporter

http
Copy code
GET /a
Fetches the count of tickets grouped by their respective reporters.

## Database Schema

User Table
Column Type Description
id INT Primary key
name VARCHAR User's name
isActive BOOLEAN Whether the user is active
isArchived BOOLEAN Whether the user is archived
Ticket Table
Column Type Description
id INT Primary key
Title VARCHAR Ticket title
Des TEXT Ticket description
Status VARCHAR Current ticket status (e.g., Open, Closed)
Reporter INT References User.id (reporter)
Assignee INT References User.id (assignee)
createdAt DATETIME When the ticket was created
updatedAt DATETIME Last update timestamp
Usage
Use Postman or similar tools to test the endpoints.
Update the connection.js file to point to your MySQL database.
Ensure your MySQL service is running before starting the API server.
Contributing
Fork the repository.
Create a new branch for your feature or fix.
Commit your changes and create a pull request.
