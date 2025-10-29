import zalo from '../assets/images/zalo.png';
import './style.css'; // Import file CSS riêng

const ZaloButton = () => {
  const handleZaloClick = () => {
    window.open('https://zalo.me/0988917388', '_blank');
  };

  return (
    <button
      onClick={handleZaloClick}
      className="fixed bottom-[20px] right-[20px] border-none rounded-full cursor-pointer z-50 
                 transition-transform transform duration-200 ease-in-out 
                 hover:scale-110 hover:shadow-lg active:scale-95 shake"
    >
      <img className="w-8 lg:w-12" src={zalo} alt="Zalo" />
    </button>
  );
};

export default ZaloButton;
