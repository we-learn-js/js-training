import React from 'react'
import {css} from 'emotion'
import {Link} from 'gatsby'
import './index.scss'

type Props = {
  image: string,
  label: string,
  title: string,
  href: string,
  target?: '_blank' | '_self'
}

const HomeCard = ({image, title, label, href, target = '_self'}: Props) => {
  const imgClassName = css`
    background-image: url('${image}');
  `

  const innerContent = (
    <>
      <div className={`card__img--hover ${imgClassName}`} />
      <div className="card__info">
        <span className="card__category">{label}</span>
        <h3 className="card__title">{title}</h3>
      </div>
    </>
  )

  return (
    <article className="card card--1">
      <div className={`card__img ${imgClassName}`} />
      {target === '_blank' ? (
        <a href={href} className="card_link" target={target}>
          {innerContent}
        </a>
      ) : (
        <Link to={href} className="card_link" target={target}>
          {innerContent}
        </Link>
      )}
    </article>
  )
}

export default HomeCard
