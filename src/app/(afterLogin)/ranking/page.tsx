import BottomNavigation from '../_component/BottomNavigation';
import RankingContents from './_component/RankingContents';

export default function RankingPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className='max-w-xl mx-auto'>
        <RankingContents/>
        <BottomNavigation/>
      </div>
    </div>
  );
};
