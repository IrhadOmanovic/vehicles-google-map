# Vehicles Map

<img align="right" width="180px" src="https://raw.githubusercontent.com/IrhadOmanovic/vehicles-google-map/master/public/car-icon.png">

This App is about providing user with wint interface to manipulate with vehicles on google map. User can add/remove/edit/move vehicles on interactive google map.

## Table of Contents

<!-- TOC -->

- [Map & Vehicles React Assignment](#map-and-vehicles-app)
  - [Design](#design)
  - [API Endpoints](#api-endpoints)
  - [Google Maps](#google-maps)
  - [Initial View](#initial-view)
  - [Adding Vehicles](#adding-vehicles)
  - [Editing Vehicles](#editing-vehicles)
  - [Deleting Vehicles](#deleting-vehicles)
  - [Hiding Vehicles](#hiding-vehicles)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
  - [yarn start](#yarn-start)
  - [yarn test](#yarn-test)
  - [yarn build](#yarn-build)
  - [yarn eject](#yarn-eject)
- [Environment Variables](#environment-variables)
- [Learn More](#learn-more)
<!-- TOC -->

## Map and Vehicles App

Implement managing fleet of vehicles according to Figma design and provided Rest API.

### Design

[Design](https://www.figma.com/file/394N4OjrF81IxCIjRq1hBC/Map-%26-Vehicles?node-id=0%3A1)

### API Endpoints

Import [this](https://drive.google.com/file/d/1PtHhkAB6rX1nyC9CXFDTCHBlFNYc5o5n/view?usp=sharing) doc in [Insomnia](https://insomnia.rest/pricing)

### Google Maps

[Developer guide](https://developers.google.com/maps/documentation/javascript/adding-a-google-map)

API key \*\*\*

Initialize map with zoom level set to 12.

### Initial View

App should use Google map to show vehicles that are returned by /vehicles endpoint that are not hidden, i.e. that have enabled property set to true. Sidebar should show all vehicles respecting the enabled field.

Vehicle pins on the map should be movable. When the pin is moved, corresponding vehicle latitude and longitude should be updated using PATCH /vehicle/{ID} request.

### Adding vehicles

Click anywhere on the map triggers the “Add new vehicle” form which has latitude and longitude fields pre-populated by coordinates where the map was clicked.

### Editing Vehicles

Click to edit a vehicle shows the same form as for adding new vehicles except that form title should be “Edit vehicle”.

## Deleting Vehicles

Click to delete a vehicle first shows native confirmation dialog and removes vehicle from the sidebar list and the map.

### Hiding Vehicles

Hiding vehicle removes vehicle from the map but leaves it in the sidebar list with name grayed out.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Environment Variables

We use only Google Map API Key as ENV variable.

Example env can be found at [.env.local.example](.env.local.example).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
