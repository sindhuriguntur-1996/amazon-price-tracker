const nightmare=require('nightmare')();
var nodemailer=require('nodemailer');
require('dotenv').config()

const args = process.argv.slice(2)
const url = args[0]
const minPrice = args[1]

checkPrice()

async function checkPrice(){
    try {
        const priceString = await nightmare.goto(url)
                                           .wait("#priceblock_ourprice")
                                           .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
                                           .end()
        const priceNumber = parseFloat(priceString.replace('$', ''))
        if (priceNumber < minPrice) {
         console.log("less price")
         var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: '',
              pass: '',
            }
          });
          
          var mailOptions = {
            from: '',
            to: ' ',
            subject: 'Sending Email using Node.js',
            text: 'price has been dropped '
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        }
        else{
            console.log("more price")
        }
      } catch (e) {
       
        throw e
      }
    }

   
      
     
