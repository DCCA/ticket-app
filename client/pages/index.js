import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>Your are sign-in </h1>
  ) : (
    <h1>Your are not sign-int</h1>
  );
};

// Get data before Next render the HTML
// This is a plain function
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
