import BottomNavigation from '../_component/BottomNavigation';
import Header from './_component/Header';
import ProfileInfo from './_component/ProfileInfo';
import ProfileStats from './_component/ProfileStats';

export default async function Profile() {

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header/>
      <ProfileInfo/>
      <ProfileStats/>
      <BottomNavigation/>
    </div>
  );
}
