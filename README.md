# Financial Service Demo Powered by Coveo

The project is hosted live [here](https://demo-ammann-group.netlify.app/).

This project was created on top of cloning the Financial Service Demo

## Prerequisite

- Node v16 or greater

- You should have an `.env` file at the root of this project. You can use `.env.example` as starting point and make sure to replace all placeholder variables `<...>` by the proper information for your organization.

- [Setup Guide](https://github.com/mhsumbal-coveo/FiServ-Pre-req)

## Cloning and Running the Application in local

Clone the project into local

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

In order to run the application Type the following command

```bash
npm start
```

The Application Runs on **localhost:3000**

## Hosting

Follow the guide below to host it on Netlify

Add the [_redirects](https://github.com/mhsumbal-coveo/FiServ/blob/main/public/_redirects) in the public folder if you have an older version of FiServ. [Guide](https://ridbay.medium.com/react-routing-and-netlify-redirects-fd1f00eeee95)

- Install Netlify CLI using ```npm install netlify-cli -g``` (close the terminal after installation and open it again)
- Build the application ```npm run build```
- Deploy using ```netlify deploy --prod```. You will be asked to login for the first time and answer the questions as below.
  - Create & configure a new site
  - select team => ```<select the team it shows>```
  - site name => ```<name-of-your-poc>```
  - Publish directory => ```build```
  
 After hosting is complete, the website URL will show up in the terminal. 
 
 To re-deploy, follow the steps below.
- Build the application again ```npm run build```
- Deploy using ```netlify deploy --prod```
