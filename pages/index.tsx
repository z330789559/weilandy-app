
import {ProductDescribe ,Shape,Task ,Event, Footer}from '../components/index';

export default function Home() {

  return (
    <>
        <div className="bg-gradient-to-b pl-32 from-[#2A2F32] to-[#1E1F20]">
        <div className="mx-auto  flex flex-row py-8">
          <ProductDescribe/>
          <Shape/>
          {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{' '}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Data to enrich your online business
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div> */}
        </div>
        </div>
        <div
          className="flex  px-32 justify-between w-full min-h-[45.625rem] bg-[#191919]"
          aria-hidden="true"
        >
          <div className="flex-auto mr-5">
            <Task/>

          </div>
          <div className="min-w-fit flex-1 ">
           <Event event={{startTime:"2024-03-23 00:00:00", endTime: "2024-04-01 23:59:59"}}  />
          </div>

          </div>
          <Footer/>
        </>
  )
}
