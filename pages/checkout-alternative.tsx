import React from 'react';
import { NextPage } from 'next';
import { Modal } from '@redq/reuse-modal';
import { SEO } from 'components/seo';
import Checkout from 'containers/Checkout/Checkout';
import { ProfileProvider } from 'contexts/profile/profile.provider';

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage: NextPage<Props> = ({ deviceType }) => {
  const data = {me: {
    id: "asdsd",
    name: "asdsd",
    email: "asdsd",
    address: [{
      id: "asdsd",
      type: "asdsd",
      name: "asdsd",
      info: "asdsd",
    }],
    contact: [{
      id: "asdsd",
      type: "asdsd",
      number: "asdsd",
    }],
    card: [{
      id: "asdsd",
      type: "asdsd",
      cardType: "asdsd",
      name: "asdsd",
      lastFourDigit: "asdsd",
    }]
  }};
  const error = null;
  const loading = null;

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) return <div>{error.message}</div>;
  const token = 'true';

  return (
    <>
      <SEO title='Checkout - PickBazar' description='Checkout Details' />
      <ProfileProvider initData={data.me}>
        <Modal>
          <Checkout token={token} deviceType={deviceType} />
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default CheckoutPage;
