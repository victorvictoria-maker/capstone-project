import Footer from "@/components/hospitals/landingpage/footer";
import Herosection from "@/components/hospitals/landingpage/herosection";
import Navbar from "@/components/hospitals/landingpage/navbar";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Herosection />

      {/* <Link href='/login'>
        <button>Login</button>
      </Link>

      <Link href='/register'>
        <button>Register</button>
      </Link> */}
      <Footer />
    </main>
  );
}
