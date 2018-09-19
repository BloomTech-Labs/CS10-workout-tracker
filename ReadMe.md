# **STRONGR** (**Workout Tracker**)

**STRONGR** is a workout journal for the connected age. Schedule future workouts, review past workouts, and even bring STRONGR into the gym with you to track your performance on every exercise in your routine.

# DISCLAIMER - STRONGR IS UNDER ACTIVE DEVELOPMENT AT LAMBDA LABS. THIS REPO IS NOT FEATURE COMPLETE.

## Building Locally

The repo contains two main directories: `server` and `client`. You will need to build each to run the app for local development. Commands for each directory assume you start at the route of that directory.

Server:
`npm install && nodemon server.js`

Client:
`npm install && npm start`

## Deploying

The standard method for deploying the app is Zeit's [Now](https://zeit.co/now) service, and the `package.json`s in each main directory provide `now-start` scripts for automatic deploy configuration. Note that the `dotenv` code in the repo requires that for the backend/server, either the config vars be set through the Now app or CLI, or that a `.env` be included with the deploy through the `--dotenv` flag.

A daily deploy is currently being maintained at `strongr.tech` (and `strongr-server.tech` for the back-end).

### Config Variables:

> USERNAME should be a username for an mLab database.

> PASSWORD should correspond to USERNAME

> SECRET is an arbitrary string, used to sign JWTs.

> SENDGRID_API_KEY is used to send password recovery emails through Sendgrid

> MAILER_EMAIL_ID is the SendGrid mailer ID, which will determine the email address those emails are sent from.

## API

- `/register`

  - { username, password, email }
  - Creates a new User document and responds with its token.

- `/login`

  - { username, password }
  - Searches for a User document and responds with its token if one is found.

- `/auto-login`

  - No request body, but route requires a valid JWT in the "x-access-token" header.
  - Checks a provided token for validity, responding with the token and an OK status if the token is good. For an example of usage, see the `AccessControl` component.

- `/forgot_password`

  - { username, email }
  - Uses SendGrid to send a password recovery email with a unique token for request verification.

- `/reset_password`

  - { token, newPassword, confirmNewPassword }
  - Finds the user with the provided reset token and update their password.

- `/progress`

  - { weight, hips, waist, r_arm, l_arm, r_leg, l_leg, user }
  - Add a progress entry to the User's history

- `/new-routine`

  - { userId, title }
  - Creates a new Routine for a User, i.e. "Leg Day"

- `/new-exercise`

  - { userId, name }
  - Creates a new Exercise for a User, i.e. "Bench Press"

- `/add-exercise`

  - { routineId, exerciseId }
  - Adds an Exercise to a particular Routine, i.e. add "2k Run" to "Cardio"

- `/schedule-workout`

  - { routineId, userId, date, note }
  - Creates a new Workout with the provided date.
  - Creates a new Performance of each Exercise referenced in the provided Routine, with the provided date.
  - Each Performance document for a specific performance of an exercise is referenced in the document for the Workout. Each Performance document is also referenced in the corresponding Exercise document.
  - Finally, the Workout document is referenced in the provided User document in the `calendar` property, providing an entry point to get from the User level to more specific records.

- `/charge`
  - { id, token }
  - Uses Stripe to process a payment
  - Changes the user status of premiumUser from false to true.
  - The token is generated on the client side via a Stripe function `createToken`
  - For more information on using Stripe with React and Express visit the [Stripe Docs](https://stripe.com/docs/recipes/elements-react)

#### STRONGR is under construction by Amanda Phillips, Iqra Javed, Leon Bates and Xang Thao.
