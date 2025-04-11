import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import BottomNavigation from '../_component/BottomNavigation';
import Header from './_component/Header';
import ProfileInfo from './_component/ProfileInfo';
import ProfileStats from './_component/ProfileStats';
import { getProfileInfo } from './_lib/getProfileInfo';
import { getProfileStats } from './_lib/getProfileStats';
import UnderDevelopment from '../_component/UnderDevelopment';

export default async function Profile() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ["profile", "info"], queryFn: getProfileInfo});
  await queryClient.prefetchQuery({queryKey: ["profile", "stats"], queryFn: getProfileStats});
  const dehydratedState = dehydrate(queryClient);

  //기능 개발 되면 overflow-hidden 지워야 함
  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 pb-20 overflow-hidden">
      <HydrationBoundary state={dehydratedState}>
        {/* <Header/>
        <ProfileInfo/>
        <ProfileStats/>
        <BottomNavigation/> */}
        <UnderDevelopment/>
      </HydrationBoundary>
    </div>
  );
}
