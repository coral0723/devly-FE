// import UnderDevelopment from '../_component/UnderDevelopment';
import BottomNavigation from '../_component/BottomNavigation';
import RankingContents from './_component/RankingContents';


export default function RankingPage() {

  // 미완성 기능일 때 보여주는 컴포넌트
  // const isDevelopment = process.env.NODE_ENV === 'development';

  // if(!isDevelopment) {//배포 환경에서는 <UnderDevelopment/>를 보여줌
  //   return <UnderDevelopment/>;
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className='max-w-xl mx-auto'>
        <RankingContents/>
        <BottomNavigation/>
      </div>
    </div>
  );
};
