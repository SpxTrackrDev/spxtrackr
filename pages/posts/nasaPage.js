import Link from 'next/link'


export default function nasa_Page(){
    return (
     <>
     <div className='page'>
     <div className='headerParent' >
        <div className='header'>
            <h1>Nasa Tracker</h1>
        </div>
     </div>
     <div className='box'>
    <div className='launch'>
        <h2>
            <Link href="/">
                <a>Back to front page.</a>
            </Link>
        </h2> 
        <h2>
            NASA information coming soon
        </h2>
    </div>
    </div>
    </div>
     </>
    )
    
}