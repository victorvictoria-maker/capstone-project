import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href='/login'>
        <button>Login</button>
      </Link>

      <Link href='/register'>
        <button>Register</button>
      </Link>
    </div>
  );
}
