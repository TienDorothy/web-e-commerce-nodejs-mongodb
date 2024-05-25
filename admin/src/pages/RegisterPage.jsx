import SignUpForm from '../components/SignUpForm';
import SignBackground from '../UI/SignBackground';

const RegisterPage = () => {
  return (
    <>
      <section id='register'>
        <SignBackground>
          <SignUpForm />
        </SignBackground>
      </section>
    </>
  );
};

export default RegisterPage;
