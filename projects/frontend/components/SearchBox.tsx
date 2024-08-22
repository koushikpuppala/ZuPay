'use client'

import { debounce } from 'lodash'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const SearchBox = () => {
	const searchParam = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const search = searchParam.get('search') ?? ''

	const debouncedSearch = debounce((value: string) => {
		const searchParams = new URLSearchParams()

		if (value) searchParams.set('search', value)
		else searchParams.delete('search')

		router.replace(`${pathname}?${searchParams.toString()}`)
	}, 500)

	return (
		<input
			type='text'
			placeholder='Search posts...'
			defaultValue={search}
			onChange={e => debouncedSearch(e.target.value)}
			className='border-tertiary w-full max-w-xs rounded-lg border px-4 py-2 shadow-md outline-none transition-shadow hover:shadow-lg'
		/>
	)
}

export default SearchBox
