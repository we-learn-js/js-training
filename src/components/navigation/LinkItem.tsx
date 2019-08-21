import React from 'react'
import {Link} from 'gatsby'
import useLocation from '../navigation/hooks/useLocation'

const LinkItem = ({components: {Item}, to, ...props}: any) => {
  const {pathname} = useLocation()

  return (
    <Item
      isSelected={pathname === to}
      component={({children, className}) => (
        <Link className={className} to={to}>
          {children}
        </Link>
      )}
      {...props}
    />
  )
}

export default LinkItem
