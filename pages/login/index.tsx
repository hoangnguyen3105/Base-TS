import { GetServerSideProps } from 'next';
import { withTranslation } from 'next-i18next';

import PublicLayout from '@components//Layout/Public';

import withServerSideProps from 'hoc/withServerSideProps';
import { ReactElement } from 'react';

function Login() {
  return <div>Login</div>;
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

Login.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Login;
