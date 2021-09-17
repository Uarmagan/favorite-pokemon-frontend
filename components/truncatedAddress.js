import MiddleEllipsis from 'react-middle-ellipsis';

export const TruncatedAddress = ({ address }) => {
  const firstFive = address.substring(0, 6);
  const lastFour = address.substring(address.length - 4, address.length);

  const ellipsedString = address.replace(firstFive, '').replace(lastFour, '');

  return (
    <MiddleEllipsis>
      <span>{firstFive}</span>
      <span className='ellipseMe'>{ellipsedString}</span>
      <span>{lastFour}</span>
    </MiddleEllipsis>
  );
};
