import './Layout.css'

export default function Layout() {
    return (
        <div className="layout-div">
            <div>
                <label className='logo-name'>
                    <label style={{color: 'black', fontSize: '25px', textShadow: '0 0 5px blueviolet'}} className='logo'>DEVIL-FISH</label>
                    <label style={{color: 'white', fontSize: '40px', textShadow: '0 0 10px black'}} className='logo'>POKER</label>
                </label>
            </div>
            <div className='layout-label' >
                OPTIONS
            </div>
            <div className='layout-label'>
                VOLUME
            </div>
            <div className='layout-label'>
                GAME
            </div>
            <div className='layout-label'>
                
            </div>
            <div className='layout-label'>
                
            </div>
            <div className='layout-label'>
                
            </div>
        </div>
    )
}