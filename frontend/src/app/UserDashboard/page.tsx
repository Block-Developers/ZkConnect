import MainNav from "../components/mainNav";

export default function UserDashboard() {
  return (
    <section className="hero3 py-[60px] pb-[100px]">
      <div>
        <MainNav />
      </div>
      <div className="h-screen mt-[100px]">
        <div className="flex justify-center items-center text-white text-[50px] font-agrandir text-center">
          Hi Nagi! <br /> Lets assist you to get the job of your dream 🚀
        </div>
      </div>
    </section>
  );
}
