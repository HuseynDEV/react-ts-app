import { ReactNode } from 'react';


const MainComponent = ({children}:{children:ReactNode}) => {

    return (
        <main className="main">
          {children}
        </main>
    )
}

export default MainComponent