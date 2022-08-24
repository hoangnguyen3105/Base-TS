import { GetServerSideProps } from 'next';
import { withTranslation } from 'next-i18next';

import PublicLayout from '@components//Layout/Public';

import withServerSideProps from 'hoc/withServerSideProps';
import { ReactElement } from 'react';

function Home() {
  return <div>Home 1</div>;
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);
Home.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Home;
