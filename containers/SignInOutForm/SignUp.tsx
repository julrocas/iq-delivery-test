import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import {
  Button,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  Input,
  Divider,
  LinkButton,
} from './SignInOutForm.style';
import { Facebook, Google } from 'components/AllSvgIcon';
import Error from 'components/Error/Error';
import { AuthContext } from 'contexts/auth/auth.context';
import { closeModal } from '@redq/reuse-modal';
import { FormattedMessage } from 'react-intl';
import Image from 'components/Image/Image';
import PickBazar from '../../image/PickBazar.png';
import useApi from '../../hooks/useApi';

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

export default function SignOutModal() {
  const { authDispatch } = useContext<any>(AuthContext);

  const [{response, loading, error}, signUp] = useApi<RequestBody, RequestResult>({method: "POST", path: "/registrations", });

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');



  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };

  const signinCallback = (event: any) => {
    event.preventDefault();
    signUp({body: {email, password, name}});
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
          <FormattedMessage id='signUpBtnText' defaultMessage='Sign Up' />
        </Heading>

        <SubHeading>
          
        </SubHeading>
        <form onSubmit={signinCallback}>
          <Input
              type='text'
              placeholder={"Nombre y apellido"}
              onChange={(e) => setName(e.target.value)}
              required
          />

          <Input
            type='email'
            placeholder={"Correo electrónico"}
           
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
              type='password'
              placeholder={"Contraseña (mínimo 6 caracteres)"}
              
              onChange={(e) => setPassword(e.target.value)}
              required
          />

          { (error && !loading) && (
            <Error message={error.response.data.message}/>
          )}

          <HelperText style={{ padding: '20px 0 30px' }}>
            Al registrarte, aceptas los{' '}
            <Link href='/'>
              <a>
                Términos y condiciones
              </a>
            </Link>
          </HelperText>

          <Button
            fullwidth
            title={'Crear cuenta'}
            intlButtonId='continueBtn'
            type='submit'
            isLoading={loading}
            style={{ color: '#fff' }}
          />

        </form>

        {/* <Divider>
          <span>
            <FormattedMessage id='orText' defaultMessage='or' />
          </span>
        </Divider>

        <Button
          fullwidth
          title={'Continue with Facebook'}
          iconPosition='left'
          className='facebook'
          icon={<Facebook />}
          iconStyle={{ color: '#ffffff', marginRight: 5 }}
          intlButtonId='continueFacebookBtn'
          style={{ color: '#fff' }}
        />

        <Button
          fullwidth
          title={'Continue with Google'}
          className='google'
          iconPosition='left'
          icon={<Google />}
          iconStyle={{ color: '#ffffff', marginRight: 5 }}
          intlButtonId='continueGoogleBtn'
          style={{ color: '#fff' }}
        /> */}

        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id='alreadyHaveAccount'
            defaultMessage='Already have an account?'
          />{' '}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id='loginBtnText' defaultMessage='Login' />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
