# Description of the Problem

Part One:
Construct a webpage to display information to prospective users from the provided data subset attached to this email. How you choose to design this webpage is up to you - the only requirement is that the framework used must be React-based.

Part Two (Additional Credit / Optional):
Set up an API endpoint that allows you to request the same data, and retrieve the data for your webpage asynchronously from this source. You will need to first store the data (whether in a database or otherwise), and then setup the means for access.

# Design Approach

To display the information in an easy and accessible way, I felt using bootstrap cards and modals was the best approach. Since the only necessary operations at this time are for users to view the data, it made more sense to me to display the more in-depth information for each object (full description, solution, evidence) on the same page using modals instead of having the user go to a different page for each object (if the description, solution, or evidence section is too long, only some of the text will be displayed followed by a "read more" link to trigger the right modal). The data can be sorted by name, id, alert, severity level, and application. By default, the data is sorted by severity level in descending order to show the most urgent objects first. All aspects of the webpage are responsive for best viewing on any screen.

# Endpoint Setup

Since the only operation is to view the data, setting up a database for asynchronous access didn't feel necessary and the data is instead stored in a secret gist. ExpressJs along with Axios was used to setup an endpoint to acess the data from the gist and then serve it on port 5000. In the event that fetching the data from the endpoint fails, a local data.json file will be used instead to display the data.

# How It Works

There are 4 components: main (the page to display the content), contentCards (modelling the card for each object), navBar (just the navigation bar), and details (the modals for the longer information for each card). In main, once the API call is made, the data is set to either the remote data or local data based on the whether the request is successful. The data is then looped through to create and display the content cards, as well as create the three modals for each object that have an ID of the form _<objectId>_desc, _<objectId>_sol, _<objectId>_evid (the IDs were set up this way so the "read more" buttons on the cards can easily trigger the correct modal). When the user changes the parameter to sort by, the data is then sorted by that parameter and the state is updated with the new list. When the user changes the order (ascending or descending) it is compared with what the current order is (using useState) and if the user selected order differs from the current order, the current order is updated and the list is reversed and the state data is updated. 

# Run Instructions

- Download or clone the repo
- cd into the folder
- Do `npm i`
- Then do `npm start`