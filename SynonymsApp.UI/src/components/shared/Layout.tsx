import PropTypes, { InferProps } from 'prop-types'

import Header from './Header.tsx';
import GlobalNotification from './GlobalNotification.tsx';

function Layout({ children }: InferProps<typeof Layout.propTypes>) {
  return <>
          <Header />
          <GlobalNotification />
          <main className="flex flex-col h-[calc(100vh-80px)] items-center justify-center text-gray-500 text-sm">
            {children}
          </main>
        </>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout;