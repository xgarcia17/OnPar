export default async function Home() {
  return (
    <div
      className="padding-responsive min-h-screen flex flex-col items-center"
      style={{ paddingTop: "20vh" }}
    >
      <h1 className="text-center h1-responsive font-bold text-title m-12 title-shadow">
        OnPar
      </h1>
      <div className="mx-auto w-[80%] border-[5px] rounded- bg-text border-secondary min-h-[30vh] flex items-center">
        <p className="text-center text-primary text-lg md:text-xl p-4">
          Welcome to <em>OnPar</em>! <em>OnPar</em>&nbsp;is an application for
          you and your friends to gameify your goal-tracking in a golf-inspired
          way. Customize your goals and defined what it means for you to be
          &quot;on track,&quot; or as we say, &quot;on par!&quot;
        </p>
      </div>
    </div>
  );
}
