const nodemailer = require('nodemailer');
const { isArray } = require('util');



const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
})

const generateOrderEmail = (order, total) => `
  <div>
    <h2> Your recent order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 min.</p>
    <ul>
      ${order.map(item => `
        <li>
          <img src="${item.thumbnail}" alt="${item.name}" />
          ${item.size} ${item.name} - ${item.price}
        </li>
      `).join('')}
    </ul>
    <p>Your total is <strong>${total}</strong> due at pickup</p>
    <style>
      ul {
        list-style=none;
      }
  </div>
`;

exports.handler = async ( event, context) => {
  const body = JSON.parse(event.body);
  const isFieldMissingOrEmpty = (fieldname) => !body[fieldname] || (Array.isArray(body[fieldname]) && body[fieldname].length === 0);
  const missingFields = ['email', 'name', 'order', 'total'].filter(isFieldMissingOrEmpty);
  if (missingFields.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Missing required field(s): ${missingFields.join(', ')}`}),
    }
  }
  if (body.pizza) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'success'}),
    };
  }
  const { name, email, order, total } = body;
  const info = await transporter.sendMail({
    from: 'Slicks slices <slick@example.com>',
    to: `${name} <${email}>`,
    subject: 'New order!',
    html: generateOrderEmail(order, total),
  });
  console.log('Email send preview here: ', nodemailer.getTestMessageUrl(info));
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'success '}),
  };
}