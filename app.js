const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/sum', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (!a) {
    return res.status(404).send('Must include number a');
  }

  if (!b) {
    return res.status(404).send('Must include number b');
  }

  const message = `The sum of a and b is ${a + b}`;
  res.send(message);
});

app.get('/cipher', (req, res) => {
  let text = req.query.text;
  let shift = Number(req.query.shift);

  if (!text) {
    return res.status(400).send('Must include text');
  }

  if (!shift) {
    return res.status(400).send('Must include shift number');
  }

  let targetArray = text.split('').filter(Boolean);

  let newArray = targetArray.map((letter) => {
    letter = letter.toUpperCase();
    let letterNum = letter.charCodeAt(0);

    if (letterNum === 90) {
      return String.fromCharCode(65 + (shift - 1));
    }

    return String.fromCharCode(letterNum + shift);
  });

  res.status(200).send(newArray.join(''));
});

app.get('/lotto', (req, res) => {
  const numbers = req.query.num.map((number) => Number(number));

  const testArray = [
    Math.floor(Math.random() * 20) + 1,
    Math.floor(Math.random() * 20) + 1,
    Math.floor(Math.random() * 20) + 1,
    Math.floor(Math.random() * 20) + 1,
    Math.floor(Math.random() * 20) + 1,
    Math.floor(Math.random() * 20) + 1,
  ];

  console.log(testArray);

  const right = numbers.reduce((total, number) => {
    return total + testArray.includes(number);
  }, 0);

  let response;

  switch (right) {
    case 4:
      response = 'Congratulations, you win a free ticket';
      break;
    case 5:
      response = 'Congratulations! You win $100!';
      break;
    case 6:
      response = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    default:
      response = 'Sorry, you lose';
  }

  res.status(200).send(response);
});

app.listen(3000, () => {
  console.log('Yo Jake your server is running on port 3k friendo');
});

// app.get('/', (req, res) => {
//   res.send('Hello pal!');
// });

// app.get('/burgers', (req, res) => {
//   res.send('We have juicy cheese burgers!');
// });

// app.get('/pizza/pepperoni', (req, res) => {
//   res.send('i alika da pepperoni');
// });

// app.get('/echo', (req, res) => {
//   const responseText = `Here are some details of your request:
//       Base URL: ${req.baseUrl}
//       Host: ${req.hostname}
//       Path: ${req.path}
//     `;
//   res.send(responseText);
// });

// app.get('/queryViewer', (req, res) => {
//   console.log(req.query);
//   res.end(); //do not send any data back to the client
// });

// app.get('/greetings', (req, res) => {
//   //1. get values from the request
//   const name = req.query.name;
//   const race = req.query.race;

//   //2. validate the values
//   if (!name) {
//     //3. name was not provided
//     return res.status(400).send('Please provide a name');
//   }

//   if (!race) {
//     //3. race was not provided
//     return res.status(400).send('Please provide a race');
//   }

//   //4. and 5. both name and race are valid so do the processing.
//   const greeting = `Greetings ${name} the ${race}, welcome to our awesome kingdom.`;

//   //6. send the response
//   res.send(greeting);
// });
