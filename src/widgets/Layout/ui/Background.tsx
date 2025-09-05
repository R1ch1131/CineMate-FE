export const Background = () => {
  const positions = [
    { left: '30%', top: '35%' },
    { left: '70%', top: '70%' },

  ];

  return (
    <div className="w-screen h-screen -z-10 fixed top-0 left-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-darkblue via-lightblue to-darkblue" />
      <div className="absolute inset-0">
        {positions.map((pos, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-lightorange opacity-10 blur-[90px] animate-pulse"
            style={{
              width: `210px`,
              height: `210px`,
              left: pos.left,
              top: pos.top,
              transform: 'translate(-70%, -70%)',
              animationDuration: `${3 + i * 0.5}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};