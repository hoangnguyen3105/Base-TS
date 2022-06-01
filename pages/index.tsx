import { ReactElement } from 'react';
import { useSWRConfig } from 'swr';
import { GetServerSideProps } from 'next';

import PublicLayout from '@components//Layout/Public';

import withServerSideProps from 'hoc/withServerSideProps';
import AppButton from '@components//AppButton';
import DemoService from 'services/demoService';
import useGetDataLoginPage from '@components//pages/home/hooks';

function Home() {
  const demoService = new DemoService();

  const { mutate } = useSWRConfig();

  const { updateDemoData, data } = useGetDataLoginPage();

  const updateDemoDataGlobally = async () => {
    try {
      // Call API to POST new data
      await demoService.updateListDemoApi({
        id: 1,
        title: 'foo',
        body: '...',
        userId: 1,
      });

      // Refetch data
      mutate(demoService.demoDataUrl);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <br />
      {data?.map(({ title }: any) => `${title} \n\r`)}
      <AppButton text={'Update data globally from any where'} onClick={updateDemoDataGlobally} />
      <AppButton text={'Update data'} onClick={updateDemoData} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

Home.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Home;
