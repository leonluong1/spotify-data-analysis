# Melody Metrics

## Overview and Purpose
Here at Melody Metrics, we built a dynamic website to visualize Spotify music data as well as use machine learning models to predict the popularity of songs. Built with JavaScript and D3 on the frontend, and powered by NodeJS and PostgreSQL on the backend, Melody Metrics offers an interactive website that displays detailed visualizations and provides comprehensive information about the company and its employees.

This application is collaborative work to fulfill the Project 4 requirement for UCB Extension Data Bootcamp.

#### Link to app hosted on Render: https://spotify-data-analysis.onrender.com/

NOTE: **Model** page functionality will not work correctly on the Render version of the app due to large file sizes.

#### Link to the project presentation: https://onedrive.live.com/edit.aspx?resid=2701E4B5AEA1A3BC!87098&cid=2701e4b5aea1a3bc&CT=1709183542378&OR=ItemsView

## Data Ethics and Considerations

In adherence to the [California Consumer Privacy Act (CCPA)](https://oag.ca.gov/privacy/ccpa), our application is committed to the following ethical standards:

We utilized data that is publicly hosted on the data science site, Kaggle which was legally collected from Spotify's Web API. This data is used solely for informational and educational purposes, and is provided as-is without any warranty. Additionally, our application does not collect personal data from its users.

## Features
* Interactive home page with links to other features of the website.
* Web page that displays beautiful Tableau dashboards.
* Machine learning model that predicts the popularity of songs using data features.
* Interactive tool that can recommend new songs to users based on given features.
* Dedicated web page that displays the playlists of each Melody Metrics employee and provides interesting analysis for each playlist.

### Frontend
* D3: A powerful JavaScript library for manipulating documents based on data  
* Plotly: A data visualization library for JavaScript  
* Dotenv: Library to load environment variables  
* Morgan: HTTP request logger  
* Python-Shell: Library to run Python Scripts from Node.js  

### Backend
* **PostgreSQL** Database
    * Spotify Data: Derived from [Kaggle](https://www.kaggle.com/datasets/nicolasfierro/spotify-1986-2023/data)
    * Remotely hosted on [ElephantSQL](https://www.elephantsql.com/)
* **NodeJS** Libraries:
    * **pg** 8.11.3: PostgreSQL client.
    * **express** 4.18.2: Minimal Node JS web framework
    * **dotenv** 16.4.5
    * **morgan** 1.10.0
    * **python-shell** 5.0.0

## Data Analytics using Tableau
### Data Clean Up using Tableau Prep
* Import Kaggle data
* Clean data by eliminating unnecessary columns and duplicate rows
* Export to CSV as spotify_data2.csv

### Data Visualization
The cleaned csv was imported into Tableau to create two dashboards.  
* Dashboard 1 - Anatomy of a Pop Song: Plots 8 different track features against the track's popularity and a treemap visualizing the artists who have the most songs in the Top 1000.
* Dashboard 2 - Yearly Trends: Plots two line graphs that show off song length over time and album length over time respectively. Also, visualizes number of albums vs number of singles over time. 


## Getting Started

### Prerequisite
The following software **MUST** be installed in your local workstation before you can run the web application locally in your workstation.
* Local install 
    * [NodeJS](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
    * [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
    * [PostgreSQL](https://www.postgresql.org/download/)
    * [pgAdmin4](https://www.pgadmin.org/download/)
* Remote Javascript libraries can be leveraged using the following libraries CDN sites.
    * Plotly
    * D3


## Installing the web application in your local workstation
* Download the pre-requisite software packages indicated above (NodeJS, npm, PosgreSQL, and pgAdmin4)
* You can either fork from the repository or download zip file from [here](https://github.com/leonluong1/spotify-data-analysis)
* Install the following packages using node package manager (npm)
    * express 4.18.2 
    * pg 8.11.3
    * dotenv 16.4.5
    * morgan 1.10.0
    * python-shell 5.0.0
    * <em><b>see example below:</b></em>
        * <code>npm install express@4.18.2 pg@8.11.3 dotenv@16.4.5 morgan@1.10.0 python-shell@5.0.0</code>
* Unzip the web app file
* Build database in PostgreSQL using pgAdmin
    * Open **pgAdmin4** and create "spotify_db" database
    * Create the **song** table using the script from **sql/songs.sql**
    * Import **spotify_data2.csv**
* Change the **url** variable by commenting out line 3 of songs.js and uncommenting line 4 of songs.js.
* Start the app
    * Locate and **navigate to the local file system** containing the web application
        * Navigate to root PATH of the repository in your local filesystem (ex. ../Projects/spotify-data-analysis)
    * Type <code>node app.js</code>
    * The web application should be running on http://localhost:3000 in your local workstation


## Usage

### How to Use The Melody Metrics Web Application

#### Go to Tableau Dashboards
* Step 1
    * Go to the Dashboard page either by clicking on **Dashboards** on the navigation bar or clicking the **Check our dashboards!** button on the home page.
* Step 2
    * Scroll down and interact with the embedded dashboards

#### Use the machine learning model
* Step 1
    * Go to the Model page either by clicking on **Model** on the navigation bar or clicking the **Master our ML model!** button on the home page.
* Step 2
    * Enter values for the data features and click the Play button.
    * Analyze the table below.

#### Use the exploration page
* Step 1
    * Go to the Exploration page either by clicking on **Exploration** on the navigation bar or clicking the **Go explore!** button on the home page.
* Step 2
    * Adjust the feature sliders and click the Play button.
    * Analyze the table below.

## Collaborators
* [Ahlden Brough](https://github.com/AhldenBrough)
* [Daniel Rose](https://github.com/danielmilesrose)
* [Immanuel KC Onouha]()
* [Martin Perez](https://github.com/martinperezmh)
* [Leon Luong](https://github.com/leonluong1)
