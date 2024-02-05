# DispoSell
A website dedicated to collect unused furniture in usable condition, refurbishing them, and selling them, operated in Metro Vancouver.
## How to run
1. Configure IntelliJ to [delegate build and run actions to Maven](https://www.jetbrains.com/help/idea/delegate-build-and-run-actions-to-maven.html#delegate_to_maven)
2. Run the application
## Deployment
1. AWS Elastic Beanstalk: http://disposell-dev.us-west-2.elasticbeanstalk.com/
2. Heroku App: http://disposell.herokuapp.com/ (Failed)
## How to test
1. Open http://disposell-dev.us-west-2.elasticbeanstalk.com/
2. Add a few furniture to carts and checkout using these fake credit card:
	* Card number: 4111 1111 1111 1111
	* Expiry date in MM/YY format: 12/23
	* CVC/CVV: 123
3. Login as an admin using these information to view the new order:
	* Username: test_admin
	* Password: test_admin
4. As an admin, assign shipper and schedule delivery for this new order
5. Login as a shipper using these information:
	* Username: test_shipper
	* Password: test_shipper
6. Update delivery information for the order, i.e. real-time position for tracking delivery, for [Order 14](http://disposell.herokuapp.com/orderDetails/14) by clicking on the Google map at the bottom, then click on "Update Tracking" button right below it
7. At the same time, open a separate tab as an anonymous user using the same link for [Order 14](http://disposell.herokuapp.com/orderDetails/14), Google map position would be updated in real-time
## The architecture
<img src="https://user-images.githubusercontent.com/2909287/225399842-68db765f-f2ae-4ec4-8274-4812cc6c302d.png" height="500">
