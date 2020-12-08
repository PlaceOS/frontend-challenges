# Code Challange Submission by Marvin Yoong

App deployed on github pages [client](https://vinnyo.github.io/frontend-challenges) , [admin](https://vinnyo.github.io/frontend-challenges/admin)

---

# PlaceOS Code Challenges

## Setup

Fork this repository to your on Gihub account to work on the following challenges

## Challenges

For these challenges you will be tested on your usage of different angular features, RxJs, and Typescript.

### Project Setup

1. Setup a new Angular project with [NX](https://nx.dev/latest/angular/tutorial/01-create-application)
1. Create two applications called `client` and `admin`
1. Create a library called `shared`

### TODO App - Client Requirements

* Components for display user's TODO lists.
* Handle storing data so that it persists across page refreshes.
* Seperate the management of user's TODO lists from components.

### TODO App - Admin Requirements

* Login component for setting the active user.
* Checking of user permissions to prevent access by non-admin users.
* Component for overview of user's lists.
* Admin user should be able to edit any list from this app.

### Bonus

1. Login component for client app.
1. Seperation of TODO lists between users in client app.
1. Client users should only be allowed to edit their own lists.
1. Setup re-ordering of TODO list items
1. Setup lists to sync between Admin and Client UIs on the same machine.
1. Add 2+ more features to the current requirements
1. Setup tailwindcss in your applications
1. Strongly typed interfaces
1. Setup hosting for the applications on GitHub pages or [Vercel](https://vercel.com).

## Notes

* Other than Angular Material/CDK try to refrain from using third party libraries. Be prepared to justify your usage if you do.
* Users and API data can be hardcoded
* There is no need to hook up to any external APIs but feel free to mock out an API for the state of the application. 

## Submission

When you're done working on the challenges submit a PR to this repo with your solutions to each of the challenges