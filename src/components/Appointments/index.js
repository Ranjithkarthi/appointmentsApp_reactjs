// Write your code here
import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {title: '', date: '', listItem: [], isFilterActive: false}

  updateTitle = event => {
    const {title} = this.state
    this.setState({title: event.target.value})
  }

  updateDate = event => {
    const {date} = this.state
    this.setState({date: event.target.value})
  }

  submitDetails = event => {
    event.preventDefault()
    const {title, date, listItem} = this.state
    const newItem = {id: v4(), title, date, isStarred: false}
    if (title && date) {
      this.setState(prevState => ({
        listItem: [...prevState.listItem, newItem],
        title: '',
        date: '',
      }))
    } else {
      alert('Fill the Title and Date')
    }
  }

  updateStarStatus = id => {
    this.setState(prevState => {
      const updatedList = prevState.listItem.map(item =>
        item.id === id ? {...item, isStarred: !item.isStarred} : item,
      )
      return {listItem: updatedList}
    })
  }

  filterStarredStatus = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  filteringListItem = () => {
    const {listItem, isFilterActive} = this.state
    if (isFilterActive) {
      const filteredItem = listItem.filter(
        eachItem => eachItem.isStarred === true,
      )
      return filteredItem
    }
    return listItem
  }

  render() {
    const {title, date, listItem} = this.state
    const filteredListItem = this.filteringListItem()

    return (
      <div className="bg-container">
        <div className="overall-content-container">
          <h1 className="main-heading">Add Appointment</h1>
          <div className="content-container">
            <form className="form-container" onSubmit={this.submitDetails}>
              <label htmlFor="title">TITLE</label>
              <br />
              <input
                type="text"
                id="title"
                className="title"
                value={title}
                onChange={this.updateTitle}
              />
              <br />
              <label htmlFor="selectedDate">DATES</label>
              <br />
              <input
                type="date"
                id="selectedDate"
                className="selected-date"
                value={date}
                onChange={this.updateDate}
              />
              <br />
              <button type="submit" className="btn">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="cover-img"
            />
          </div>
          <hr className="hr-line" />
          <div className="footer-container">
            <div className="appointments-items-heading-container">
              <h1 className="appointments-items-heading">Appointments</h1>
              <button
                type="button"
                className="starred-btn"
                onClick={this.filterStarredStatus}
              >
                Starred
              </button>
            </div>
            <ul className="items-container">
              {filteredListItem.map(item => (
                <AppointmentItem
                  key={item.id}
                  apppointmentDetail={item}
                  updateStarStatus={this.updateStarStatus}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
