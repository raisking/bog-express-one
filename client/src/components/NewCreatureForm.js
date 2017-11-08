import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const DivForm = styled.div` 
width: 50%;
padding: 30px;
border-radius: 10px;
input   { 
      display: block;
      font-size: .9em;
      background-color: #fff;
      width: 300px;    
    }
`
const DivLabel = styled.div`

`

class NewCreatureForm extends Component {
  state = {
    name: '',
    description: ''
  }

  handleChange = (event) => {
    const name = event.target.name
    const newState = {...this.state}
    newState[name] = event.target.value
    this.setState(newState)
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const payload = {
      name: this.state.name,
      description: this.state.description
    }
    const res = await axios.post('/api/creatures', payload)
    console.log(res)
    await this.props.getAllCreatures()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
      <div>
        <DivForm>
          <div>
            <label htmlFor="name">Name: </label>
            <DivLabel>
            <input onChange={this.handleChange} type="text" name="name" value={this.state.name}/>
            </DivLabel>
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <DivLabel>
            <input onChange={this.handleChange} type="text" name="description" value={this.state.description}/>
            </DivLabel>
          </div>
          </DivForm>
        </div>
        <button>Submit</button>
      </form>
    )
  }
}

export default NewCreatureForm