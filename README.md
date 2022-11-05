[![Starware](https://img.shields.io/badge/Starware-⭐-black?labelColor=f9b00d)](https://github.com/zepfietje/starware)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

<p align="center">
  <img src="https://github.com/dscnitrourkela/project-elaichi/blob/main/logo.png" alt="Logo" width="130">
</p>
<h1 align="center">Project Dates</h1>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

## About

**This is the dashboard repository for managing the Avenue app, a campus guide for NIT Rourkela. It is a respository managing the API for managinng, controlling and authorising the users with respect to the mobile application of Avenue.**

<p align="center">
<img src="./RepoCover.png" width="75%" />
</p>
<h6 align="center">Project developed and maintained by DSC NIT Rourkela</h6>

## Tech Stack

This project uses the following technologies :

- react
- next.js
- yarn
- material ui

---

## Local Setup

This section contains the procedure to setup the project on your local machine.

`PREREQUISITE INSTALLATIONS`

> 1. Docker
> 2. Docker Compose

> Node.js required only for linting locally

1.  **Fork** the repo on GitHub
2.  **Clone** the project to your own machine
3.  Prepare the env for project.

`cd api && mv .env.example .env`

4.  Add Mongo DB URI in `.env` file
5.  Build the docker image

`docker-compose build --no-cache`

6. Spin the server.

`docker-compose up`

---

## Documentation Notes

This section contains a quick guide about the features of the application.

---

## Contributing 🎃

This repository is one of the many repositories maintained by DSC NIT Rourkela NIT Rourkela. <br>
Our Slack Community: [Slack Invite](http://bit.ly/NITRDevs) <br>

Please refer to the project's style and contribution guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

NOTE 1: Please abide by the [Contributing Guidelines](https://github.com/dscnitrourkela/project-dates/blob/development/CONTRIBUTING.md).

NOTE 2: Please abide by the [Code of Conduct](https://github.com/dscnitrourkela/project-dates/blob/development/CODE_OF_CONDUCT.md).

## Starware

`dscnitrourkela/project-dates` is Starware.
This means you're free to use the project, as long as you star its GitHub repository.
Your appreciation makes us grow and glow up. 🌠

[contributors-shield]: https://img.shields.io/github/contributors/dscnitrourkela/project-dates?style=for-the-badge
[contributors-url]: https://github.com/dscnitrourkela/project-dates/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/dscnitrourkela/project-dates?style=for-the-badge
[forks-url]: https://github.com/dscnitrourkela/project-dates/network/members
[stars-shield]: https://img.shields.io/github/stars/dscnitrourkela/project-dates?style=for-the-badge
[stars-url]: https://github.com/dscnitrourkela/project-dates/stargazers
[issues-shield]: https://img.shields.io/github/issues/dscnitrourkela/project-dates?style=for-the-badge
[issues-url]: https://github.com/dscnitrourkela/project-dates/issues
[license-shield]: https://img.shields.io/github/license/dscnitrourkela/project-dates?style=for-the-badge
[license-url]: https://github.com/dscnitrourkela/project-dates/blob/main/LICENSE
