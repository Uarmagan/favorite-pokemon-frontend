import { TruncatedAddress } from './truncatedAddress';

export const TxnTable = ({ allPokemon }) => {
  return (
    <div className='flex flex-col mt-12'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-700 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-700'>
              <thead className='bg-[#1c1917]'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'
                  >
                    Address
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'
                  >
                    Pokemon
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'
                  >
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className='bg-[#212121] divide-y divide-gray-700'>
                {allPokemon?.map((data) => {
                  return (
                    <tr key={data.timestamp}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm  text-gray-200'>
                        <TruncatedAddress address={data.address} />
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm tracking-wide font-medium text-gray-200'>
                        {data.pokemonName}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-200'>
                        {FormattedDate(data.timestamp)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormattedDate = (date) => {
  const days = date.getDate();
  const months = date.getMonth();
  const years = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let dd = days < 10 ? '0' + days : days;
  let mm = months + 1;
  const yyyy = years;
  let h = hours > 12 ? hours - 12 : hours;
  const m = minutes < 10 ? '0' + minutes : minutes;
  const am_pm = hours < 12 ? 'AM' : 'PM';

  const fullDate = `${mm}/${dd}/${yyyy}, ${h}:${m} ${am_pm}`;
  return fullDate;
};
