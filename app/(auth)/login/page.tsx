const LoginPage = () => {
  return (
    <div className="container">
      <div>
        <div
          className="bg-[url('/desktop-auth.png')] bg-cover bg-center bg-no-repeat 
  h-screen max-h-191 w-full max-w-151.5
  flex flex-col items-center"
        >
          <h1 className="text-[46px] max-w-103.5 mx-auto pt-14 font-bold bg-linear-to-b from-white to-white/48 bg-clip-text text-transparent">
            Master your workflow in one organized place.
          </h1>
          <p className="text-[14px] mt-auto font-semibold max-w-96 text-center mx-auto bg-linear-to-b pb-10 from-white to-white/48 bg-clip-text text-transparent">
            Plan, track, and deliver your team's best work without the chaos.
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
