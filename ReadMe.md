# **STRONGR** (**Workout Tracker**)

**STRONGR** is a workout journal for the connected age. Schedule future workouts, review past workouts, and even bring STRONGR into the gym with you to track your performance on every exercise in your routine.

# DISCLAIMER - STRONGR IS UNDER ACTIVE DEVELOPMENT AT LAMBDA LABS. THIS REPO IS NOT FEATURE COMPLETE.

- [Building Locally](#building-locally)
- [Deploying](#deploying)
- [Config Variables](#config-variables)
- [User Routes](#user)
- [Progress Routes](#progress)
- [Routine Routes](#routines)
- [Exercise Routes](#exercises)
- [Workout Routes](#workouts)
- [Performance Routes](#performances)

## Building Locally

---

The repo contains two main directories: `server` and `client`. You will need to build each to run the app for local development. Commands for each directory assume you start at the route of that directory.

Server:
`npm install && npm start`

Client:
`npm install && npm start`

## Deploying

---

The standard method for deploying the app is Zeit's [Now](https://zeit.co/now) service, and the `package.json`s in each main directory provide `now-start` scripts for automatic deploy configuration. Note that the `dotenv` code in the repo requires that for the backend/server, either the config vars be set through the Now app or CLI, or that a `.env` be included with the deploy through the `--dotenv` flag.

A daily deploy is currently being maintained at `strongr.tech` (and `strongr-server.tech` for the back-end).

### Config Variables:

---

> USERNAME should be a username for an mLab database.

> PASSWORD should correspond to USERNAME

> SECRET is an arbitrary string, used to sign JWTs.

> SENDGRID_API_KEY is used to send password recovery emails through Sendgrid

> MAILER_EMAIL_ID is the SendGrid mailer ID, which will determine the email address those emails are sent from.

> STRIPE_API_KEY_TEST is the test key used to process payments though Stripe (there will be a STRIPE_API_KEY) for production

# Endpoints

### User

---

- `/register`

  - POST
    - `{ username, password, email }`
    - Creates a new User document and responds with its token.

- `/login`

  - POST
    - `{ username, password }`
    - Searches for a User document and responds with its token if one is found.

- `/forgot_password`

  - POST
    - `{ email }`
    - Uses SendGrid to send a password recovery email with a unique token for request verification.

- `/reset_password`

  - POST
    - `{ token, newPassword, confirmNewPassword }`
    - Finds the user with the provided reset token and update their password.

- `/auto-login`

  ##### Requires Authentication

  - GET
    - No request body, but route requires a valid JWT in the "x-access-token" header.
    - Checks a provided token for validity, responding with the token and an OK status if the token is good. For an example of usage, see the `AccessControl` component.

- `/settings_password`

  ##### Requires Authentication

  - POST
    - `{ username, password, newPassword, confirmNewPassword }`
    - Searches for the user via the username, if the provided current password is correct, the password will be changed.

- `/settings_email`

  ##### Requires Authentication

  - POST
    - `{ username, newEmail }`
    - Searches for the user with the provided username, then changes the email.

- `/charge`

  ##### Requires Authentication

  - POST
    - `{ id, token }`
    - Uses Stripe to process a payment
    - Changes the user status of premiumUser from false to true.
    - The token is generated on the client side via a Stripe function `createToken`
    - For more information on using Stripe with React and Express visit the [Stripe Docs](https://stripe.com/docs/recipes/elements-react)

### Progress

---

- `/progress`

  ##### Requires Authentication

  - POST

    - `{ weight, hips, waist, r_arm, l_arm, r_leg, l_leg, user }`
    - Add a progress entry to the User's history.

  - GET
    - `{ userId }`
    - Retrieves a User's progress history.

- `/progress/:id`

  ##### Requires Authentication

  - PUT

    - `{ weight, hips, waist, r_arm, l_arm, r_leg, l_leg, user }`
    - Finds the progress by id and updates it.

  - DELETE
    - Finds the progress by id and deletes it from the Progress Collection and deletes the corresponding reference in the User collection.

### Routines

---

- `/new-routine`

  ##### Requires Authentication

  - POST
    - `{ userId, title }`
    - Creates a new Routine for a User, i.e. "Leg Day"

- `/routine`

  ##### Requires Authentication

  - GET

    - `{ routineId }`
    - Retrieves a routine document by the given id.

  - PUT

    - `{ routineId, title }`
    - Returns the document with the update applied.

  - DELETE
    - `{ routineId }`
    - Finds the routine by id and deletes it from the Routine Collection and deletes the corresponding reference in the User collection.

- `/routines`

  ##### Requires Authentication

  - GET
    - `{ userId }`
    - Retrieves a list of the User's routines hydrated/populated with Exercise documents.

- `/routine-rich`

  ##### Requires Authentication

  - POST
    - `{ routineId }`
    - Retrieves a routine by the routine id hydrated/populated with Excercise documents

### Exercises

---

- `/new-exercise`

  ##### Requires Authentication

  - POST
    - `{ userId, name }`
    - Creates a new Exercise for a User, i.e. "Bench Press"

- `/add-exercise`

  ##### Requires Authentication

  - POST
    - `{ routineId, exerciseId }`
    - Adds an Exercise to a particular Routine, i.e. add "2k Run" to "Cardio"

- `/exercise`

  ##### Requires Authentication

  - GET

    - `{ exerciseId }`
    - Retrieves an exercise by the exercise id

  - PUT

    - `{ exerciseId, (name, currentWeight, currentReps, currentSets )}`
    - Finds an exercise document by id and returns it with update applied

  - DELETE
    - `{ exerciseId }`
    - Finds the exercise by id and deletes it from the Exercise Collection and deletes the corresponding reference in the User collection.

### Workouts

---

- `/schedule-workout`

  ##### Requires Authentication

  - POST
    - `{ routineId, userId, date, note }`
    - Creates a new Workout with the provided date.
    - Creates a new Performance of each Exercise referenced in the provided Routine, with the provided date.
    - Each Performance document for a specific performance of an exercise is referenced in the document for the Workout. Each Performance document is also referenced in the corresponding Exercise document.
    - Finally, the Workout document is referenced in the provided User document in the `calendar` property, providing an entry point to get from the User level to more specific records.

- `/fetch-workout`

  ##### Requires Authentication

  - POST
    - `{ workoutId }`
    - Retrieves a workout by the workout id

- `/workouts`

  ##### Requires Authentication

  - GET
    - `{ userId }`
    - Retrieves a list of all workouts associated with the user id

- `/workouts/:id`

  ##### Requires Authentication

  - DELETE
    - Finds the workout by id and deletes it from the
      Workout Collection and deletes the corresponding reference in the User collection and Routine collection

- `/workouts-copy`

  ##### Requires Authentication

  - POST
    - `{ startDate, endDate, shiftDistance, userId }`
    - Finds user by id and populates calendar workouts
    - Filters calendar entries from the start and end dates.
    - For each workout in range schedules new workouts to the shiftDistance (milliseconds) selected which is turned into a new Date.

### Performances

---

- `/performance/:id`

  ##### Requires Authentication

  - PUT
    - Toggles the completed property of the associated Performance document

- `/performances`

  ##### Requires Authentication

  - GET
    - `{ userId }`
    - Retrieves a list of all performances associated with the user id

---

#### STRONGR is under construction by Amanda Phillips, Iqra Javed, Leon Bates and Xang Thao.

---
