# MediSons Visualization Client

#### Setup

Ensure you have npm installed on your device. For windows,
consider using cygwin. Installation instructions can be found here:
https://www.cygwin.com/

Nodist can be used in conjunction with cygwin to run npm commands
in a windows environment. Instructions can be found here:
https://github.com/nullivex/nodist

To install dependencies, run the following:

```text
npm install
```

#### Running the Client

```text
npm start
```

This should automatically launch a new browser tab client running on
http://localhost:3000/

#### Testing

You can run the test suite and static checkers with the following commands.

```text
npm run lint      // stylelint, eslint, and prettier
npm run flow      // flow type checker
npm run test      // runs the whole test suite
```
