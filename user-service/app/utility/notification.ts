import twilio from 'twilio';

const accountSid = "AC3b60194e25dc8ae5eb1be74631b43231";
const authtoken = "9c2b210c1ad6a7aadd9f7c2ff4a4f01c";

const client = twilio(accountSid, authtoken);

export const GenerateAccessCode = () => {
    const code = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { code, expiry };
  };
  
  export const SendVerificationCode = async (
    code: number,
    toPhoneNumber: string
  ) => {
    console.log("hello2")
    const response = await client.messages.create({
      body: `Your verification code is ${code} it will expire within 30 minutes.`,
      from: "+12018905592",
      to: toPhoneNumber.trim()
    });
    console.log(response);
    return response;
  };