export default function Loading(colour = 'gray') {
  const borderColour = `border-${colour.colour}-300`;
  const borderTColour = `border-t-${colour.colour}-600`;

  return (
    <div className="loading">
      <div
        className={`${borderColour} h-20 w-20 animate-spin rounded-full border-8 ${borderTColour}`}
      />
    </div>
  );
}
