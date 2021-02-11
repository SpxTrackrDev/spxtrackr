import Link from 'next/link'

export default function spx_Page(){
    return (
        <>
        <h1>SpaceX Page</h1>
        <h2>
            <Link href="/">
                <a>Back to the front page</a>
            </Link>
        </h2>
        </>
    ) 
}