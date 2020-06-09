import React, { useContext, useEffect } from 'react';
import {
  LinkButton,
  Button,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  OfferSection,
  Offer,
  Input,
  Divider,
} from './SignInOutForm.style';
import { Facebook, Google } from 'components/AllSvgIcon';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage } from 'react-intl';
import { closeModal } from '@redq/reuse-modal';
import Image from 'components/Image/Image';
import PickBazar from '../../image/PickBazar.png';
import useApi from 'hooks/useApi';
import Error from 'components/Error/Error';

interface RequestBody {
  email: string;
  password: string;
  name: string;
}

interface RequestResult {
  email: string;
  name: string;
  auth_token: string;
}

export default function SignInModal() {
  const { authDispatch } = useContext<any>(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [{response, loading, error}, LogIn] = useApi<RequestBody, RequestResult>({method: "POST", path: "/sessions", });


  const toggleSignUpForm = () => {
    authDispatch({
      type: 'SIGNUP',
    });
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: 'FORGOTPASS',
    });
  };

  const loginCallback = () => {
    event.preventDefault();
    LogIn({body: {email, password, name}});
  };

  useEffect(() => {
    if (response) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', `${response.data.auth_token}`);
        authDispatch({ type: 'SIGNIN_SUCCESS' });
        closeModal();
      }
    }
  }, [response]);

  return (
    <Wrapper>
      <Container>
        {/* <LogoWrapper>
          <Image url={PickBazar} />
        </LogoWrapper> */}

        <Heading>
          <FormattedMessage id='welcomeBack' defaultMessage='Welcome Back' />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id='loginText'
            defaultMessage='Login with your email &amp; password'
          />
        </SubHeading>
        <form onSubmit={loginCallback}>
          <Input
            type='email'
            placeholder={"Correo electrónico"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
              type='password'
              placeholder={"Contraseña (mínimo 6 caracteres)"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />

          { (error && !loading) && (
            <>
            <Error message={error.response.data.message}/>
            <div style={{height: "10px"}}/>
            </>
          )}

          <Button
            fullwidth
            title={'Continue'}
            intlButtonId='continueBtn'
            isLoading={loading}
            type='submit'
            style={{ color: '#fff' }}
          />
        </form>
        {/* <Divider>
          <span>
            <FormattedMessage id='orText' defaultMessage='or' />
          </span>
        </Divider> */}

        {/* <Button
          fullwidth
          title={'Continue with Facebook'}
          className='facebook'
          icon={<Facebook />}
          iconPosition='left'
          iconStyle={{ color: '#ffffff', marginRight: 5 }}
          intlButtonId='continueFacebookBtn'
          onClick={loginCallback}
          style={{ color: '#fff' }}
        /> */}

        {/* <Button
          fullwidth
          title={'Continue with Google'}
          className='google'
          icon={<Google />}
          iconPosition='left'
          iconStyle={{ color: '#ffffff', marginRight: 5 }}
          intlButtonId='continueGoogleBtn'
          onClick={loginCallback}
          style={{ color: '#fff' }}
        /> */}

        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id='dontHaveAccount'
            defaultMessage="Don't have any account?"
          />{' '}
          <LinkButton onClick={toggleSignUpForm}>
            <FormattedMessage id='signUpBtnText' defaultMessage='Sign Up' />
          </LinkButton>
        </Offer>
      </Container>

      <OfferSection>
        <Offer>
          <FormattedMessage
            id='forgotPasswordText'
            defaultMessage='Forgot your password?'
          />{' '}
          <LinkButton onClick={toggleForgotPassForm}>
            <FormattedMessage id='resetText' defaultMessage='Reset It' />
          </LinkButton>
        </Offer>
      </OfferSection>
    </Wrapper>
  );
}
