import React, { Component, Fragment } from "react"; 
import {Container,Table} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './../App.css';
class Users extends Component {
  constructor(props) {
    super(props);
    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      page:1,
      no:1,
      users: [],
    };

    // Binds our scroll event handler
    window.onscroll = () => {
      const {
        loadUsers,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        this.setState({
            page: this.state.page + 1
           });
        loadUsers();
      }
    };
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadUsers();
  }
  loadUsers = () => {
    this.setState({ isLoading: true }, () => {
      axios
        .get('https://randomuser.me/api/?page='+this.state.page+'&results=20&seed=test')
        .then((results) => {
          console.log(results);
          // Creates a User  array of Response  data
          const nextUsers = results.data.results.map(user => ({
            id:user.login.username,
            image:user.picture.thumbnail,
            title:user.name.title + user.name.first  + user.name.last,
            email:user.email,
            dob:user.dob.date,
            address:user.location.street +','+ user.location.city +','+user.location.state +','+ user.location.postcode,
            phone:user.phone
          }));
          this.setState({
            hasMore: (this.state.users.length < 100),
            isLoading: false,
            users: [
              ...this.state.users,
              ...nextUsers,
            ],
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
           });
        })
    });
  }

  render() {
    const {
      error,
      hasMore,
      isLoading,
      users,
    } = this.state;

    return (
      // User Tabel 
      <div>
        <Container className="App">  
        <h2> User List </h2> 
        <Table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Full Name</th>
            <th>E-mail</th>
            <th>DOB</th>
            <th>Full Address</th>
            <th>Phone</th>
          </tr>
        </thead>
          <tbody>  
        {users.map(user => (
          <Fragment key={user.id}>
                <tr>
                    <td><img src={user.image}  alt="test"/></td>
                    <td>{user.title}</td>
                    <td>{user.email} </td>
                    <td>{user.dob} </td>
                    <td>{user.address}</td>
                    <td>{user.phone} </td>
                </tr>
          </Fragment>
        ))}
       </tbody>
      </Table>
      </Container>
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {isLoading &&
          <div>
              <Container className="loader-image"> 
                <img alt="loading" src="img/200.gif" />
              </Container>
          </div>
        }
        {!hasMore &&
          <Container className="loader-image"> 
            <div> <h4> No More Date avaiable </h4></div>
          </Container>  
        }
      </div>
    );
  }
}
export default Users;