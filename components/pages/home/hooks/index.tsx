import DemoService from 'services/demoService';
import useSWR, { useSWRConfig } from 'swr';

const useGetDataLoginPage = () => {
  const demoService = new DemoService();

  const {
    url: getDemoDataUrl,
    args: getDemoDataArgs,
    fetcher: getDemoDataFetcher,
  } = demoService.getListDemoApi({
    value: 'abc',
  });

  const { data, mutate: mutateGetData } = useSWR([getDemoDataUrl, getDemoDataArgs], getDemoDataFetcher);

  const updateDataFake = async (previousData: any) => {
    await demoService.updateListDemoApi({
      id: 1,
      title: 'foo',
      body: '...',
      userId: 1,
    });

    return [
      ...previousData,
      {
        id: 1,
        title: 'foo',
        body: '...',
        userId: 1,
      },
    ];
  };

  const updateDemoData = async () => {
    try {
      //Call API to POST new data
      await demoService.updateListDemoApi({
        id: 1,
        title: 'foo',
        body: '...',
        userId: 1,
      });

      //Refetch data
      mutateGetData();

      //Fake to test, uncomment this and comment above code
      //   mutateGetData(updateDataFake, false);
    } catch (e) {
      console.log(e);
    }
  };

  return { data, updateDemoData };
};

export default useGetDataLoginPage;
