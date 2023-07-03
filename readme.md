Hello thank you for looking at my work, to run it run the following in your command line within the top level directory of the project.

``` cmd
npm node .
```
The API should become available at http://localhost:8070

The following JSON files were tested with insomnia 
``` JSON
{
	"username": "Test2",
	"password": "TesTpass.1",
	"email": "Test1@email.com",
	"dob": "2000-10-10",
	"creditCardNumber": "1234567890123456"
}
```

```JSON
{
	"creditCardNumber": "1234567890123456",
	"amount": "123"
}

```

to run the tests run the following in your command line within the top level directory of the project.

``` cmd
npm test
```

Dependences used were:
	express
	express-validator
	bcryptjs
	jest
	supertest