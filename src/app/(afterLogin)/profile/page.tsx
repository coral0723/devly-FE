// import UnderDevelopment from '../_component/UnderDevelopment';
import BottomNavigation from '../_component/BottomNavigation';
import Header from './_component/Header';
import ProfileInfo from './_component/ProfileInfo';
import ProfileStats from './_component/ProfileStats';

export default async function Profile() {

  // 미완성 기능일 때 보여주는 컴포넌트
  // const isDevelopment = process.env.NODE_ENV === 'development';

  // if(!isDevelopment) { //배포 환경에서는 <UnderDevelopment/>를 보여줌
  //   return <UnderDevelopment/>;
  // }

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 pb-20">
      <Header/>
      <ProfileInfo/>
      <ProfileStats/>
      <BottomNavigation/>
    </div>
  );
}
