import { Button } from '@/components/ui/button'

export default function PageNotFound() {
    return (
        <main className='flex justify-center items-center'>
            <section className='md:w-2/3 space-y-5 p-10 flex flex-col justify-center items-center'>
                <h1 className='text-9xl font-bold'>4<span className='text-primary'>0</span>4</h1>
                <h2 className='text-5xl font-bold text-primary'>Oops! Page not found</h2>
                <p className='text-xl text-gray-500'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas, veritatis! Temporibus corporis ut, mollitia eligendi nobis cum voluptatibus? Sed, in?</p>
                <Button type='button'>Contact Us</Button>
            </section>
        </main>
    )
}
