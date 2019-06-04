# Functional description (run index.html from any IDE otherwise you will get Cross domain issues)

The landing page is dashboard, where customer has option to choose list of parking location (Name from service)

A drop down is provided in order to filter between short capacity and Long capacity. This drop down is enable only when above dropdown is selected. Assumption was that parking can be filtered based on Long and short type. Long for Cars, and short for motorbikes.

When customer selects value from  the second dropdown, he is navigated to another page (map). This navigation is implemented using $routeProvider. 

Once selected it will shows list of available paraking garages in the city on googel map.The selected parking location from dashboard page will adjuct its position at the center of the map.

Based on Type of parking, you will see red circles if no parking space left and green circles if parking is available

info window will appear by default showing total and available parking space for selected parking location

Customer can also check other available parking spaces on other locations (click event)as well. I have provided a button on right hand side which will place info window at the same position which is based on the choice selected from dashboard page



