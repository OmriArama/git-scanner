# github-scanner

This repo contains a cli command that lets you scan github's most trending javascript repos and find out how many unused packages are defined for that project

## Installation

open terminal in the project and type - `npm i -g`

## Usage

after you install the cli command you can type - `git-scanner check-github` and that will print the most trending projects of the month with their details and security score

## Flags

- `-n` Allows you to limit the search for number of fields example -`-n 5` returns the five most trending projects with their security score

- `f` Allows you to filter the most trending js repos by day, week or month example - `-f daily | -f weekly | -f monthly`
