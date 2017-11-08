import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NewCreatureForm from './NewCreatureForm'
import styled from 'styled-components'

const Wrapper = styled.div`
a{
  text-decoration: none;
}
  background-color: #ccc;
  padding-left: 30px;
  button{
    width: 100px;
    height: 30px;
    border-radius: 5px;
    margin-bottom: 10px;  
  }
  button:hover{
    background-color: #fff;
  }
  h1{ 
    text-align: center;
  }
`
const DivContainer = styled.div`
  background-color: white;
  width: 50%;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 10px 5px 5px black;
`
const DivForm = styled.div`
  background-color: #fff;
  width: 50%;
  padding: 30px;
  border-radius: 10px;
`

class Creatures extends Component {
  state = {
    creatures: [],
    showNewForm: false
  }
  componentWillMount () {
    this.getAllCreatures()
  }

  getAllCreatures = async () => {
    const res = await axios.get('/api/creatures')
    this.setState({creatures: res.data})
  }
  toggleShowNewForm = () => {
    this.setState({showNewForm: !this.state.showNewForm})
  }

  render () {
    return (
      <div>
        <Wrapper>
        <h1>Welcome to The Bog</h1>
        <DivForm>
        <button onClick={this.toggleShowNewForm}>Create New</button>
        {this.state.showNewForm ? <NewCreatureForm getAllCreatures={this.getAllCreatures}/> : null}
     </DivForm>
        {this.state.creatures.map(creature => (
            <DivContainer>
          <Link key={creature._id} to={`/${creature._id}`}>
              <h3>Name: {creature.name}</h3>
              <p>Description: {creature.description}</p>
          </Link>
          </DivContainer>
        ))}

      </Wrapper>
      </div>
    )
  }
}

export default Creatures
  