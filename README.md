# merng-apollo
MongoDB, Express, React, Node.js, GraphQL &amp; Apollo


Based on Classed Tutorials from Ahmed Hadjou

1) First GraphQL Server Series
https://www.youtube.com/playlist?list=PLMhAeHCz8S3_CTiWMQhL6YxX7vZ7z84Zo

2) Then React GraphQL App series
https://www.youtube.com/playlist?list=PLMhAeHCz8S3_pgb-j51QnCEhXNj5oyl8n


## Part 1) is done
to run server 
```npm start```

then go to http://localhost:5000/ and check right side bar 'DOCS' in Apollo's GraphQL Playground for queries, mutations and subscriptions

## Part 2)

### about ApolloProvider.js
Instead of installing ```npm i apollo-boost``` we install necessary dependancies manually and write file ApolloProvider ourselves. Because otherwise we could experience issues implementing authentication tokens (saving token and setting a middleware to check token)

* if you are getting error from 'client/node_modules', then delete 'client/node_modules' folder and run ```$ npm install``` from the 'client' folder
