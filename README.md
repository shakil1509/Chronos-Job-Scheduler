# Backend Engineering Launchpad Capstone Project: Chronos :: Job Scheduler System

## Overview

I'm thrilled to share my latest project with you. In modern computing environments, efficient task scheduling and management are crucial. Whether it's sending weekly emails or processing complex data, having a robust backend for job scheduling is paramount. This project aims to address these needs by developing a reliable and scalable distributed job scheduling system.

## Features

- **Task Management**: The system supports both one-time jobs and recurring jobs, offering comprehensive job management functionality.
- **Script Execution**: At the core of the system is the ability to execute scripts, such as the provided taskFile.js, which resides in the src folder. This script is executed using Node.js's child process module whenever a job is triggered.

## Code Structure

### `jobFunctionality` Folder

- **node-cron**: Contains three important functions: `schedule`, `validate`, and `getTasks`.
  - `schedule`: Creates and stores a new task.
  - `validate`: Checks if a given cron expression is valid.
  - `getTasks`: Retrieves stored tasks.
- **Class BackgroundScheduledTask**: Inherits from EventEmitter to handle events like task completion. Provides task control methods such as `start`, `stop`, `pid`, and `isRunning`.
- **ScheduledTask Class**: A Node.js utility for scheduling and executing tasks based on cron expressions. Extends the EventEmitter class to emit events upon task completion.
- **Task Class**: Encapsulates the execution of a function, handling both synchronous and asynchronous functions, and error handling.

### `convert-expressions` Folder

- **index.js**: Translates month names, week day names, ranges, and step values to integers. Normalizes integers in the expression to ensure proper formatting and valid range.

## Installation and Execution

1. Clone the project repository using:
   ```bash
   git clone https://github.com/shakil1509/Chronos-Job-Scheduler

## Key API’s:
As per the current approach, I will create the below mentioned API’s and will keep o adding the API’s if required further.
1. chronos-jobscheduler:PORT/users/login (Method: POST)
2. chronos-jobscheduler:PORT/users/signup (Method: POST)
3. chronos-jobscheduler:PORT/users/me (Method: GET)
4. chronos-jobscheduler:PORT/users/update (Method: PUT)
5. chronos-jobscheduler:PORT/jobs/submitJobs (Method: POST)
6. chronos-jobscheduler:PORT/jobs/fetchJob/:id (Method: GET)
7. chronos-jobscheduler:PORT/jobs/fetchJobs (Method: GET) - used to get the list of all jobs uploaded by the user
8. chronos-jobscheduler:PORT/jobs/update/:id (Method: PUT)
9. chronos-jobscheduler:PORT/jobs/delete/:id (Method: DELETE) 
10. chronos-jobscheduler:PORT/jobs/stop/:id (Method: POST) 

## Overall Approach:
Technology Used:
  1. Backend (Node and Express)
  2. Database (MongoDB)

In this project, I will use Node and Express to write the server side logic and to store data, will use the MongoDB and mongoose ORM.

