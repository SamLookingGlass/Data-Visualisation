# Interactive Frontend Development Milestone Project – Data Visualisation using APIs

# Context
This project focuses on the interactive website development for a cryptocurrency web dashboard called Quinoa. The data fetched for visualisation are from APIs provided by https://www.cryptocompare.com/. This web dashboard was designed for users who are interested about cryptocurrencies and want to monitor the changes in cryptocurrency prices. 

The data used for the project are real-time cryptocurrency prices and cryptocurrency-related data. The data is then repackaged and presented in a readable form for users (i.e. tables and graphs).

# Demo
A live website can be found here https://samlookingglass.github.io/Data-Visualisation/main/index.html
 
# UX 
# (1) Project Strategy
The following user and organisation goals were identified and served as a guideline for the features that I have decided to incorporate into the website subsequently. 

User Story 1: 
User wants to check the real-time prices of cryptocurrencies.

User Story 2:
User wants to view cryptocurrency prices in their domestic currency. 

User Story 3:
User wants to be able to select a particular cryptocurrency of interest for monitoring.

User Story 4:
User wants to be able to discern cryptocurrency price changes and patterns from the data visualization.

User Story 5:
User wants to get a sense of the market sentiment of cryptocurrency based on social media data.

# (2) Scope of Project 
<Structure>
Based on requirements identified, the dashboard was designed with the following sections:

Table of Token Prices – Features real-time prices, price changes and market capitalization of 
tokens.  

Price (Hourly) graph for selected Token  – Shows the price changes in the past 24 hours for selected token.

Price (Minutes) graph for selected Token  – Shows the price changes in the past hour for selected token.
Social Media Data of selected Token – Features a tabulation of social media data from Facebook, Twitter, Reddit, and GitHub of the selected Token.

Price of Coins Bar Graph – Features a barchart that compares the prices of the cryptocurrency across the tokens.

<Design Choices>
The blue-green and grey theme selected to provide a contrast to the white graphs and tables of the data being visualized.
The dashboard’s logo was created using a third party service, Canva.

# Features
# (1) Existing Features
Users are able to see real-time price of cryptocurrencies, High and Low Prices within 24H, and percentage changes in price.

Fiat Currency Selector – Users able to display cryptocurrency prices in terms of their selected fiat currency.

Cryptocurrency Selector – Users able to display cryptocurrency price selected. 

Line and Bar graphs of cryptocurrency prices.

Aggregated real-time social media data on selected cryptocurrency.

# (2) Additional Features to be implemented in the future
In the future, I would like to add visualize a composite line graph to show the correlation between price of cryptocurrency and the aggregated real-time social media data.
 
# (3) Features Left to Implement 
The webpages have only been designed to be mobile-responsive on large devices (i.e. laptops). Mobile-responsiveness should also be implemented for small devices such as mobile phones and tablets. However, it should be noted that as the using the d3.js framework has made it difficult to make the graphs mobile-responsive.

# Technologies Used 
HTML5 
(https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5):
The project uses HTML5 to structure the layout of the website. 

CSS 
(https://developer.mozilla.org/en-US/docs/Web/CSS):
The project uses CSS to add the stylistic designs to the webpages.
 
Bootstrap 
(https://getbootstrap.com/docs/4.3/getting-started/introduction/):
The project uses the Bootstrap framework to make structuring and styling of the webpages easier

D3 Framework
(https://d3js.org/):
The project uses the D3 framework to plot the line and bar graphs from data pulled from APIs.

Axios Framework
(https://github.com/axios/axios):
The project uses the axios framework to write API call functions.

Jasmine Framework
(https://jasmine.github.io/):
The project uses the Jasmine Framework for automated testing.

AwesomeFont 4.7 
(https://fontawesome.com/v4.7.0/):
The project uses AwesomeFont for social media and music application icons on the website. 

# Testing 
# (1) Manual Testing
<Navigation Bar>
On the left side of the screen, users will see the navigation with 2 tabs, “Home” and “About”.

When users click on “About” a message box will pop up with a welcome message “Welcome to Quinoa Digital Asset Dashboard”.

<List of Cryptocurrencies>
Users will be able to click on the currency ‘GBP’, ‘USD’, ‘SGD’, and ‘EUR’ buttons to select a fiat currency such that the cryptocurrency prices are displayed in the selected fiat currency.

When a 24hour percentage price change is positive, the colour of the price will be reflected a green.

When a 24hour percentage price change is negative, the colour of the price will be reflected a red.

When there is no 24hour percentage price change, the colour of the price will be reflected as grey.

When users click on the dropdown box for more currency options, a dropdown list of currencies will be displayed to the user for selection. 

Users will be able to select a fiat currency from the dropdown such that the cryptocurrency prices are displayed in the selected fiat currency.

When users click on a cryptocurrency on this list, it will display the data of the selected cryptocurrency in the price (hourly) graph, price (minutes) graph, and the associated social media data table. 
  
# (2) Automated Testing
No automated testing implemented yet. This test will be implemented in the next iteration of the project.

# (3) Mobile-responsive
The webpages work only on large devices (i.e. laptops). 

# (4) Bugs
The API call function to pull data for prices (hourly) and prices (minutes) for cryptocurrency selected does not consistently. It works sometimes and sometimes it does not work.

# Deployment
This site is hosted using GitHub pages, deployed directly from the master branch. The deployed site will update automatically upon new commits to the master branch. In order for the site to deploy correctly on GitHub pages, the landing page must be named index.html.

To run locally, you can clone this repository directly into the editor of your choice by pasting git clone https://github.com/SamLookingGlass/Data-Visualisation into your terminal. 

To cut ties with this GitHub repository, type git remote rm origin into the terminal.

# Credits 
# (1) Content 
All the data were pulled from the API provided by:
https://www.cryptocompare.com/
<Logos>
Quinoa logo made using https://www.canva.com

# (2) Acknowledgements 
Template for the dashboard adapted from https://colorlib.com/wp/free-bootstrap-admin-dashboard-templates/

