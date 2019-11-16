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

### Apollo Client Developer Tools
use Chrome Extension 'Apollo Client Developer Tools' to play with GraphQL on the client side (from React)

Once you add this Chrome Extension, you'll have 'Apollo" tab next to 'Console', 'Network' etc. in Inspector (F12 - shortcut). From there you'll see GraphiQL interface. 

* in fact you'll see GraphiQL interface if you have successsfully connected to the server (and all the server's queries/mutations/subscriptions will be visible there)

### Register / Login
auth.js exports AuthContext and AuthProvider

In case of successful Login (or Register) the userData is passed to auth.js: AuthContext: login() function and saved as 'user' object of AuthContext.
AuthProvider uses reducer to copy the 'user' data and pass it as 'value' to the <AuthContext.Provider> component (along with other props that could come from some top components).

In App.js all other components are wrapped under <AuthProvider> component, which means that it can pass any props to it's child elements (components). In fact it passes value={{ user: state.user, login, logout }} as props to potential child element, so from there it's up to child to pick it up or not (to use 'user' object or not)


** using 'React Dev Tools' Chrome extension you can go to 'Components' tab (next to Console/Network/etc), and check the <AuthProvider> element (component), it shell have hooks with 'user' object (if you logged in successfully). And you can see that the child of <AuthProvider>, the <Context.Provider> component gets the 'user' object in props.value.user