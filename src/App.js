import React from 'react';
import Radium from 'radium';
import './App.css';
import Person from './person/Person'

class App extends React.Component {
    state = {
        persons: [
            { id: 'asd1', name: 'serge', age: 36 },
            { id: 'asd2', name: 'max', age: 28 },
            { id: 'asd3', name: 'dasha', age: 18 },
            { id: 'asd4', name: 'pasha', age: 22 },
        ],
        showPersons: false
    };

    togglePersonsHandler = () => {
        this.setState({showPersons: !this.state.showPersons})
    };

    deletePersonHandler = (personIndex) => {
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});;
    }
    nameChangeHandler = (event, id) => {
      const index = this.state.persons.findIndex(p => {
          return p.id === id;
      });
      const person = { ...this.state.persons[index]}
      person.name = event.target.value;
      const persons = [...this.state.persons];
      persons[index] = person;
      this.setState({persons: persons})
    }

  render() {
      let persons = null;
      const style = {
          backgroundColor: 'green',
          color: 'white',
          font: 'inherit',
          border: '1px solid blue',
          padding: '8px',
          cursor: 'pointer'
      }

      if (this.state.showPersons) {
          persons = (
              <div>
                  { this.state.persons.map((person, index) => {
                       return   <Person
                            key={person.id}
                            name={person.name}
                            age={person.age}
                            click={() => this.deletePersonHandler(index)}
                            changed={(event) => this.nameChangeHandler(event, person.id)}
                          />
                      }
                    )
                  }
              </div>)
          style.backgroundColor = 'red';
      }

      const classes = []
      if (this.state.persons.length <= 2) {
          classes.push('red')
      }

      if (this.state.persons.length <= 1) {
          classes.push('bold')
      }


      return (
            <div className="App">
              <div>hi</div>
              <p className={classes.join(' ')}>Team</p>
              <button
                  style={style}
                  onClick={this.togglePersonsHandler}
              > toggle </button>
              {persons}
            </div>
      );
    }
}


export default Radium(App);