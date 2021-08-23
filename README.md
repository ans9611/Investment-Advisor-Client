# Project 2 Plan

API:
https://github.com/ans9611/Investment-Advisor-API

Client:
https://github.com/ans9611/Investment-Advisor-Client

deployment:
https://ans9611.github.io/Investment-Advisor-Client/

## Introduction
```md
Most of people keep money in a bank, which has lowest interest yield. I want to create a investment portfolio management advisor for passive investors.
```

## User Stories



```md
User Can:

    1. sign up
    2. sign in
    3. sign out
    4. change password

After User Sign in, user can:

1. add portfolio item that has risk (low, moderate, high) and invest balance
2. view our portfolio items
3. update porfolio item risk and account balance
4. delete portfolio item

```

## Wireframes
### Logged Out

- Sign up form
- Sign in form

### Logged In

- add portfolio item form (fields for type, risk and investBalance)
- update portfolio item form (fields for type, risk and investBalance and ID)
- delete portfolio item form (fields for ID)
- view portfolio items button


![](https://i.imgur.com/QF3ScIr.jpg)




## ERD (entity relationship diagram)


User has many PortfolioItems

PorftolioItem belongs to User

PortfolioItem

* type : string
* risk : string
* investBalance : string"
* owner : references the user


![](https://i.imgur.com/slbNOuh.jpg)
