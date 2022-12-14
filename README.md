# IBull

## Project Overview
IBull is a stock viewer that charts out your stock that you want to see with necessary information of the stock such as PE ratios, beta, etc. We can also save the stocks that we want to our personal watchlist and we can also delete it if we are not interested in that particular stock anymore. Our profile can be CRUDed so we can amend anything we like about ourselves at any point of time. To ensure that our profile is save, we have a login/authentication function that protects access to our information with a JWT token that expires after a while when our login session is too long.

## New things that I learn during this project

1. Chart.js
    - Bar chart
    - Line Chart
    - Polar Area Chart
2. Mail.js
3. React toastify
4. Yahoo Finance API
5. Material UI 
6. Merging both frontend and backend into a single monolithic repository
7. Bucket Sort
8. Writing sorting algorithms in Javascript

## Flowchart of app process
![Figma-Flowchart](public/IBull_flowchart.png)

This flowchart shows the entire flow and process of how the full stack application works and what are the validations that I need to do to ensure that nothing crashes the entire application. Even though we can try and prepare for nearly every edge case that we can conceptually conceive of, it is theoretically and practically impossible to develop contingency plans for every scenario. 

## Challenges that I face during this project

As this project has a deadline of 3 weeks and with other busy life commitments such as deploying another full stack application with Python Flask and learning about Data structures and Algorithms, managing time was imperative and paramount to ensure that this project remains working. Most of my other friends decided to separate their projects into two repositories and deploy both the frontend and the backend seperately, however I decided to try a single monolithic repository by deploying my front end on netifly and my back end on heroku. Learning React JS deeper and how to use Material UI was not easy as most of the time while trying to implement it, I was always faced with a blank white screen and multiple errors coming out of the console.

 My ultimate dream for this project was to use Machine Learning and my limited knowledge of Data Science and math to predict the stock prices while also creating a full stack application. As disheartening as it was, the thrill of fixing it and seeing whatever you wanted to be at the frontend trounced any feeling of defeat or failure that came up previously. Unfortunately I tried to use Brain.js to run neural networks to predict stock prices, but it did not work out as it crashed my backend Heroku very last minute and all other Javascript machine learning frameworks fail to run. With very little time left remaining, I pulled out my university math notes and use math to code out my Linear Regression algorithm to predict the trend of the stock price sometime in the near future. There was some issue with the general sorting function of Javascript so I decided to learn a new algorithm called Bucketsort and implement it as a sorting function to use for my Linear Regression equation. 


## Things that I will do more if I had more time

1. Use more APIs such as requesting different live data API such as live stock data API and financial news live API

2. Fine tuning my machine learning knowledge in Javascript and in general to forecast stock prices. It is still very base line as I'm trying to use linear regression to predict the prices here as Javascript does not have the necessary frameworks to do so unlike Python. Here is a kaggle notebook that I used to forecast gold prices for your reference on how I would predict stock prices: https://www.kaggle.com/code/nihilus888/gold-price-analysis-and-prediction

3. Clear up some bugs that arise by letting users to try and break the website as there are some things that I might not have foreseen. 

4. Learning how to write test cases for CI/CD so this gives me an idea of how to do it properly

5. Fix my delete button as the id passing from the frontend to the backend does not work

# Project Link
https://ibull.netlify.app

Unfortunately heroku has decided to not continue the service and as such, my backend portion is not working :( . However there are ways to circumvent this problem, such as cloning the repository and using it on the localhost.

```
git clone https://github.com/Nihilus888/ibull

```

We need to install the necessary packages for it to work so we need to run these commands.

``` 
npm install 
```

As this is a mono repository, we must have a split terminal, there should be a plus button beside your zsh or bash terminal to add another terminal. 

To run the backend, we use the command.

```
nodemon server.js
```

To run the frontend, we use the command.

```
npm start
```

There will be a message that pops up to ask if you will like to run on another port and you should indicate yes.

That should be it! Enjoy the app and see if the price prediction models are accurate!
