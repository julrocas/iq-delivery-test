import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Modal } from '@redq/reuse-modal';
import { ProfileProvider } from 'contexts/profile/profile.provider';
import SettingsContent from 'containers/Profile/Settings/Settings';
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from 'containers/Profile/Profile.style';
import Sidebar from 'containers/Profile/Sidebar/Sidebar';
import { SEO } from 'components/seo';
import SiteFooter from 'components/SiteFooter/SiteFooter';
import { FormattedMessage } from 'react-intl';

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage: NextPage<Props> = ({ deviceType }) => {

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
  const error = {message: ""};
  const loading = false;

  if (!data || loading) {
    return <div>loading...</div>;
  }
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <SEO title='Profile - PickBazar' description='Profile Details' />
      <ProfileProvider initData={data.me}>
        <Modal>
          <PageWrapper>
            <SidebarSection>
              <Sidebar />
            </SidebarSection>
            <ContentBox>
              <SettingsContent deviceType={deviceType} />
            </ContentBox>

            <SiteFooter style={{ marginTop: 50 }}>
              <FormattedMessage
                id='siteFooter'
                defaultMessage='Pickbazar is a product of'
              />
              &nbsp; <Link href='#'>Redq, Inc.</Link>
            </SiteFooter>
          </PageWrapper>
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default ProfilePage;
