import { redirect } from 'next/navigation';
export const dynamic = 'force-static'; // evita renderização desnecessária
export const revalidate = 0;

export default function Home() {
  redirect('/login');
}
