import nodemailer from 'nodemailer';

export const sendEnquiryEmail = async (req, res) => {
  const { name, type, description } = req.body;

  if (!name || !type || !description) {
    return res.status(400).json({ message: 'Missing required item details.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, 
      subject: `New Enquiry: ${name}`,
      text: ` Enquiry Details:\n\nItem Name: ${name}\nType: ${type}\nDescription: ${description}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Enquiry email sent successfully.' });
  } catch (error) {
    console.error(' Email error:', error);
    res.status(500).json({ message: 'Failed to send email.', error: error.message });
  }
};
