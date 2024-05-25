import React from 'react';

import SignIn from '../components/SignIn';
import SignBackground from '../UI/SignBackground';

const LoginPage = () => {
  return (
    <>
      <SignBackground>
        <SignIn />
      </SignBackground>
    </>
  );
};
export default LoginPage;
