# question.md (Assignment questions)#

# Question 1 : What is the difference between Component and PureComponent?Give an example where it might break my app.

# Answer

Component is the default way react creates its structure. You can use Component Class for this purpose. It does not have any optimizations on it. It will rerender based on every prop or state change.
PureComponent is different. It does not rerender on each change. It will render only if the prop has changed from before. This comparison is what makes the pure component. But this comparison is is not perfect and it happens only on the top level. The PureComponenet might fail if there is a complex object passed and the changes are happening on a deeper level.
Example : `<PCComponenet props1={{text:'sample text', values: {id:'id1'}}}>`

# Question 2 : Context + ShouldComponentUpdate might be dangerous. Why is that?

# Answer

ShouldComponentUpdate is a function which tells the component whether it should update or not. Basic checks are on the passed props but if there is custom logic on the props as well with the usage of context then there might be issues. Context might get changed but if the function return false then the component will not rerender

# Question 3 : Describe 3 ways to pass information from a component to its PARENT.

# Answer

1. Passing a callback function : using a callback function from the parent inside the child you can pass information from the child upwards as the callback function will get executed in the parent.

2. Using global state like Context API or Redux : action on the child might save something on the globally defined state which the parent can use in turn

3. Having a custom implementation like custom PubSub or Creating CutomEvents can also achieve some results but it is not recommended

# Question 4 : Give 2 ways to prevent components from re-rendering.

# Answer

2 Ways in which we can stop uneccesary re renders is

1. Using React.memo which is a PureComponent alternative for functional components
2. Using PureComponent class based component

Having your own comparison function for both React.memo or should component update will also give you a greater control on when to rerender and when to not

# Question 5 : What is a fragment and why do we need it? Give an example where it might break my app.

# Answer

React fragment is a wrapper component which is used if you don't want to have a new node in the dom but want to group elements together.
using html attribute in react fragment like event handlers, data attributes will not work.
Using shorthand of React fragment inside map will also break as you cannot assign key to it

# Question 6 : Give 3 examples of the HOC pattern

# Answer

1. If you are using redux then we use connect from react-redux
2. using Routes from react router dom is also a pattern of HOC to render component on certain routes
   `<Route path="/" element={<HomePage />} />`
3. Using libraries like why-did-you-render which is helpful in identifying performance issues also work on HOC pattern. It is a logger of any state or prop which is changing
4. Any kind of Logger wrapper, or loader/error cather wrapper can be a HOC pattern

# Question 7 : What's the difference in handling exceptions in promises,callbacks and async...await?

# Answer

1. In Promises you have to use .catch function chaining to catch errors
   `fetch(someapi).then().catch(err=>console.log(err))`
   Misplacing this cath might lead to errors
2. in callbacks you have to pass pass a function which handles error manually, you callback should be able to handle it
3. in async await we can have try catch block to catch exceptions

# Question 8 : How many arguments does setState take and why is it async.

# Answer

There are 2 arguments in setState

1. The new state
2. The callback that needs to be executed on update

# Question 8 : List the steps needed to migrate a Class to Function Component.

# Answer

1. Replace Class declaration to function declaration and remove usage of this keyword
2. Start using useState instead of state, and modify the existing implementation of setState with respective useState setters
3. Convert the existing lifecycle methods if any into useEffect implementation
4. Use React.memo instead of PureComponents
5. Remove render function and use return instead in functional component to return final elements

# Question 9 : List a few ways styles can be used with components.

# Answer

1. importing CSS fle directly and assign classname
2. Using inline styling (not recommended)
3. Using external libraries like styled-components
4. using classname based external library like tailwind css
5. using scss like css files can also done but will require some configuration

# Question 8 : How to render an HTML string coming from the server.

# Answer

1. you can use dangerouslySetInnerHTML to render string directly but only after proper sanitization which will reduce vulnerabilities
2. using iframe with the exact string can also work as it will be a separate context so there should be minimal impact
