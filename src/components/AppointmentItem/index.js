// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {apppointmentDetail, updateStarStatus} = props
  const {id, title, date, isStarred} = apppointmentDetail

  const formatedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const starStatus = () => {
    updateStarStatus(id)
  }

  const starredImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="item-container">
      <div className="heading-star-container">
        <p className="heading">{title}</p>
        <button
          type="button"
          className="star-btn"
          onClick={starStatus}
          data-testid="star"
        >
          <img
            src={starredImg}
            className="star-img"
            alt={isStarred ? 'starred' : 'not stared'}
          />
        </button>
      </div>
      <p className="date-item">{formatedDate}</p>
    </li>
  )
}

export default AppointmentItem
