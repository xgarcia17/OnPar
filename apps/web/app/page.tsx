export default async function HomePage() {
  return (
    <div className="padding-responsive flex flex-col items-center">
      <h1 className="text-center h1-responsive font-bold text-title m-12 title-shadow">
        OnPar
      </h1>
      <div className="mx-auto w-[80%] border-[5px] rounded bg-text border-color min-h-[30vh] flex items-center mb-10">
        <p className="text-center text-primary text-lg md:text-xl p-4">
          Welcome to <em>OnPar</em>! <em>OnPar</em>&nbsp;is an application for
          you and your friends to gameify your goal-tracking in a golf-inspired
          way. Customize your goals and define what it means for you to be
          &quot;on track,&quot; or as we say, &quot;on par!&quot;
        </p>
      </div>
    </div>
  );
}
