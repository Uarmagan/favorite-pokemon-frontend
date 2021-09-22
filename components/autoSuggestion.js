import { useAutoSuggestion } from '../hooks/useAutoSuggestion';

export function SuggestionsList({ onClickSuggestion }) {
  const { activeSuggestionIndex, suggestions } = useAutoSuggestion();

  return suggestions.length ? (
    <ul className='bg-white border-2 py-1 rounded-t-none rounded-b-lg -mt-3 text-center overflow-y-auto absolute top-24 w-full '>
      {suggestions?.map((suggestion, index) => {
        return (
          <li
            className={`text-black  hover:bg-gray-200 ${
              index === activeSuggestionIndex ? 'border-t-0' : 'border-t-2'
            }`}
            key={suggestion}
            onClick={onClickSuggestion}
          >
            {suggestion}
          </li>
        );
      })}
    </ul>
  ) : null;
}
