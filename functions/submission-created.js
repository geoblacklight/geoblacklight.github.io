import axios from 'axios';

export async function handler(event, context, callback){
  const email = JSON.parse(event.body).payload.email.trim();
  console.log(`Recieved a submission: ${email}`);
  const SLACK_TOKEN = process.env.SLACK_TOKEN;
  const SLACK_INVITE_ENDPOINT = 'https://slack.com/api/users.admin.invite';
  const toSlack = `email=${email}&token=${SLACK_TOKEN}&set_active=true`;
  await axios.get(`${SLACK_INVITE_ENDPOINT}?${toSlack}`)
  .then((response) => {
    console.log(`Successfully invited ${email}`);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success'
      })
    });
  }).catch((error) => {
    console.log(error);
  })
}
