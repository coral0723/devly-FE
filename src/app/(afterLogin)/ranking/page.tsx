import UnderDevelopment from '../_component/UnderDevelopment';
import BottomNavigation from '../_component/BottomNavigation';
import RankingContents from './_component/RankingContents';


export default function RankingPage() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if(!isDevelopment) {//배포 환경에서는 <UnderDevelopment/>를 보여줌
    return <UnderDevelopment/>;
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 pb-16">
      <RankingContents/>
      <BottomNavigation/>
    </div>
  );
};
