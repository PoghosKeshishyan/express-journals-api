const User = require('../models/User');
const nodemailer = require('nodemailer');



// transfer between users
router.post('/transfer/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { input, card, friendUserId, userId } = req.body;
        const friendCard = await Cards.find({ owner: friendUserId });

        const myUser = await User.find({ _id: userId });
        const frinedUser = await User.find({ _id: friendUserId });

        const date = new Date();
        const month = String(date.getMonth()).length === 1 ? '0' + (date.getMonth() + 1) :
            date.getMonth() + 1;
        const day = String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate();
        const today = `${month}.${day}.${date.getFullYear()}`;

        const newFromHistory = [`to account of ${frinedUser[0].name}`, today, `-$${input}`];
        const newFriendHistory = [`from account of ${myUser[0].name}`, today, `+$${input}`];


        // փոխանցող user
        await Cards.updateOne(
            { _id: id },
            {
                card: [
                    {
                        title: card.card[0].title,
                        price: card.card[0].price - input,
                        history: [newFromHistory, ...card.card[0].history],
                        bgColor: card.card[0].bgColor,
                    }
                ]
            },
        );


        // փոխանցվող user, friendUserId
        await Cards.updateOne(
            { owner: friendUserId, 'card[0].title': friendCard[0].card.title },
            {
                card: [
                    {
                        title: friendCard[0].card[0].title,
                        price: friendCard[0].card[0].price + +input,
                        history: [newFriendHistory, ...friendCard[0].card[0].history],
                        bgColor: friendCard[0].card[0].bgColor,
                    }
                ]
            },
        );

        // send to friend email to about of transfer
        const html = `
            <h1>Message from "My Own Bank"</h1>
            <p>${input} dollars has been sent to your account from " ${myUser[0].name} " account in the ${today}.</p>
        `;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL_LOGIN,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_LOGIN,
            to: frinedUser[0].email,
            subject: 'Message from "My Own Bank"',
            html,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Ошибка при отправке письма:', error);
            }
        });

        res.json({ success: true });
    } catch (error) {
        console.log(error);
    }
})

