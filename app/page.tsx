import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='w-screen h-screen bg-black text-white flex justify-center items-center'>
      <div className='w-full max-w-xl mx-auto'>
        <h1 className='text-6xl mb-4'>The Ultimate Journal Experience</h1>
        <p className=' text-white/60 text-xl mb-4'>Embark on a transformative journey with the best journal app, period. Unparalleled simplicity meets cutting-edge security, providing you with the ultimate platform for personal reflection and self-discovery.</p>
        <div>
          <Link href={'/journal'}>
          <button className='bg-blue-600 px-4 py-2 rounded-lg text-xl'>Getting started</button>
          </Link>
        </div>
      </div>

    </div>
  )
}
