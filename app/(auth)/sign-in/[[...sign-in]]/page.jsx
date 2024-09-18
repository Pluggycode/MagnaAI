import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    
<section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <a className="block text-white" href="#">
          <span className="sr-only">Home</span>
          <svg
            className="h-8 sm:h-10"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="https://th.bing.com/th/id/OIP.qvhcmd-GbCm7CDbfUmF9LAHaE8?rs=1&pid=ImgDetMain"
          >
            <path
              d='https://th.bing.com/th/id/OIP.qvhcmd-GbCm7CDbfUmF9LAHaE8?rs=1&pid=ImgDetMain'              
              fill="currentColor"
            />
          </svg>
        </a>

        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to Squid 🦑
        </h2>

        <p className="mt-4 leading-relaxed text-white/90">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
          quibusdam aperiam voluptatum.
        </p>
      </div>
    </section>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
          <a
            className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
            href="#"
          >
            <span className="sr-only">Home</span>
            <svg
              className="h-8 sm:h-10"
              viewBox="0 0 28 24"
              fill="none"
              src={"https://th.bing.com/th/id/OIP.qvhcmd-GbCm7CDbfUmF9LAHaE8?rs=1&pid=ImgDetMain"}
            >
              <path
                d='https://th.bing.com/th/id/OIP.qvhcmd-GbCm7CDbfUmF9LAHaE8?rs=1&pid=ImgDetMain'
                fill="currentColor"
              />
            </svg>
          </a>

          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Welcome to Squid 🦑
          </h1>

          <p className="mt-4 leading-relaxed text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
            quibusdam aperiam voluptatum.
          </p>
        </div>
        <SignIn />
      </div>
    </main>
  </div>
</section>
  )
}