import { ArrowRight } from 'lucide-react'; 

interface ButtonProps {
  text: string;
  isLoading?: boolean; 
  disabled?: boolean; 
  textButton: string;
}

export const RegistrButton = ({ text,textButton, isLoading = false, disabled = false }: ButtonProps) => {
  return (
    <div>
      <button 
        type="submit" 
        disabled={disabled || isLoading} 
        className={`text-white bg-gradient-to-r w-full from-lightorange to-darkorange py-3 rounded-xl hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-700 hover:shadow-2xl ease-in-out transition-shadow hover:shadow-yellow-300/60 duration-200 ${
          disabled || isLoading ? 'opacity-50 cursor-not-allowed hover:shadow-none' : ''
        }`}
      >
        <div className="flex justify-center gap-3 items-center">
          {isLoading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          <p>{isLoading ? textButton : text}</p> 
          {!isLoading && <ArrowRight width={20} />} 
        </div>
      </button>
    </div>
  );
};