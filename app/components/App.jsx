import React from 'react'
import data from '../utilities/data-service.js'
import Pyramid from './Pyramid.jsx'

// TODO: Get data from firebase
var mockData = {
	tierStructure: [1, 3, 5, 8],
	teams: [
		{id: 456, name: "John", average: 0.78},
		{id: 123, name: "Bob", average: 0.68}
	]
}

export default class App extends React.Component {
  render() {
    return <Pyramid data={mockData}/>;
  }
}