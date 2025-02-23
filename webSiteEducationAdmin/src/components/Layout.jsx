
import Header from "./Header"
import Sidebar from "./sidebar"
import PropTypes from 'prop-types'
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar
        />
        <div className="p-8 w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
