'use client'
import fetchSuggestion from '@/lib/fetchSuggestion'
import { useBoardStore } from '@/store/BoardStore'
import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
import Image from 'next/image'

function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ])
  const [suggestion, setSuggestion] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const isTokenExpired = useState<boolean>(false)

useEffect(() => {
  // Memeriksa apakah `board.columns.size === 0` dan jika ya, tidak perlu melanjutkan.
  if (board.columns.size === 0) {
    setLoading(false); // Pastikan untuk mengatur loading menjadi false di sini juga.
    return;
  }
  setLoading(true);

  const fetchSuggestionFunc = async () => {
    try {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      // Opsional: Atur state untuk menampilkan pesan error jika perlu.
    } finally {
      setLoading(false); // Pastikan `setLoading(false)` dipanggil di sini untuk menghentikan loading setelah fetch selesai atau error.
    }
  };

  fetchSuggestionFunc();
}, [board]); // Pastikan `board` adalah dependensi yang benar untuk useEffect ini.


  return (
    <header>
      <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl'>
        <div
          className='absolute top-0
          left-0
          w-full
          h-96
          bg-gradient-to-br
          from-pink-400
          to-[#0055D1]
          rounded-md
          filter
          blur-3xl
          opacity-50
          -z-20'
        />
        <Image
          src='/trello_logo.png'
          alt='Trello Logo'
          width={300}
          height={100}
          className='font-bold w-44 md:w-56 pb-10 md:pb-0 object-contain'
        />

        <div className='flex items-center space-x-5 flex-1 w-full justify-end'>
          <form className='flex items-center space-x-2 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial'>
            <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
            <input
              type='text'
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              placeholder='Search'
              className='flex-1 outline-none p-2'
            />
            <button type='submit' hidden>
              <span>Search</span>
            </button>
          </form>

          <Avatar name='Sonny Sangha' round size='50' color='#0055D1' />
        </div>
      </div>

      <div className='flex items-center justify-center px-5 md:py-5'>
        <p className='flex items-center text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic p-5 max-w-3xl text-[#0055D1]'>
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${
              loading && 'animate-spin'
            }`}
          />

          {loading
            ? 'GPT is summarising your tasks for the day...'
            : isTokenExpired
            ? 'Token OpenAI is expired, please upgrade'
            : suggestion
            ? suggestion
            : 'No suggestions available at the moment.'}
        </p>
      </div>
    </header>
  )
}

export default Header
