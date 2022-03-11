import sgMail from '@sendgrid/mail'
import expressAsyncHandler from 'express-async-handler'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

const generateVerificationUserController = expressAsyncHandler(
  async (req, res) => {
    try {
      const msg = {
        to: 'rakshit.s.gowda@gmail.com', // Change to your recipient
        from: 'rakshit.s.gowda@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      }
      await sgMail.send(msg)
      res.json('email sent')
    } catch (error) {
      res.json(error)
    }
  }
)

export default generateVerificationUserController
