# Kanen
Meteor-Svelte starter package

# Overview
This starter package is the outcome of work done to build an application system for both a software-as-a-service and for real time control (IoT if you prefer).  This package provides a scaffolding structure to quickly build pages and includes a variety of components to add page specific functionality.  This package is a partial port from a Meteor-Vue application in an attempt to reduce the bundle size and improve Time To First Byte (TTFB).

This Meteor-Svelte Starter Package is built on the most current technologies as of 2020 using the latest releases of Meteor MongoDb Svelte and Bulma.
It is also an opinionated view of the work that needs to get done.  This package is clearly not for everyone nor does it try to accommodate the latest new ideas.  This package is meant for business people / product managers that need to get outcomes quickly and can scale during the initial growth phase of a company.

We hope you find this package useful to jump start your exploration of Svelte running on Meteor.

# Demo Site
The demo site is located at a [Galaxy/Atlas](https://kanen.meteorapp.com/home) data centre.  Sign-in with email: ‘test-user@example.com'  password:  ‘test-user-kanen’.

# Main Features
This application is a Meteor distribution built with a minimal number of Atmosphere packages and npm distributions.  The key major frameworks are Meteor, Svelte and Bulma for CSS.  The application has also been structured to provide a fast load time.

It has been structured to create the smallest bundle and uses svelte, svelte-loadable, svelte-router-spa for the client side front end.  All icons are svg and formatted as Fontawesome svg objects.  [Line-awesome](https://icons8.com/line-awesome) svg icons have been converted to Fontawesome format are also included and are the main set used in this application.

### Key features:
- Uses Meteor methods for database read / store for greater speed.
- Leverages MongoDb Change Streams for real time tracking.
- Each page is self contained. Can be removed or added by editing route table.
- Leverages Svelte-loadable to minimize initial app load.
- Uses Svelte stores for state management.
- Uses Svelte context for text and other static information.
- All text is abstracted on a per page basis to allow for internationalization and easy maintenance.
- Includes a variety of widgets / components for content display or dashboard indicators.
- Includes a mini-wiki to provide user learning resources.
- Built-in form builder with 16 configurable field types. Supports tabbed sections and horizontal grouped fields.
- Built-in document lister with filter plugins and compound search. Supports table or grid layouts.
- Supports built-in user roles and groups for access control.
- Includes System Config file for dynamic application control and debug reporting.
- Logs system and user activity.
